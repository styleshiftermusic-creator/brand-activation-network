import { NextResponse } from 'next/server';

/**
 * 7-Day Indoctrination Sequence (Growth Hacker Copy)
 * In production, this would be triggered by a daily cron job checking a user's registration date 
 * and sending the appropriate Day N email via Resend.
 */

const EMAIL_SEQUENCE = {
    DAY_1: {
        subject: "Your Spot is Secured: The Master Blueprint Challenge",
        body: `
            <h2>Registration Confirmed.</h2>
            <p>Your spot for the next <strong>The Master Blueprint Challenge</strong> is officially secured.</p>
            <p>In this live event, we'll cover the exact systems, AI agents, and automations required to scale an agency horizontally without infinitely expanding payroll.</p>
            <p><strong>Immediate Action Required:</strong></p>
            <ul>
                <li>Join our private cohort group.</li>
                <li>Clear your schedule for Tuesday.</li>
            </ul>
        `
    },
    DAY_2: {
        subject: "The biggest lie you've been told about scaling...",
        body: `
            <h2>You don't need a massive team.</h2>
            <p>Most agency owners believe that to double revenue, they need to double headcount. That is the quickest way to kill your margins.</p>
            <p>What you actually need is <strong>Leverage</strong>.</p>
            <p>Tomorrow, I'm going to show you how a 2-person team can do the work of 20 using the Brand Activation Network architecture.</p>
            <p>Stay tuned.</p>
        `
    },
    DAY_3: {
        subject: "Your 'Aha' Moment (The Zero to Hero Framework)",
        body: `
            <h2>Let's build your machine.</h2>
            <p>The Master Blueprint is about one thing: separating your TIME from your INCOME.</p>
            <p>If you haven't upgraded to VIP yet to skip the line and get instant lifetime access, you are missing out on the exact 16-Agent Specialist Stack that we use internally.</p>
            <a href="https://brandactivationnetwork.com/challenge/confirmation">Upgrade to VIP Lifetime Access Here</a>
        `
    },
    DAY_4: {
        subject: "How [Client Name] added $50k MRR in 30 days",
        body: `
            <h2>Case Study: The 30-Day Turnaround</h2>
            <p>They thought their niche was "too saturated." They thought their ads "didn't work."</p>
            <p>The truth? Their foundational protocol was broken.</p>
            <p>Once they implemented the Master Blueprint, they automated their lead generation and closed 5 high-ticket deals in a week.</p>
            <p>Are you next?</p>
        `
    },
    DAY_5: {
        subject: "Login & claim your first 100 BAN Credits",
        body: `
            <h2>Gamify your growth.</h2>
            <p>We built the Brand Activation Network not just as a course, but as an ecosystem. When you complete modules, you earn BAN Credits. When you refer friends, you earn a 30% commission ($149 flat).</p>
            <p>Log in right now, finish the first module, and watch your credits go up.</p>
            <a href="https://brandactivationnetwork.com/dashboard">Access the Network</a>
        `
    },
    DAY_6: {
        subject: "The door is closing on this price...",
        body: `
            <h2>Urgency is the catalyst for action.</h2>
            <p>I see you haven't pulled the trigger on the Lifetime Access pass yet.</p>
            <p>Listen, you can keep trying to figure this out on your own through YouTube videos and trial-and-error, or you can just copy-paste our exact systems.</p>
            <p>The $497 lifetime price is disappearing soon. Don't wait.</p>
        `
    },
    DAY_7: {
        subject: "Final Notice: Your VIP Access is expiring.",
        body: `
            <h2>This is it.</h2>
            <p>This is the last email you'll get about the $497 VIP upgrade. After tonight, the price goes back to retail.</p>
            <p>You have the playbook. You know what's possible. Now it's time to execute.</p>
            <a href="https://brandactivationnetwork.com/challenge/confirmation">Secure Your Spot Before Midnight</a>
        `
    }
};

export async function GET(req: Request) {
    // 1. Enforce Cron Authorization in production
    if (process.env.NODE_ENV === "production") {
        const cronSecret = process.env.CRON_SECRET;
        const authHeader = req.headers.get("authorization");
        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.json({ 
        success: true, 
        message: "Indoctrination Sequence initialized.",
        sequence: EMAIL_SEQUENCE
    });
}
