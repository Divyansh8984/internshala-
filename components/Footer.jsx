import { brand, footerNote, navLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-display uppercase">{brand}</p>
          <p className="mt-3 max-w-xs text-sm text-mute">{footerNote}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="inline-block py-2 text-sm text-mute transition-colors hover:text-paper">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-mute">&copy; {new Date().getFullYear()} {brand}</p>
      </div>
    </footer>
  );
}
