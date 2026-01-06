import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const email = url.searchParams.get("email");

  if (!email) {
    return new Response("Missing email parameter", { status: 400 });
  }

  try {
    // Update contact to unsubscribe globally
    // This sets the global unsubscribed status which prevents all broadcasts
    await resend.contacts.update({
      email,
      unsubscribed: true,
    });

    // Redirect to a simple confirmation page
    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <title>Unsubscribed</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; max-width: 400px; margin: 100px auto; text-align: center; padding: 0 1rem;">
  <h1 style="font-size: 1.5rem; font-weight: 500;">Unsubscribed</h1>
  <p style="color: #666;">You've been unsubscribed from all emails.</p>
  <a href="/" style="color: #1a1a1a;">← Back to site</a>
</body>
</html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new Response("Failed to unsubscribe", { status: 500 });
  }
};
