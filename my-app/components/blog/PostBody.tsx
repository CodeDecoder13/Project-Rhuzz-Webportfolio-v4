import { cleanHtml } from "@/lib/sanitize";

// Sanitized again at render time, so even a row written outside the admin can't inject markup.
export default function PostBody({ html }: { html: string }) {
  return (
    <div
      className="post-prose"
      dangerouslySetInnerHTML={{ __html: cleanHtml(html) }}
    />
  );
}
