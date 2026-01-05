import { visit } from "unist-util-visit";

/**
 * Remark plugin to transform [[page name]] syntax into links to /pages/slug
 */
export function remarkWikilinks() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
      const text = node.value;

      if (!wikilinkRegex.test(text)) {
        return;
      }

      // Reset regex lastIndex after test
      wikilinkRegex.lastIndex = 0;

      const children = [];
      let lastIndex = 0;
      let match;

      while ((match = wikilinkRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }

        const pageName = match[1];
        // Convert to slug: lowercase and replace spaces with dashes
        const slug = pageName.toLowerCase().replace(/\s+/g, "-");

        // Add the link
        children.push({
          type: "link",
          url: `/pages/${slug}`,
          children: [{ type: "text", value: pageName }],
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        children.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }

      // Replace the text node with the new children
      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

/**
 * Rehype plugin to transform [[page name]] syntax into links (operates on HTML)
 */
export function rehypeWikilinks() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const wikilinkRegex = /\[\[([^\]]+)\]\]/g;
      const text = node.value;

      if (!wikilinkRegex.test(text)) {
        return;
      }

      // Reset regex lastIndex after test
      wikilinkRegex.lastIndex = 0;

      const children = [];
      let lastIndex = 0;
      let match;

      while ((match = wikilinkRegex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          });
        }

        const pageName = match[1];
        // Convert to slug: lowercase and replace spaces with dashes
        const slug = pageName.toLowerCase().replace(/\s+/g, "-");

        // Add the link as an HTML element
        children.push({
          type: "element",
          tagName: "a",
          properties: { href: `/pages/${slug}` },
          children: [{ type: "text", value: pageName }],
        });

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after last match
      if (lastIndex < text.length) {
        children.push({
          type: "text",
          value: text.slice(lastIndex),
        });
      }

      // Replace the text node with the new children
      if (children.length > 0) {
        parent.children.splice(index, 1, ...children);
        return index + children.length;
      }
    });
  };
}

export default remarkWikilinks;
