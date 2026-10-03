"use client";

import { useRef } from "react";
import { gsap, queries } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { showcase } from "@/lib/content";

export default function ShowcaseSection() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Desktop only: vertical scroll drives a horizontal track. Mobile and reduced-motion
  // visitors get a native, swipeable scroll-snap row instead (see the viewport classes).
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.desktop, () => {
      const track = trackRef.current;
      const getDistance = () => Math.max(0, track.scrollWidth - viewportRef.current.clientWidth);

      const slide = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Artwork drifts against the track for depth.
      track.querySelectorAll("[data-panel]").forEach((panel) => {
        gsap.fromTo(
          panel.querySelector("[data-art]"),
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div id="experience">
      <section
        ref={sectionRef}
        aria-labelledby="showcase-heading"
        className="flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 md:py-16"
      >
        <h2
          id="showcase-heading"
          className="mx-auto w-full max-w-[1400px] px-6 text-4xl font-semibold leading-[1.05] tracking-tight md:px-10 md:text-6xl"
        >
          {showcase.heading}
        </h2>

        <div
          ref={viewportRef}
          className="showcase-viewport mt-12 snap-x snap-mandatory overflow-x-auto md:mt-14 md:snap-none md:motion-safe:overflow-hidden"
        >
          <ul ref={trackRef} className="flex w-max gap-4 px-6 pb-4 will-change-transform md:gap-8 md:px-10 md:pb-0">
            {showcase.panels.map(({ art, title, text }) => (
              <li key={title} data-panel className="w-[78vw] shrink-0 snap-center md:w-[min(52vw,760px)]">
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden border border-line md:aspect-auto md:h-[min(46svh,420px)]">
                    <div data-art className={`${art} absolute inset-y-0 -inset-x-[10%]`} aria-hidden="true" />
                  </div>
                  <figcaption className="mt-4 max-w-md">
                    <p className="text-xl font-semibold tracking-tight">{title}</p>
                    <p className="mt-1 text-base leading-relaxed text-mute">{text}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
