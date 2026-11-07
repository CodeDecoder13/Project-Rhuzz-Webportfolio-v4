// Shared pieces for the neo-brutalist emails. Inline styles and tables only, which is what mail clients reliably render.
// The offset blue "shadow" is drawn with thick right/bottom borders so it survives Gmail and Outlook.

// Everything user-supplied goes through esc() before it reaches HTML.
export const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const INK = "#0B1B33";
export const BLUE = "#1F5FBF";
export const SKY = "#8DBBF2";
export const PAPER = "#F2F6FB";
export const MUTED = "#51627A";
export const mono = "'Courier New',Courier,monospace";
export const sans = "Arial,Helvetica,sans-serif";

export const label = (t: string) =>
  `<div style="font:700 11px ${mono};letter-spacing:.12em;text-transform:uppercase;color:${BLUE};margin:0 0 4px">${t}</div>`;

export const title = (t: string) =>
  `<div style="font:900 30px/1.1 ${sans};color:${INK};letter-spacing:-.02em">${t}</div>`;

export const button = (
  href: string,
  text: string,
  fill = BLUE,
  fg = "#ffffff",
) =>
  `<a href="${href}" style="display:inline-block;background:${fill};color:${fg};font:700 13px ${mono};letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:3px solid ${INK};border-right-width:6px;border-bottom-width:6px;border-radius:999px;padding:12px 22px;margin:0 8px 10px 0">${text}</a>`;

// A bordered box of label/value cells; `cells` are already-escaped HTML, laid out two per row.
export const grid = (cells: [string, string][]) => {
  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += 2) {
    const pair = cells.slice(i, i + 2);
    rows.push(
      `<tr>${pair
        .map(
          ([l, v], j) =>
            `<td style="padding:14px 16px;vertical-align:top;width:50%;${j === 0 && pair.length > 1 ? `border-right:2px solid ${INK};` : ""}${i > 0 ? `border-top:2px solid ${INK};` : ""}">${label(l)}<div style="font:700 16px ${sans};color:${INK};word-break:break-word">${v}</div></td>`,
        )
        .join("")}</tr>`,
    );
  }
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px solid ${INK};border-radius:10px;background:${PAPER}">${rows.join("")}</table>`;
};

export const pill = (t: string, bg = SKY) =>
  `<span style="display:inline-block;font:700 12px ${mono};letter-spacing:.08em;text-transform:uppercase;color:${INK};background:${bg};border:2px solid ${INK};border-radius:999px;padding:4px 12px">${t}</span>`;

// The card: dark header with the wordmark and a tag, the body rows, and a footer line.
export function shell(tag: string, rows: string[], foot: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${PAPER}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:3px solid ${INK};border-right:9px solid ${BLUE};border-bottom:9px solid ${BLUE};border-radius:14px">
  <tr><td style="background:${INK};padding:18px 24px;border-bottom:3px solid ${INK};border-radius:10px 10px 0 0">
    <span style="font:700 26px ${sans};color:#ffffff;letter-spacing:-.01em">rhuzz<span style="color:${SKY}">.</span></span>
    <span style="float:right;font:700 11px ${mono};letter-spacing:.12em;text-transform:uppercase;color:${INK};background:${SKY};border:2px solid ${SKY};border-radius:999px;padding:5px 12px">${esc(tag)}</span>
  </td></tr>
  ${rows.map((r, i) => `<tr><td style="padding:${i === 0 ? "28px" : "16px"} 24px 8px">${r}</td></tr>`).join("\n  ")}
  <tr><td style="height:14px;line-height:14px">&nbsp;</td></tr>
  <tr><td style="background:${PAPER};border-top:2px solid ${INK};padding:14px 24px;border-radius:0 0 10px 10px;font:11px/1.6 ${mono};letter-spacing:.06em;color:${MUTED};text-transform:uppercase">${foot}</td></tr>
</table>
</td></tr></table></body></html>`;
}
