import { Resend } from "resend";
export { renderers } from "../../renderers.mjs";

const resend = new Resend("re_3cFgnfue_Gno9gFu3p4vTvv7qbY83wQar");
const prerender = false;
const GET = async ({ url }) => {
  const email = url.searchParams.get("email");
  if (!email) {
    return new Response("Missing email parameter", { status: 400 });
  }
  try {
    await resend.contacts.update({
      email,
      unsubscribed: true,
    });
    return new Response(
      `<!DOCTYPE html>
<html>
<head><title>Unsubscribed</title></head>
<body style="font-family: system-ui; max-width: 400px; margin: 100px auto; text-align: center;">
  <h1>Unsubscribed</h1>
  <p>You've been unsubscribed from the newsletter.</p>
  <a href="/">← Back to site</a>
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

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      GET,
      prerender,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);

const page = () => _page;

export { page };
