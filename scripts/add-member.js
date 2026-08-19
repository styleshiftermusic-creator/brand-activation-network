const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables from .env.local
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

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function addMember() {
    const args = process.argv.slice(2);
    const email = args[0]?.trim();
    let password = args[1]?.trim();
    const name = args[2] || "Member";

    if (!email) {
        console.log(`
=====================================================
  BRAND ACTIVATION NETWORK — MANUAL MEMBER PROVISION
=====================================================
Usage:
  node scripts/add-member.js <email> [password] [name]

Example:
  node scripts/add-member.js member@example.com TempPass123! "John Doe"
=====================================================
`);
        process.exit(0);
    }

    if (!password) {
        // Generate clean temporary password
        password = 'BAN_' + crypto.randomBytes(4).toString('hex') + '!';
    }

    console.log(`\n⏳ Provisioning account for: ${email}...`);

    try {
        // First, check if the user already exists in auth
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = listData?.users?.find(
            u => u.email?.trim().toLowerCase() === email.toLowerCase()
        );

        let userId;

        if (existingUser) {
            console.log(`ℹ️ User already exists (ID: ${existingUser.id}). Setting password and confirming email...`);
            userId = existingUser.id;
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                password: password,
                email_confirm: true,
                user_metadata: { ...existingUser.user_metadata, name: name, full_name: name }
            });
            if (updateError) throw updateError;
        } else {
            console.log(`✨ Creating brand new auth user...`);
            const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
                email: email,
                password: password,
                email_confirm: true,
                user_metadata: {
                    name: name,
                    full_name: name,
                },
            });
            if (createError) throw createError;
            userId = userData.user.id;
        }

        // Ensure profile exists in profiles table
        const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
            id: userId,
            onboarding_completed: false,
            credits: 100,
            badges: ['early_adopter'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        if (profileError) {
            console.warn(`⚠️ Profile upsert warning: ${profileError.message}`);
        }

        console.log(`\n✅ Account is active and ready to log in!`);
        printCredentials(email, password);

    } catch (err) {
        console.error(`\n❌ Failed to provision user:`, err.message || err);
        process.exit(1);
    }
}

function printCredentials(email, password) {
    console.log(`
-----------------------------------------------------
  LOGIN CREDENTIALS
-----------------------------------------------------
  Login URL : https://brandactivationnetwork.com/dashboard
  Email     : ${email}
  Password  : ${password}
-----------------------------------------------------
  * The member can log in directly at /dashboard and can
    reset their password via "OVERRIDE CLEARANCE?" anytime.
=====================================================
`);
}

addMember();
