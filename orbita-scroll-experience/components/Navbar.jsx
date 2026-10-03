"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, queries } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { brand, navLinks } from "@/lib/content";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 text-base font-semibold tracking-display uppercase">
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <ellipse cx="16" cy="16" rx="13" ry="6" stroke="#6C7BFF" strokeWidth="2" transform="rotate(-24 16 16)" />
        <circle cx="16" cy="16" r="4.5" fill="#9AA5FF" />
      </svg>
      {brand}
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.motion, () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: "power3.out" }
      );
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} data-hide className="fixed inset-x-0 top-0 z-50">
        {/* Blur lives on its own layer: backdrop-filter on the header would trap the fixed mobile menu. */}
        <div aria-hidden="true" className="absolute inset-0 border-b border-line bg-ink/60 backdrop-blur-md" />
        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10"
        >
          <Logo />

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="text-sm text-mute transition-colors hover:text-paper">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-6 bg-paper transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-paper transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-6 px-6">
          {navLinks.map(({ label, href }, index) => (
            <li
              key={href}
              className={`transition-[opacity,transform] duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + index * 70}ms` : "0ms" }}
            >
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="inline-block py-2 text-4xl font-semibold tracking-tight"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
