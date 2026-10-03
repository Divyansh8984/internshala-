"use client";

import { useRef } from "react";
import { gsap, queries } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { features } from "@/lib/content";

export default function FeatureSection() {
  const gridRef = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.motion, () => {
      gsap.fromTo(
        gridRef.current.querySelectorAll("[data-card]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="features" className="px-6 pb-28 md:px-10 md:pb-44">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {features.heading}
        </h2>

        <ul ref={gridRef} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {features.items.map(({ number, title, text }) => (
            <li key={number} data-card data-hide>
              <article className="group h-full border border-line bg-panel p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none md:p-8">
                <p className="text-sm tabular-nums text-accent-soft">{number}</p>
                <h3 className="mt-10 text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mute">{text}</p>
                <span
                  aria-hidden="true"
                  className="mt-8 block h-px origin-left scale-x-[0.2] bg-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
