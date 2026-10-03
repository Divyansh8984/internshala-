"use client";

import { useRef } from "react";
import { gsap, queries } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { cta } from "@/lib/content";

export default function CtaSection() {
  const sectionRef = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.motion, () => {
      const scope = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        scope("[data-cta-ring]"),
        { rotation: -30, scale: 0.9 },
        {
          rotation: 60,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );

      gsap.fromTo(
        scope("[data-cta-content]"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[90svh] items-center justify-center overflow-hidden px-6 py-28 md:px-10"
    >
      <div
        data-cta-ring
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[min(45vw,450px)] -mt-[min(45vw,450px)] h-[min(90vw,900px)] w-[min(90vw,900px)] rounded-full border border-line will-change-transform"
        style={{ borderTopColor: "rgba(108, 123, 255, 0.9)", boxShadow: "0 0 80px rgba(108, 123, 255, 0.12) inset" }}
      />

      <div data-cta-content data-hide className="relative z-10 text-center">
        <h2 className="mx-auto max-w-4xl pl-[0.12em] text-[clamp(2rem,6.5vw,5.5rem)] font-semibold uppercase leading-[1.1] tracking-[0.12em]">
          {cta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-mute">{cta.text}</p>
        <a
          href={cta.href}
          className="group mt-10 inline-flex min-h-12 items-center gap-3 bg-accent px-8 py-4 text-base font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
        >
          {cta.button}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
          >
            <path d="M2 9h13M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </a>
      </div>
    </section>
  );
}
