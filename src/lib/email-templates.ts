/**
 * Premium HTML email templates for the Brand Activation Network.
 * Designed for Resend delivery with inline styles for maximum email client compatibility.
 */

const BRAND = {
    name: "Brand Activation Network",
    color: "#9d4edd",
    emerald: "#10b981",
    bg: "#0a0a0a",
    text: "#d4d4d8",
    muted: "#71717a",
    from: "The Master Blueprint <onboarding@brandactivationnetwork.com>",
    domain: "https://brandactivationnetwork.com",
};

// ─── Shared Layout ────────────────────────────────────────────────────────────

function emailWrapper(content: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin:0;padding:0;background-color:${BRAND.bg};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${BRAND.text};">
        <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
            <!-- Logo Header -->
            <div style="text-align:center;margin-bottom:32px;">
                <img src="${BRAND.domain}/logo.png" alt="Brand Activation Network" width="200" style="height:auto;opacity:0.8;" />
            </div>
            ${content}
            <!-- Footer -->
            <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
                <p style="font-size:11px;color:${BRAND.muted};margin:0;line-height:1.8;">
                    © ${new Date().getFullYear()} Brand Activation Network<br/>
                    You're receiving this because you joined the BAN ecosystem.<br/>
                    <a href="${BRAND.domain}" style="color:${BRAND.color};text-decoration:none;">brandactivationnetwork.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>`;
}

// ─── Template: Welcome (Post-Purchase) ────────────────────────────────────────

export function welcomeEmail(name: string): { subject: string; html: string } {
    const firstName = name?.split(" ")[0] || "Architect";
    return {
        subject: "🚀 Welcome to the Brand Activation Network",
        html: emailWrapper(`
            <div style="background:linear-gradient(135deg,rgba(157,78,221,0.08),rgba(16,185,129,0.08));border:1px solid rgba(157,78,221,0.2);border-radius:16px;padding:32px;margin-bottom:24px;">
                <h1 style="margin:0 0 8px;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                    Welcome, ${firstName}.
                </h1>
                <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:3px;color:${BRAND.color};font-weight:600;">
                    Your Activation Has Begun
                </p>
            </div>

            <p style="font-size:15px;line-height:1.8;color:${BRAND.text};margin-bottom:24px;">
                You now have <strong style="color:#ffffff;">full access</strong> to all 7 modules, every blueprint, calculator, sales script, and the complete AI Prompt Library.
            </p>

            <p style="font-size:15px;line-height:1.8;color:${BRAND.text};margin-bottom:24px;">
                Here's your recommended launch sequence:
            </p>

            <!-- Steps -->
            <div style="margin-bottom:32px;">
                ${[
                    { num: "01", title: "Set Your Password", desc: "Check your inbox for the Supabase invite email and set your dashboard password." },
                    { num: "02", title: "Start Module 1", desc: "Begin with 'The Pledge Loan Credit Hack' — it's the foundation for everything else." },
                    { num: "03", title: "Download Your Blueprints", desc: "Grab the Pledge Loan Calculator and Business Funding Checklist from the Blueprints tab." },
                ].map(s => `
                    <div style="display:flex;gap:16px;margin-bottom:20px;align-items:flex-start;">
                        <div style="flex-shrink:0;width:36px;height:36px;border-radius:10px;background:rgba(157,78,221,0.1);border:1px solid rgba(157,78,221,0.3);display:flex;align-items:center;justify-content:center;">
                            <span style="font-size:13px;font-weight:700;color:${BRAND.color};font-family:monospace;">${s.num}</span>
                        </div>
                        <div>
                            <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;">${s.title}</div>
                            <div style="font-size:13px;color:${BRAND.muted};line-height:1.6;">${s.desc}</div>
                        </div>
                    </div>
                `).join("")}
            </div>

            <!-- CTA Button -->
            <div style="text-align:center;margin:32px 0;">
                <a href="${BRAND.domain}/dashboard" style="display:inline-block;padding:16px 40px;background:${BRAND.color};color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;letter-spacing:0.5px;text-transform:uppercase;">
                    Open Mission Control →
                </a>
            </div>

            <p style="font-size:13px;color:${BRAND.muted};text-align:center;">
                Questions? Reply directly to this email — we read every message.
            </p>
        `),
    };
}

// ─── Template: Module Completion ──────────────────────────────────────────────

export function moduleCompleteEmail(name: string, moduleId: string, moduleTitle: string, nextModuleTitle?: string): { subject: string; html: string } {
    const firstName = name?.split(" ")[0] || "Architect";
    const isLastModule = !nextModuleTitle;

    return {
        subject: isLastModule
            ? `🏆 ${firstName}, you've completed the Master Blueprint!`
            : `✅ Module ${moduleId} Complete — ${moduleTitle}`,
        html: emailWrapper(`
            <div style="text-align:center;margin-bottom:32px;">
                <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:rgba(16,185,129,0.1);border:2px solid rgba(16,185,129,0.4);line-height:64px;font-size:28px;margin-bottom:16px;">
                    ${isLastModule ? "🏆" : "✅"}
                </div>
                <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#ffffff;">
                    ${isLastModule ? "You've Completed the Master Blueprint!" : `Module ${moduleId.replace("M-0", "")} Complete`}
                </h1>
                <p style="margin:0;font-size:13px;color:${BRAND.emerald};font-weight:600;text-transform:uppercase;letter-spacing:2px;">
                    ${moduleTitle}
                </p>
            </div>

            <p style="font-size:15px;line-height:1.8;color:${BRAND.text};margin-bottom:24px;">
                ${firstName}, you just locked in another level of the system. ${isLastModule
                    ? "You've completed every module in the Master Blueprint. You now have the complete playbook for funding, sales, and AI-powered scaling."
                    : "Keep the momentum going — your next module is already unlocked and waiting."
                }
            </p>

            ${!isLastModule ? `
                <div style="background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:24px;margin-bottom:24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:2px;">Next Up</p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">${nextModuleTitle}</p>
                </div>
            ` : `
                <div style="background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2);border-radius:12px;padding:24px;margin-bottom:24px;">
                    <p style="margin:0 0 4px;font-size:11px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:2px;">Achievement Unlocked</p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#f59e0b;">Brand Activation Architect 🏅</p>
                </div>
            `}

            <div style="text-align:center;margin:32px 0;">
                <a href="${BRAND.domain}/dashboard/master-course" style="display:inline-block;padding:16px 40px;background:${BRAND.emerald};color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;letter-spacing:0.5px;text-transform:uppercase;">
                    ${isLastModule ? "View Your Progress" : "Continue Learning →"}
                </a>
            </div>
        `),
    };
}

