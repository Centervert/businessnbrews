import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  email: string;
  topic?: string;
  message: string;
};

function isValidPayload(payload: ContactPayload) {
  return (
    payload.name?.trim() &&
    payload.email?.trim() &&
    payload.message?.trim()
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!isValidPayload(body)) {
    return Response.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { ok: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  const from = process.env.RESEND_FROM_EMAIL || "hello@businessandbrewssc.com";
  const to = process.env.RESEND_TO_EMAIL || "team@businessandbrewssc.com";
  const subject = body.topic
    ? `Business & Brews Inquiry: ${body.topic}`
    : "Business & Brews Inquiry";

  await resend.emails.send({
    from,
    to,
    replyTo: body.email,
    subject,
    text: `${body.name} (${body.email})\n\n${body.message}`,
  });

  return Response.json({ ok: true });
}
