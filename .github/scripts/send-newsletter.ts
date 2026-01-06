import { Resend } from "resend";
import { readFileSync } from "fs";
import { join } from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteUrl = process.env.SITE_URL || "https://johnjeong.com";
const prBody = process.env.PR_BODY || "";

const newsletterPattern = /\/newsletter\s+(\S+)/g;
const matches = [...prBody.matchAll(newsletterPattern)];

if (matches.length === 0) {
  console.log("No /newsletter commands found in PR body");
  process.exit(0);
}

const contentTypes = ["essays", "journals", "inspirations", "lessons"] as const;
type ContentType = (typeof contentTypes)[number];

function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(.*)$/, "<p>$1</p>");
}

function parseFrontmatter(content: string): {
  frontmatter: Record<string, string>;
  body: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    return { frontmatter: {}, body: content };
  }

  const frontmatter: Record<string, string> = {};
  frontmatterMatch[1].split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(":").trim();
    }
  });

  return { frontmatter, body: frontmatterMatch[2] };
}

function getContentType(path: string): string | null {
  const match = path.match(/^(essays|journals|inspirations|lessons)\//);
  return match ? match[1] : null;
}

function pathToUrl(path: string): string {
  const contentType = getContentType(path);
  if (!contentType) return siteUrl;

  const filename = path.replace(`${contentType}/`, "").replace(".md", "");
  return `${siteUrl}/${contentType}/${filename}`;
}

function buildEmailHtml(
  title: string,
  content: string,
  contentType: string,
  url: string,
  email: string,
): string {
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      max-width: 640px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    h1 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-style: italic;
      font-size: 2.25rem;
      font-weight: 400;
      line-height: 1.3;
      margin: 0 0 0.5rem 0;
    }
    h2 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 1.3;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    h3 {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.3;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    .meta {
      color: #666;
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
    .content {
      margin-bottom: 2rem;
    }
    .content p {
      margin-bottom: 1em;
    }
    .content a {
      color: inherit;
    }
    blockquote {
      border-left: 2px solid #ccc;
      padding-left: 1em;
      margin: 1em 0;
      color: #666;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
      font-size: 0.9em;
      background: #f4f4f4;
      padding: 0.1em 0.3em;
      border-radius: 3px;
    }
    .cta {
      margin: 2rem 0;
    }
    .cta a {
      display: inline-block;
      padding: 0.4rem 0.75rem;
      background: #fff;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      text-decoration: none;
      color: #333;
      font-size: 0.875rem;
    }
    .footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      font-size: 0.75rem;
      color: #999;
    }
    .footer a {
      color: #666;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p class="meta">New ${contentType.slice(0, -1)} from John Jeong</p>
  <div class="content">
    ${content}
  </div>
  <div class="cta">
    <a href="${url}">Read on website</a>
  </div>
  <div class="footer">
    <p>You're receiving this because you subscribed to updates.</p>
    <p><a href="${unsubscribeUrl}">Unsubscribe</a></p>
  </div>
</body>
</html>
`;
}

async function sendNewsletter(path: string) {
  const contentType = getContentType(path);
  if (!contentType || !contentTypes.includes(contentType as ContentType)) {
    console.log(`Skipping ${path}: unknown content type`);
    return;
  }

  const filePath = join(process.cwd(), "part-of-my-brain", path);
  let fileContent: string;
  try {
    fileContent = readFileSync(filePath, "utf-8");
  } catch (e) {
    console.error(`Failed to read ${filePath}:`, e);
    return;
  }

  const { frontmatter, body } = parseFrontmatter(fileContent);
  const title =
    frontmatter.title ||
    path.split("/").pop()?.replace(".md", "") ||
    "New Update";
  const htmlContent = markdownToHtml(body.trim());
  const url = pathToUrl(path);

  const { data: contactsResponse } = await resend.contacts.list({});
  const contacts = contactsResponse?.data || [];

  const subscribers = contacts.filter((contact) => !contact.unsubscribed);

  console.log(`Sending "${title}" to ${subscribers.length} subscribers`);

  if (subscribers.length === 0) {
    console.log("No subscribers");
    return;
  }

  for (let i = 0; i < subscribers.length; i += 100) {
    const batch = subscribers.slice(i, i + 100);

    await resend.batch.send(
      batch.map((subscriber) => ({
        from: "John Jeong <newsletter@johnjeong.com>",
        to: subscriber.email,
        subject: title,
        html: buildEmailHtml(
          title,
          htmlContent,
          contentType,
          url,
          subscriber.email,
        ),
      })),
    );
  }

  console.log(`Successfully sent "${title}" newsletter`);
}

async function main() {
  console.log(`Found ${matches.length} newsletter command(s)`);

  for (const match of matches) {
    const path = match[1];
    console.log(`Processing: ${path}`);
    await sendNewsletter(path);
  }
}

main().catch(console.error);
