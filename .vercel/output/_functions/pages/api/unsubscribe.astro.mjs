import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend("re_73pzFYEe_9ZRy5ZyS8pZiVs5odmQJJzaY");
const prerender = false;
const GET = async ({ url }) => {
  const email = url.searchParams.get("email");
  if (!email) {
    return new Response("Missing email parameter", { status: 400 });
  }
  try {
    await resend.contacts.update({
      email,
      unsubscribed: true
    });
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
        headers: { "Content-Type": "text/html" }
      }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return new Response("Failed to unsubscribe", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
