// Tiny safe inline parser for theory text. Supports **bold** and `code`
// and returns React elements — never HTML strings, so characters like
// < and > are rendered as plain text by React's default escaping.
export function renderRichText(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts
    .filter((part) => part !== "")
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }

      return part;
    });
}
