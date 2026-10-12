import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Simple in-memory rate limit (per instance). Use a shared store such as Upstash Redis at scale.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages from this connection. Try again in 10 minutes." }, { status: 429 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "The form data could not be read." }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Some fields need attention.", fields: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Bots fill hidden fields or submit implausibly fast. Accept silently so they learn nothing.
  if (data.website || Date.now() - data.startedAt < 3000) return NextResponse.json({ ok: true });

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ error: "Spam check failed. Reload the page and try again." }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Email delivery not configured. Submission:", { ...data, message: data.message.slice(0, 200) });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Messages cannot be sent right now. Email us directly instead." }, { status: 503 });
  }

  const html = `
    <h2>New enquiry from the website</h2>
    <p><strong>Name:</strong> ${escape(data.name)}<br/>
    <strong>Organisation:</strong> ${escape(data.company)}<br/>
    <strong>Email:</strong> ${escape(data.email)}<br/>
    <strong>Phone:</strong> ${escape(data.phone || "Not given")}<br/>
    <strong>Area of interest:</strong> ${escape(data.interest)}</p>
    <p>${escape(data.message).replace(/\n/g, "<br/>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `Website enquiry: ${data.interest} (${data.company})`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Email provider error", res.status);
    return NextResponse.json({ error: "Your message was not sent. Try again, or email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
