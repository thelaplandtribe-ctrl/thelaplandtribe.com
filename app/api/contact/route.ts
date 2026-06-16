import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  botcheck?: string;
};

const SUBJECTS = new Set(["Question générale", "Commande", "Partenariat", "Presse"]);
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (payload.botcheck) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const subject = (payload.subject || "").trim();
  const message = (payload.message || "").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
  }
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }
  if (!SUBJECTS.has(subject)) {
    return NextResponse.json({ error: "Sujet invalide" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Message trop court ou trop long" },
      { status: 400 },
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { error: "WEB3FORMS_ACCESS_KEY manquante côté serveur" },
      { status: 500 },
    );
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: `The Lapland Tribe · ${name}`,
      subject: `[Contact] ${subject} — ${name}`,
      replyto: email,
      name,
      email,
      sujet: subject,
      message,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.success === false) {
    return NextResponse.json(
      { error: data?.message || "Échec de l'envoi" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
