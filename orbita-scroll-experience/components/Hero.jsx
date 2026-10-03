"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  queries,
  prefersReducedMotion,
  whenFontsReady,
  playIntro,
  buildHeroScroll,
} from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { heroLines, heroCaption } from "@/lib/content";
import ScrollVisual from "./ScrollVisual";
import Stats from "./Stats";

export default function Hero() {
  const heroRef = useRef(null);

  useIsoLayoutEffect(() => {
    const root = heroRef.current;
    let cancelled = false;
    let introContext;

    // Scroll sequence is responsive; the intro runs once and is not replayed on breakpoint changes.
    const mm = gsap.matchMedia();
    mm.add({ desktop: queries.desktop, mobile: queries.mobile }, (context) => {
      buildHeroScroll(root, { mobile: context.conditions.mobile });
    });

    if (!prefersReducedMotion()) {
      whenFontsReady().then(() => {
        if (cancelled) return;
        introContext = gsap.context(() => playIntro(root), root);
        ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      introContext?.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={heroRef} data-hero className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      <div data-layer="bg" data-hide aria-hidden="true" className="hero-bg absolute -inset-[10%] will-change-transform" />

      <ScrollVisual />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1
          data-headline
          aria-label={heroLines.join(" ")}
          className="pl-[0.16em] text-center text-[clamp(2.1rem,9vw,7.5rem)] font-semibold uppercase leading-[1.08] tracking-display will-change-transform"
        >
          {heroLines.map((line) => (
            <span key={line} aria-hidden="true" className="block">
              {line.split(" ").map((word) => (
                <span key={word} className="mr-[0.45em] inline-block whitespace-nowrap last:mr-0">
                  {[...word].map((letter, index) => (
                    <span key={`${word}-${index}`} data-letter data-hide className="inline-block">
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <p
        data-caption
        className="absolute bottom-8 left-6 z-10 max-w-[18rem] text-base leading-relaxed text-paper md:bottom-10 md:left-10 md:max-w-sm md:text-lg"
      >
        {heroCaption}
      </p>

      <p
        aria-hidden="true"
        className="absolute right-6 top-20 z-10 text-xs tabular-nums text-mute motion-reduce:hidden md:right-10"
      >
        Scroll <span data-progress>000</span>%
      </p>

      <Stats />
    </section>
  );
}
