import { BrevoClient } from "@getbrevo/brevo";

function getBrevoClient() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

const SENDER = {
  email: process.env.BREVO_SENDER_EMAIL ?? "talent@shaper.co.za",
  name: process.env.BREVO_SENDER_NAME ?? "Shaper",
};

const ADMIN_EMAIL = process.env.BREVO_ADMIN_EMAIL ?? "talent@shaper.co.za";

// Logo hosted on Vercel Blob — reliable across all email clients
const LOGO_URL = "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper_logo.png";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://talent.shaper.co.za";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ShortlistedCandidate {
  fullname: string;
  role: string | null;
  location: string | null;
  status: string | null;
  profileUrl: string;
}

export interface EnquiryEmailPayload {
  contactName: string;
  companyName: string;
  email: string;
  message: string | null;
  candidates: ShortlistedCandidate[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusColour = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case "available for wpe": return "#f97316";
    case "available for hire": return "#f59e0b";
    case "in wpe": return "#8b5cf6";
    case "employed": return "#14b8a6";
    default: return "#f97316";
  }
};

function candidateRowsHtml(candidates: ShortlistedCandidate[]): string {
  return candidates.map((c) => {
    const initials = c.fullname
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
    const colour = statusColour(c.status);
    const nameParts = c.fullname.split(" ");
    const firstName = nameParts[0];
    const lastInitial = nameParts.length > 1 ? ` ${nameParts[nameParts.length - 1][0]}.` : "";

    return `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f3f4f6;vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <!-- Avatar -->
              <td style="vertical-align:middle;padding-right:14px;">
                <div style="width:44px;height:44px;border-radius:50%;background:#f1f5f9;display:inline-block;text-align:center;line-height:44px;font-size:14px;font-weight:700;color:#475569;font-family:'Helvetica Neue',Arial,sans-serif;">
                  ${initials}
                </div>
              </td>
              <!-- Info -->
              <td style="vertical-align:middle;">
                <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#111827;font-family:'Helvetica Neue',Arial,sans-serif;">
                  ${firstName}<span style="font-weight:300;">${lastInitial}</span>
                </div>
                <div style="font-size:12px;color:#6b7280;margin-top:2px;font-family:'Helvetica Neue',Arial,sans-serif;">${c.role ?? ""}</div>
                ${c.location ? `<div style="font-size:11px;color:#9ca3af;margin-top:2px;font-family:'Helvetica Neue',Arial,sans-serif;">📍 ${c.location}</div>` : ""}
              </td>
            </tr>
          </table>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid #f3f4f6;vertical-align:middle;text-align:right;">
          ${c.status ? `<span style="display:inline-block;background:${colour};color:white;font-size:10px;font-weight:700;letter-spacing:0.5px;padding:3px 10px;border-radius:20px;font-family:'Helvetica Neue',Arial,sans-serif;white-space:nowrap;">${c.status}</span>` : ""}
          <br/>
          <a href="${c.profileUrl}" style="font-size:11px;color:#dc2626;text-decoration:none;font-family:'Helvetica Neue',Arial,sans-serif;margin-top:6px;display:inline-block;">View profile →</a>
        </td>
      </tr>
    `;
  }).join("");
}

