const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, "../.env.local");
let stripeKey = process.env.STRIPE_SECRET_KEY;

if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of envLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("STRIPE_SECRET_KEY=")) {
      let val = trimmed.substring("STRIPE_SECRET_KEY=".length).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      stripeKey = val;
      break;
    }
  }
}

const stripe = new Stripe(stripeKey);

async function createCoupon() {
  try {
    const coupon = await stripe.coupons.create({
      id: 'TEST100',
      percent_off: 100,
      duration: 'once',
      name: '100% Off Test Coupon',
    });

    console.log('Successfully created 100% off coupon!');
    console.log('Coupon / Promo Code ID to use at checkout:', coupon.id);
  } catch (error) {
    if (error.code === 'resource_already_exists' || (error.message && error.message.includes('already exists'))) {
      console.log('Promo code TEST100 already exists! You can use it at checkout.');
    } else {
      console.error('Error creating coupon:', error.stack || error);
    }
  }
}

createCoupon();
