import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend("re_73pzFYEe_9ZRy5ZyS8pZiVs5odmQJJzaY");
const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false
    });
    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    console.log("Contact subscribed:", data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