// ─── Shared email wrapper ─────────────────────────────────────────────────────
function emailWrapper(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Shaper Talent</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f4f6;padding:40px 16px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;">

          <!-- Main Card -->
          <tr>
            <td style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 0 0 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.8;">
                <strong style="color:#6b7280;">Shaper Talent Platform</strong><br/>
                <a href="mailto:talent@shaper.co.za" style="color:#dc2626;text-decoration:none;">talent@shaper.co.za</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:#9ca3af;text-decoration:none;">talent.shaper.co.za</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#d1d5db;">
                © ${new Date().getFullYear()} Shaper. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── 1. Admin notification email ──────────────────────────────────────────────
export async function sendAdminEnquiryEmail(payload: EnquiryEmailPayload): Promise<void> {
  const client = getBrevoClient();
  const count = payload.candidates.length;

  const body = `
    <!-- Header -->
    <div style="padding:32px 36px 24px;border-bottom:1px solid #f3f4f6;text-align:center;">
      <div style="margin:0 auto 20px;text-align:center;">
        <img src="${LOGO_URL}" alt="Shaper" width="130" style="display:block;height:auto;margin:0 auto;" />
      </div>
      <div style="display:inline-block;background:#fef2f2;border-radius:6px;padding:4px 12px;margin-bottom:12px;">
        <span style="font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:1.5px;">New Enquiry</span>
      </div>
      <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#111827;font-family:'Helvetica Neue',Arial,sans-serif;">
        New Shortlist Enquiry
      </h1>
      <p style="margin:0;font-size:14px;color:#6b7280;">
        <strong style="color:#111827;">${payload.companyName}</strong> has shortlisted
        <strong style="color:#dc2626;">${count} candidate${count !== 1 ? "s" : ""}</strong>
      </p>
    </div>

    <!-- Contact details -->
    <div style="padding:24px 36px;border-bottom:1px solid #f3f4f6;background:#fafafa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="padding:6px 0;width:120px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;vertical-align:top;">Contact</td>
          <td style="padding:6px 0;font-size:14px;color:#111827;font-weight:600;">${payload.contactName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;width:120px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Company</td>
          <td style="padding:6px 0;font-size:14px;color:#111827;">${payload.companyName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;width:120px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Email</td>
          <td style="padding:6px 0;font-size:14px;">
            <a href="mailto:${payload.email}" style="color:#dc2626;text-decoration:none;font-weight:600;">${payload.email}</a>
          </td>
        </tr>
        ${payload.message ? `
        <tr>
          <td style="padding:6px 0;width:120px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;vertical-align:top;">Message</td>
          <td style="padding:6px 0;font-size:14px;color:#374151;line-height:1.7;">${payload.message}</td>
        </tr>` : ""}
      </table>
    </div>

    <!-- Candidates -->
    <div style="padding:24px 36px;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">
        Shortlisted Candidates (${count})
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${candidateRowsHtml(payload.candidates)}
      </table>
    </div>

    <!-- CTA -->
    <div style="padding:20px 36px 32px;text-align:center;">
      <a href="mailto:${payload.email}" style="display:inline-block;background:#dc2626;color:white;font-size:13px;font-weight:700;padding:12px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
        Reply to ${payload.contactName}
      </a>
    </div>
  `;

  await client.transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: ADMIN_EMAIL, name: "Shaper Team" }],
    replyTo: { email: payload.email, name: payload.contactName },
    subject: `New enquiry from ${payload.companyName} — ${count} candidate${count !== 1 ? "s" : ""} shortlisted`,
    htmlContent: emailWrapper(body),
  });
}

// ─── 2. Submitter confirmation email ─────────────────────────────────────────
export async function sendSubmitterConfirmationEmail(payload: EnquiryEmailPayload): Promise<void> {
  const client = getBrevoClient();
  const count = payload.candidates.length;

  const body = `
    <!-- Header -->
    <div style="padding:36px 36px 28px;text-align:center;border-bottom:1px solid #f3f4f6;">
      <!-- Logo -->
      <div style="margin:0 auto 20px;">
        <img src="${LOGO_URL}" alt="Shaper" width="130" style="display:block;height:auto;margin:0 auto;" />
      </div>
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;font-family:'Helvetica Neue',Arial,sans-serif;">
        We've got your enquiry!
      </h1>
      <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.6;">
        Hi <strong style="color:#111827;">${payload.contactName}</strong>, thanks for reaching out through the Shaper TALENT Platform.
      </p>
    </div>

    <!-- What happens next -->
    <div style="padding:28px 36px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 16px;font-size:13px;color:#374151;line-height:1.8;">
        A member of the Shaper team will be in touch shortly to discuss candidate availability,
        facilitate introductions where appropriate, and support the next steps in the engagement process.
      </p>
      <!-- Summary card -->
      <div style="background:#fafafa;border-left:3px solid #dc2626;border-radius:0 8px 8px 0;padding:16px 20px;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">Your submission summary</p>
        <p style="margin:0;font-size:14px;color:#111827;">
          <strong>${payload.companyName}</strong>
          &nbsp;·&nbsp;
          <span style="color:#dc2626;font-weight:600;">${count} candidate${count !== 1 ? "s" : ""} shortlisted</span>
        </p>
      </div>
    </div>

    <!-- Shortlisted candidates -->
    <div style="padding:24px 36px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">
        Your Shortlisted Candidates
      </p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        ${candidateRowsHtml(payload.candidates)}
      </table>
    </div>

    <!-- Continue browsing CTA -->
    <div style="padding:28px 36px;text-align:center;">
      <p style="margin:0 0 20px;font-size:13px;color:#6b7280;line-height:1.7;">
        Questions? We're always happy to help.<br/>
        Reach out at <a href="mailto:talent@shaper.co.za" style="color:#dc2626;text-decoration:none;font-weight:600;">talent@shaper.co.za</a>
      </p>
      <a href="${SITE_URL}/talent" style="display:inline-block;background:#111827;color:white;font-size:13px;font-weight:700;padding:12px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
        Continue Browsing Talent
      </a>
    </div>
  `;

  await client.transactionalEmails.sendTransacEmail({
    sender: SENDER,
    to: [{ email: payload.email, name: payload.contactName }],
    subject: `We've received your Shaper shortlist enquiry`,
    htmlContent: emailWrapper(body),
  });
}
