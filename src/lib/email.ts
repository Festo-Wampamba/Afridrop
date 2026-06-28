const POSTAL_API_URL = process.env.POSTAL_API_URL;
const POSTAL_API_KEY = process.env.POSTAL_API_KEY;

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  plainText?: string;
  from?: string;
  sender?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  plainText,
  from = "hello@afridropsolutions.com",
  sender = "Afridrop Solutions",
}: SendEmailOptions) {
  if (!POSTAL_API_URL || !POSTAL_API_KEY) {
    console.error("Postal API not configured — skipping email send");
    return;
  }

  const response = await fetch(`${POSTAL_API_URL}/api/v1/send/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Server-API-Key": POSTAL_API_KEY,
    },
    body: JSON.stringify({
      to: [to],
      from,
      sender,
      subject,
      html_body: html,
      plain_body: plainText ?? subject,
    }),
  });

  const data = await response.json();

  if (data.status !== "success") {
    console.error("Postal email send failed:", data);
    throw new Error("Failed to send email");
  }

  return data;
}