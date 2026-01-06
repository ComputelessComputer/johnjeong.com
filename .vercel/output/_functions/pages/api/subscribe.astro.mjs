import { Resend } from "resend";
export { renderers } from "../../renderers.mjs";

const resend = new Resend("re_3cFgnfue_Gno9gFu3p4vTvv7qbY83wQar");
const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, preferences } = body;
    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const prefs = preferences || {};
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      properties: {
        essays: prefs.essays ? "true" : "false",
        journals: prefs.journals ? "true" : "false",
        inspirations: prefs.inspirations ? "true" : "false",
        lessons: prefs.lessons ? "true" : "false",
      },
    });
    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log("Contact created:", data);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return new Response(JSON.stringify({ error: "Failed to subscribe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      POST,
      prerender,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);

const page = () => _page;

export { page };
