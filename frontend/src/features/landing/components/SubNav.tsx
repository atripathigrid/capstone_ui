/** Sticky in-page section nav, ported from login_page.html's <nav>. */
const LINKS = [
  { href: "#platform", label: "The Revenue AI OS", active: true },
  { href: "#capabilities", label: "Capabilities Mapping", active: false },
  { href: "#maturity-model", label: "Maturity Model Tiers", active: false },
  { href: "#integration-stack", label: "Technical Stack Integration", active: false },
];

export function SubNav() {
  return (
    <nav className="subnav-sticky hidden md:block">
      <div className="max-w-7xl mx-auto px-8 flex gap-8">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              l.active
                ? "border-secondary text-secondary"
                : "border-transparent text-on-surface-variant hover:text-white"
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
