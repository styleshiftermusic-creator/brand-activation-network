const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, "../.env.local");
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
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
        if (trimmed.startsWith("SUPABASE_SERVICE_ROLE_KEY=")) {
            let val = trimmed.substring("SUPABASE_SERVICE_ROLE_KEY=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            supabaseServiceKey = val;
        }
    }
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testColumns() {
    console.log("Checking columns on public.profiles...");
    const { data, error } = await supabase.from('profiles').select('id, revenue_bracket, primary_offer, biggest_bottleneck, onboarding_completed, updated_at').limit(1);
    
    if (error) {
        console.error("❌ Database query failed:", error.message);
    } else {
        console.log("✅ All columns exist and are accessible on profiles table!");
    }
}

testColumns();
