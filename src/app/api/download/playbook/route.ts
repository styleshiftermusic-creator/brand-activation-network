import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>BAN Credit Sweep Blueprint — Brand Activation Network</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #9d4edd;
    --emerald: #10b981;
    --amber: #f59e0b;
    --bg: #ffffff;
    --text: #111111;
    --muted: #6b7280;
    --border: #e5e7eb;
    --header-bg: #0a0a0a;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    font-size: 15px;
  }

  /* ── HEADER ── */
  .header {
    background: var(--header-bg);
    padding: 40px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .header-left { display: flex; flex-direction: column; gap: 6px; }
  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--emerald);
    border: 1px solid rgba(16,185,129,0.3);
    background: rgba(16,185,129,0.1);
    border-radius: 999px;
    padding: 4px 12px;
    width: fit-content;
    margin-bottom: 8px;
  }
  .header h1 {
    font-size: 28px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1.2;
  }
  .header h1 span { color: var(--emerald); }
  .header-sub {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
    margin-top: 4px;
  }
  .header-right {
    text-align: right;
    flex-shrink: 0;
  }
  .header-logo {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #3f3f46;
  }
  .header-logo span { color: var(--primary); }

  /* ── HERO STRIP ── */
  .hero-strip {
    background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(157,78,221,0.08) 100%);
    border-bottom: 1px solid var(--border);
    padding: 20px 48px;
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
  }
  .hero-stat { display: flex; align-items: center; gap: 10px; }
  .stat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--emerald); }
  .dot-purple { background: var(--primary); }
  .dot-amber { background: var(--amber); }
  .stat-label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }

  /* ── CONTENT ── */
  .content { max-width: 800px; margin: 0 auto; padding: 48px 48px 64px; }

  .intro-quote {
    background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(157,78,221,0.06));
    border-left: 4px solid var(--emerald);
    border-radius: 0 12px 12px 0;
    padding: 20px 24px;
    margin-bottom: 48px;
    font-size: 15px;
    font-style: italic;
    color: #374151;
    line-height: 1.7;
  }

  /* ── METHOD HEADER ── */
  .method-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid var(--border);
  }
  .method-badge {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 6px;
    flex-shrink: 0;
  }
  .badge-green { background: rgba(16,185,129,0.12); color: #059669; border: 1px solid rgba(16,185,129,0.3); }
  .badge-purple { background: rgba(157,78,221,0.12); color: #7c3aed; border: 1px solid rgba(157,78,221,0.3); }
  .method-title { font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -0.02em; }

  /* ── SECTION HEADER ── */
  .section { margin-bottom: 36px; }
  .section-title {
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--muted);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  p { margin-bottom: 14px; color: #374151; }
  strong { color: var(--text); font-weight: 700; }

  /* ── CONTACT TABLE ── */
  .contact-table { width: 100%; border-collapse: collapse; margin: 16px 0 24px; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
  .contact-table th {
    background: #f9fafb;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--muted);
    padding: 10px 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .contact-table td { padding: 12px 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
  .contact-table tr:last-child td { border-bottom: none; }
  .contact-table td:first-child { font-weight: 700; }
  .contact-table tr:hover td { background: #fafafa; }

  /* ── IVR BOX ── */
  .ivr-box {
    background: #f8fafc;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 13px;
    font-family: 'Courier New', monospace;
    color: #374151;
    margin-bottom: 10px;
  }
  .ivr-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 6px; font-family: 'Inter', sans-serif; }

  /* ── SCRIPT BOX ── */
  .script-box {
    background: linear-gradient(135deg, #f0fdf4, #f5f3ff);
    border: 1px solid #d1fae5;
    border-left: 4px solid var(--emerald);
    border-radius: 0 10px 10px 0;
    padding: 20px 24px;
    margin: 16px 0;
    font-style: italic;
    color: #1f2937;
    line-height: 1.8;
  }

  /* ── IF/THEN CARDS ── */
  .if-then { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
  .if-card {
    background: #fafafa;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .if-tag {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 3px 8px;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .if-tag-q { background: #fef3c7; color: #92400e; }
  .if-tag-a { background: #d1fae5; color: #065f46; }
  .if-card-text { font-size: 14px; color: #374151; }

  /* ── YES / NO LISTS ── */
  .yn-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
  .yn-box { border-radius: 10px; padding: 16px 18px; }
  .yn-box-yes { background: #f0fdf4; border: 1px solid #bbf7d0; }
  .yn-box-no { background: #fff7f7; border: 1px solid #fecaca; }
  .yn-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
  .yn-title-yes { color: #059669; }
  .yn-title-no { color: #dc2626; }
  .yn-list { list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .yn-list li { font-size: 13px; color: #374151; display: flex; align-items: flex-start; gap: 8px; }
  .yn-list li::before { flex-shrink: 0; margin-top: 2px; }
  .yn-box-yes .yn-list li::before { content: '✓'; color: var(--emerald); font-weight: 700; }
  .yn-box-no .yn-list li::before { content: '✕'; color: #dc2626; font-weight: 700; }

  /* ── STEP LIST ── */
  .step-group { margin-bottom: 20px; }
  .step-group-title { font-size: 13px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
  .step-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .step-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 14px; color: #374151; }
  .step-num {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: var(--text);
    color: white;
    font-size: 11px;
    font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .step-num-green { background: var(--emerald); }
  .step-num-purple { background: var(--primary); }

  /* ── MAILING ADDRESSES ── */
  .address-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0; }
  .address-card {
    background: #f9fafb;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 14px 16px;
  }
  .address-bureau { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); margin-bottom: 8px; }
  .address-text { font-size: 12px; color: #374151; line-height: 1.6; font-family: 'Courier New', monospace; }

  /* ── TIMELINE TABLE ── */
  .timeline-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
  .timeline-table th {
    background: #f9fafb;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--muted); padding: 10px 14px; text-align: left;
    border: 1px solid var(--border);
  }
  .timeline-table td {
    padding: 10px 14px;
    border: 1px solid var(--border);
    font-size: 13px;
    color: #374151;
  }
  .timeline-table tr:nth-child(even) td { background: #fafafa; }

  /* ── FAQ ── */
  .faq-list { display: flex; flex-direction: column; gap: 14px; }
  .faq-item { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .faq-q { background: #f9fafb; padding: 12px 16px; font-size: 14px; font-weight: 600; color: var(--text); border-bottom: 1px solid var(--border); }
  .faq-a { padding: 12px 16px; font-size: 14px; color: #374151; }

  /* ── CHECKLIST ── */
  .checklist-section { margin-bottom: 28px; }
  .checklist-title {
    font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 10px 16px;
    border-radius: 8px 8px 0 0;
    border: 1px solid;
  }
  .cl-green { background: rgba(16,185,129,0.1); color: #059669; border-color: rgba(16,185,129,0.3); }
  .cl-purple { background: rgba(157,78,221,0.1); color: #7c3aed; border-color: rgba(157,78,221,0.3); }
  .checklist-body {
    border: 1px solid var(--border);
    border-top: none;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
  }
  .checklist-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 16px;
    border-bottom: 1px solid #f3f4f6;
    font-size: 14px;
    color: #374151;
  }
  .checklist-item:last-child { border-bottom: none; }
  .check-box {
    width: 18px; height: 18px;
    border: 2px solid #d1d5db;
    border-radius: 4px;
    flex-shrink: 0;
  }

  /* ── WHAT COMES NEXT ── */
  .next-section {
    background: linear-gradient(135deg, rgba(157,78,221,0.06), rgba(16,185,129,0.06));
    border: 1px solid rgba(157,78,221,0.15);
    border-radius: 14px;
    padding: 28px 32px;
    margin-top: 40px;
  }
  .next-title { font-size: 18px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
  .next-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
  .next-steps { display: flex; flex-direction: column; gap: 12px; }
  .next-step { display: flex; gap: 14px; align-items: flex-start; }
  .next-num {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), #6d28d9);
    color: white; font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .next-step-text { font-size: 14px; color: #374151; }
  .next-step-text strong { color: var(--text); }

  /* ── DIVIDER ── */
  .divider { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

  /* ── FOOTER ── */
  .footer {
    background: var(--header-bg);
    padding: 24px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .footer-brand { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #3f3f46; }
  .footer-brand span { color: var(--primary); }
  .footer-note { font-size: 11px; color: #3f3f46; }

  /* ── PRINT ── */
  @media print {
    .header, .footer { background: #111 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .content { padding: 32px 24px; }
    .yn-grid { grid-template-columns: 1fr 1fr; }
    .address-grid { grid-template-columns: repeat(3, 1fr); }
    body { font-size: 13px; }
    .section { page-break-inside: avoid; }
    .method-header { page-break-before: always; }
    .method-header:first-of-type { page-break-before: avoid; }
  }

  @media (max-width: 640px) {
    .header, .footer { padding: 24px; }
    .content { padding: 24px; }
    .hero-strip { padding: 16px 24px; gap: 16px; }
    .yn-grid { grid-template-columns: 1fr; }
    .address-grid { grid-template-columns: 1fr; }
    .header { flex-direction: column; align-items: flex-start; }
    .header-right { text-align: left; }
  }
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div class="header-left">
    <div class="header-badge">⚡ Free Member Blueprint</div>
    <h1>BAN <span>Credit Sweep</span></h1>
    <div class="header-sub">The Complete Hard Inquiry &amp; Data Breach Removal Blueprint</div>
  </div>
  <div class="header-right">
    <div class="header-logo">Brand <span>Activation</span> Network</div>
  </div>
</div>

<!-- HERO STRIP -->
<div class="hero-strip">
  <div class="hero-stat">
    <div class="stat-dot dot-green"></div>
    <div class="stat-label">Method 1: Phone (24-Hour)</div>
  </div>
  <div class="hero-stat">
    <div class="stat-dot dot-purple"></div>
    <div class="stat-label">Method 2: 609 Letter (7-Day)</div>
  </div>
  <div class="hero-stat">
    <div class="stat-dot dot-amber"></div>
    <div class="stat-label">2 Complete Scripts Included</div>
  </div>
</div>

<!-- CONTENT -->
<div class="content">

  <div class="intro-quote">
    "Two proven methods. One goal: a cleaner credit profile in as little as 24 hours. This blueprint is your step-by-step playbook — backed by the Fair Credit Reporting Act."
  </div>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- METHOD 1 -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div class="method-header">
    <div class="method-badge badge-green">Method 1</div>
    <div class="method-title">24-Hour Hard Inquiry Removal (Phone)</div>
  </div>

  <div class="section">
    <div class="section-title">Why This Works</div>
    <p>Hard inquiries are logged every time a lender pulls your credit file. Many of them are <strong>unauthorized, unverifiable, or fraudulent</strong> — and they are silently dragging your score down every day you leave them untouched.</p>
    <p>Under the <strong>Fair Credit Reporting Act (FCRA)</strong>, any inquiry that cannot be verified as authorized by you <strong>must be removed</strong>. Bureaus have a legal obligation to investigate — and if they can't verify it, they delete it.</p>
    <p><strong>Common unauthorized inquiry sources:</strong> Car dealerships that ran multiple pulls, stolen identity or data breach activity, inquiries tied to accounts you never opened, or soft pulls that showed up as hard pulls.</p>
  </div>

  <div class="section">
    <div class="section-title">Fraud Department Direct Lines</div>
    <p style="font-size:13px;color:#6b7280;margin-bottom:12px;">Do <strong>not</strong> use standard customer service lines. Call these directly.</p>
    <table class="contact-table">
      <thead><tr><th>Bureau</th><th>Primary Number</th><th>Alternative</th></tr></thead>
      <tbody>
        <tr><td>Experian</td><td>855-411-6048</td><td>877-284-7942 or 855-246-9409</td></tr>
        <tr><td>Equifax</td><td>888-548-7878</td><td>888-836-6351</td></tr>
        <tr><td>TransUnion</td><td>1-800-916-8800</td><td>—</td></tr>
      </tbody>
    </table>

    <div class="ivr-label">Experian IVR Navigation</div>
    <div class="ivr-box">Enter SSN → Press 2 → Press 1 → Press 2 → Press 3 → Ask for Fraud Department</div>
    <div class="ivr-label">TransUnion IVR Navigation</div>
    <div class="ivr-box">Press 0 at any time → Ask for Fraud Department</div>
  </div>

  <div class="section">
    <div class="section-title">The Exact Phone Script</div>
    <div class="script-box">
      "Hello, I was reviewing my credit report and I noticed several hard inquiries that I never authorized or applied for. I need your assistance in getting these removed today.<br><br>
      I understand that under the Fair Credit Reporting Act, any unverified or unauthorized inquiry must be removed from my report. I am prepared to provide you with the specific inquiries and the dates they were posted.<br><br>
      Can you please confirm I am speaking with the Fraud Department?"
    </div>
    <div class="if-then">
      <div class="if-card">
        <div class="if-tag if-tag-q">If asked</div>
        <div class="if-card-text">Whether you filed a police report or FTC report → Say: <strong>"Yes, I have already filed one."</strong></div>
      </div>
      <div class="if-card">
        <div class="if-tag if-tag-q">If asked</div>
        <div class="if-card-text">If you've contacted the original creditor → Say: <strong>"Yes, I have already reached out to them."</strong></div>
      </div>
      <div class="if-card">
        <div class="if-tag if-tag-a">If refused</div>
        <div class="if-card-text">Rep insists on documentation → Thank them, hang up, and call back. You will get a different representative.</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Which Inquiries Qualify</div>
    <div class="yn-grid">
      <div class="yn-box yn-box-yes">
        <div class="yn-title yn-title-yes">✓ Can Be Removed</div>
        <ul class="yn-list">
          <li>Inquiries not tied to any open or closed account</li>
          <li>No record of applying with that lender</li>
          <li>2+ years old (legally must be removed)</li>
          <li>Denied account inquiries older than 1 year</li>
        </ul>
      </div>
      <div class="yn-box yn-box-no">
        <div class="yn-title yn-title-no">✕ Cannot Be Removed</div>
        <ul class="yn-list">
          <li>Inquiries tied to an account you did open</li>
          <li>Example: Chase inquiry from when you opened a Chase card</li>
        </ul>
      </div>
    </div>
    <p style="font-size:13px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 14px;color:#92400e;margin-top:8px;">
      💡 <strong>Pro Tip:</strong> Cross-reference every inquiry against your open and closed accounts. Only challenge inquiries with no matching account.
    </p>
  </div>

  <div class="section">
    <div class="section-title">Step-by-Step Process</div>
    <div class="step-group">
      <div class="step-group-title">Before You Call</div>
      <ol class="step-list">
        <li><div class="step-num step-num-green">1</div><div>Pull your credit reports from all three bureaus</div></li>
        <li><div class="step-num step-num-green">2</div><div>List every hard inquiry you want challenged (creditor name + date)</div></li>
        <li><div class="step-num step-num-green">3</div><div>Confirm each one has no matching account in your file</div></li>
      </ol>
    </div>
    <div class="step-group">
      <div class="step-group-title">On the Call</div>
      <ol class="step-list">
        <li><div class="step-num step-num-green">1</div><div>Navigate IVR to the Fraud Department</div></li>
        <li><div class="step-num step-num-green">2</div><div>State you are disputing unauthorized hard inquiries under the FCRA</div></li>
        <li><div class="step-num step-num-green">3</div><div>Read off your target inquiries one by one</div></li>
        <li><div class="step-num step-num-green">4</div><div>If placed on hold — stay on the line. This is normal.</div></li>
        <li><div class="step-num step-num-green">5</div><div>The rep will confirm they are "launching an investigation"</div></li>
      </ol>
    </div>
    <div class="step-group">
      <div class="step-group-title">After the Call</div>
      <ol class="step-list">
        <li><div class="step-num step-num-green">1</div><div>Note the time, date, and rep's name or ID number</div></li>
        <li><div class="step-num step-num-green">2</div><div>Monitor your credit report within 24–48 hours</div></li>
        <li><div class="step-num step-num-green">3</div><div>Most inquiries removed by the <strong>next business day</strong>. Equifax may take 48 hours.</div></li>
      </ol>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Rules &amp; FAQ</div>
    <div class="faq-list">
      <div class="faq-item"><div class="faq-q">How many inquiries can I dispute at once?</div><div class="faq-a">No more than <strong>10 inquiries per bureau per call.</strong> If you have more, call back a second time.</div></div>
      <div class="faq-item"><div class="faq-q">Can I keep my credit frozen while doing this?</div><div class="faq-a"><strong>Yes.</strong> A credit freeze does not affect your ability to dispute inquiries.</div></div>
      <div class="faq-item"><div class="faq-q">Should I place a fraud alert?</div><div class="faq-a"><strong>Only if you genuinely suspect active identity theft.</strong> If a rep suggests it, decline unless you need it — it can complicate future applications.</div></div>
      <div class="faq-item"><div class="faq-q">What if a rep refuses and demands documentation?</div><div class="faq-a">Hang up. Call back. You will get a different rep. This is a known technique.</div></div>
      <div class="faq-item"><div class="faq-q">How fast do results come?</div><div class="faq-a">Fastest reported: <strong>6–24 hours.</strong> Average: <strong>24–48 hours.</strong> Maximum under FCRA: 30 days.</div></div>
      <div class="faq-item"><div class="faq-q">What's the success rate?</div><div class="faq-a">Approximately <strong>50%</strong> — depends on credit history, the specific inquiry, and which rep you reach. Persistence dramatically increases your odds.</div></div>
    </div>
  </div>

  <hr class="divider" />

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- METHOD 2 -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div class="method-header">
    <div class="method-badge badge-purple">Method 2</div>
    <div class="method-title">7-Day Credit Sweep (Data Breach / 609 Letter)</div>
  </div>

  <p style="margin-bottom:24px;">This method targets <strong>negative accounts, fraudulent items, and collections</strong> using the legal framework of identity theft protection. Best for: collections, charge-offs, fraudulent accounts, or derogatory marks not responding to standard disputes.</p>

  <div class="section">
    <div class="section-title">Step 1 — Pull All Credit Reports</div>
    <p>Get copies from all three major bureaus at <strong>AnnualCreditReport.com</strong> (official free source) or directly:</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px;">
      <div style="background:#f9fafb;border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--primary);margin-bottom:4px;">Experian</div>
        <div style="font-size:12px;color:#374151;">experian.com</div>
      </div>
      <div style="background:#f9fafb;border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--primary);margin-bottom:4px;">Equifax</div>
        <div style="font-size:12px;color:#374151;">equifax.com</div>
      </div>
      <div style="background:#f9fafb;border:1px solid var(--border);border-radius:8px;padding:12px;">
        <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:var(--primary);margin-bottom:4px;">TransUnion</div>
        <div style="font-size:12px;color:#374151;">transunion.com</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Step 2 — Freeze All Credit Profiles</div>
    <p>Place a <strong>security freeze</strong> on each bureau to prevent new fraudulent accounts from being opened while your dispute is active. A freeze does <strong>not</strong> affect your credit score and can be lifted at any time.</p>
  </div>

  <div class="section">
    <div class="section-title">Step 3 — File a Police Report Online</div>
    <p>File an official identity theft report at <strong>IdentityTheft.gov</strong> (FTC). This generates an official Identity Theft Report and can strengthen your 609 Letters. Include all fraudulent/unauthorized accounts and inquiries. <strong>Save your report number.</strong></p>
  </div>

  <div class="section">
    <div class="section-title">Step 4 — Send a 609 Letter to Each Bureau</div>
    <p>A <strong>609 Letter</strong> invokes Section 609 of the FCRA, requiring bureaus to provide original source documentation for any disputed item. If they cannot produce it, they must remove it. Send via <strong>Certified Mail with Return Receipt</strong> to create a legal paper trail.</p>
    <div class="address-grid">
      <div class="address-card">
        <div class="address-bureau">Experian</div>
        <div class="address-text">P.O. Box 4500<br>Allen, TX 75013</div>
      </div>
      <div class="address-card">
        <div class="address-bureau">Equifax</div>
        <div class="address-text">P.O. Box 740256<br>Atlanta, GA 30374</div>
      </div>
      <div class="address-card">
        <div class="address-bureau">TransUnion</div>
        <div class="address-text">P.O. Box 2000<br>Chester, PA 19016</div>
      </div>
    </div>
    <p style="font-size:13px;margin-top:12px;"><strong>Your 609 Letter must include:</strong> Full legal name, address, last 4 of SSN, DOB, list of disputed items (account + date), FCRA Section 609 citation, copy of your FTC Identity Theft Report (recommended), and your signature.</p>
  </div>

  <div class="section">
    <div class="section-title">Step 5 — Wait for Response &amp; Monitor</div>
    <table class="timeline-table">
      <thead><tr><th>Stage</th><th>Timeline</th></tr></thead>
      <tbody>
        <tr><td>Certified mail delivery</td><td>2–5 business days</td></tr>
        <tr><td>Bureau acknowledges dispute</td><td>Within 5 days</td></tr>
        <tr><td>Items removed (best case)</td><td>7–14 days</td></tr>
        <tr><td>Full legal investigation window</td><td>30 days (FCRA mandated)</td></tr>
      </tbody>
    </table>
  </div>

  <hr class="divider" />

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- COMBINED CHECKLIST -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div style="margin-bottom:8px;font-size:18px;font-weight:800;letter-spacing:-0.02em;">Combined Quick-Action Checklist</div>
  <p style="font-size:13px;color:var(--muted);margin-bottom:20px;">Print this page and check off each step as you complete it.</p>

  <div class="checklist-section">
    <div class="checklist-title cl-green">Method 1 — Phone (24-Hour Inquiry Removal)</div>
    <div class="checklist-body">
      ${["Pull credit reports from all 3 bureaus","Identify and list all unauthorized hard inquiries","Confirm no matching accounts exist for each inquiry","Call Experian Fraud Dept (855-411-6048) → run script","Call Equifax Fraud Dept (888-548-7878) → run script","Call TransUnion Fraud Dept (1-800-916-8800) → run script","Note rep name/ID and call time for each bureau","Monitor credit within 24–48 hours for removals","Repeat for remaining inquiries if needed (max 10/call)"].map(item => `
      <div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join('')}
    </div>
  </div>

  <div class="checklist-section">
    <div class="checklist-title cl-purple">Method 2 — Mail (7-Day Data Breach Sweep)</div>
    <div class="checklist-body">
      ${["Pull full credit reports from all 3 bureaus","Freeze credit at Experian, Equifax, and TransUnion","File identity theft report at IdentityTheft.gov","Write 609 Letters addressing all disputed items","Mail via Certified Mail with Return Receipt to all 3 bureaus","Track delivery and start 30-day calendar","Monitor reports for removals starting Day 7","Escalate to CFPB if bureau fails to respond within 30 days"].map(item => `
      <div class="checklist-item"><div class="check-box"></div><div>${item}</div></div>`).join('')}
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- WHAT COMES NEXT -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div class="next-section">
    <div class="next-title">What Comes Next in the BAN Blueprint</div>
    <div class="next-sub">Once your credit profile is clean, you are ready for the next phase.</div>
    <div class="next-steps">
      <div class="next-step">
        <div class="next-num">1</div>
        <div class="next-step-text"><strong>The Pledge Loan Credit Hack</strong> — Build a perfect internal score at your credit union in 60–90 days</div>
      </div>
      <div class="next-step">
        <div class="next-num">2</div>
        <div class="next-step-text"><strong>Transitioning to Business Funding</strong> — Leverage your clean personal credit to pull $50K–$250K in 0% APR business capital</div>
      </div>
      <div class="next-step">
        <div class="next-num">3</div>
        <div class="next-step-text"><strong>The Investment Blueprint</strong> — Deploy capital across real estate, index funds, and your own operations</div>
      </div>
    </div>
  </div>

</div><!-- /content -->

<!-- FOOTER -->
<div class="footer">
  <div class="footer-brand">Brand <span>Activation</span> Network</div>
  <div class="footer-note">© Brand Activation Network — For member use only. Educational purposes. Results may vary.</div>
</div>

</body>
</html>`;

    return new NextResponse(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}
