const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// 1. Manually load .env.local
const envPath = path.join(__dirname, "../.env.local");
let stripeKey = process.env.STRIPE_SECRET_KEY;
let webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of envLines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("STRIPE_SECRET_KEY=")) {
            let val = trimmed.substring("STRIPE_SECRET_KEY=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            stripeKey = val;
        }
        if (trimmed.startsWith("STRIPE_WEBHOOK_SECRET=")) {
            let val = trimmed.substring("STRIPE_WEBHOOK_SECRET=".length).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
            webhookSecret = val;
        }
    }
}

const stripe = new Stripe(stripeKey);

async function testWebhook() {
    console.log('Generating synthetic Stripe event...');

    // 2. Create the mock payload
    const payload = {
        id: 'evt_test_webhook',
        type: 'checkout.session.completed',
        object: 'event',
        data: {
            object: {
                id: 'cs_test_123',
                object: 'checkout.session',
                customer_details: {
                    email: 'test+' + Date.now() + '@gmail.com',
                    name: 'Synthetic Tester'
                }
            }
        }
    };

    const payloadString = JSON.stringify(payload);

    // 3. Generate a valid Stripe signature
    const signature = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: webhookSecret,
    });

    console.log('Signature generated:', signature);
    console.log('Sending webhook to http://localhost:3000/api/webhooks/stripe...');

    // 4. Send the POST request to the local Next.js server
    try {
        const response = await fetch('http://localhost:3000/api/webhooks/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'stripe-signature': signature
            },
            body: payloadString
        });

        const responseText = await response.text();
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Body: ${responseText}`);

        if (response.ok) {
            console.log(`\n✅ Webhook test passed! User successfully provisioned.`);
        } else {
            console.log(`\n❌ Webhook test failed.`);
        }
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

testWebhook();