// ─── Template: Admin New Purchase Notification ────────────────────────────────

export function adminPurchaseEmail(customerName: string, customerEmail: string): { subject: string; html: string } {
    return {
        subject: `💰 New Course Purchase — ${customerName || customerEmail}`,
        html: `
            <div style="font-family:'Helvetica Neue',sans-serif;padding:24px;max-width:500px;">
                <h2 style="margin:0 0 16px;color:#111;">New Course Purchase</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Name</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${customerName || "N/A"}</td></tr>
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${customerEmail}</td></tr>
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Time</td><td style="padding:8px 0;font-size:14px;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</td></tr>
                </table>
                <p style="margin-top:16px;font-size:13px;color:#999;">Provisioned in Supabase and sent login invite automatically.</p>
            </div>
        `,
    };
}

// ─── Template: Admin Lead Alert ───────────────────────────────────────────────

export function adminLeadEmail(email: string, source: string): { subject: string; html: string } {
    return {
        subject: `🎯 New Lead — ${source}`,
        html: `
            <div style="font-family:'Helvetica Neue',sans-serif;padding:24px;max-width:500px;">
                <h2 style="margin:0 0 16px;color:#111;">New Lead Captured</h2>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Email</td><td style="padding:8px 0;font-weight:600;font-size:14px;">${email}</td></tr>
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Source</td><td style="padding:8px 0;font-size:14px;">${source}</td></tr>
                    <tr><td style="padding:8px 0;color:#666;font-size:14px;">Time</td><td style="padding:8px 0;font-size:14px;">${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</td></tr>
                </table>
            </div>
        `,
    };
}

export { BRAND };
