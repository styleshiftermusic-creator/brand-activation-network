const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of envLines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_URL=")) {
            let val = trimmed.substring("NEXT_PUBLIC_SUPABASE_URL=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            supabaseUrl = val;
        }
        if (trimmed.startsWith("NEXT_PUBLIC_SUPABASE_ANON_KEY=")) {
            let val = trimmed.substring("NEXT_PUBLIC_SUPABASE_ANON_KEY=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            supabaseAnonKey = val;
        }
        if (trimmed.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) {
            let val = trimmed.substring("SUPABASE_SERVICE_ROLE_KEY=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            supabaseServiceKey = val;
        }
    }
}

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing Supabase URL or Service Role Key in environment!");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    console.log("Checking connection to Supabase database...");
    console.log(`URL: ${supabaseUrl}`);

    const tables = [
        'webinar_registrations',
        'course_progress',
        'quiz_scores',
        'user_activity',
        'profiles',
        'course_modules'
    ];

    for (const table of tables) {
        try {
            console.log(`Checking table: ${table}...`);
            // Attempt a limit 0 select to check table existence without downloading records
            const { data, error } = await supabase.from(table).select('*').limit(0);
            
            if (error) {
                console.error(`❌ Table "${table}" error:`, error.message);
            } else {
                console.log(`✅ Table "${table}" is accessible and configured correctly.`);
            }
        } catch (err) {
            console.error(`❌ Unexpected error checking table "${table}":`, err.message);
        }
    }
}

testConnection();
