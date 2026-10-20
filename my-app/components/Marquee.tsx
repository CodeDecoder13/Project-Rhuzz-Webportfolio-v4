const items = "Next.js ✦ Vue 3 ✦ Laravel ✦ .NET ✦ Playwright ✦ Selenium ✦ Docker ✦ PostgreSQL ✦ GitHub Actions ✦ ";

export default function Marquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden whitespace-nowrap border-y-[1.5px] border-ink bg-sky py-3">
      <div className="display inline-block animate-[marquee_28s_linear_infinite] text-[28px] leading-[1.6]">
        {items.repeat(4)}
      </div>
    </div>
  );
}
