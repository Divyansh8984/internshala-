"use client";

import { useRef } from "react";
import { gsap, queries } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { about } from "@/lib/content";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.motion, () => {
      const scope = gsap.utils.selector(sectionRef);

      gsap.fromTo(
        scope("[data-about-heading]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Words light up in sequence as the paragraph crosses the viewport.
      gsap.fromTo(
        scope(".word"),
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: scope("[data-about-text]")[0],
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="px-6 py-28 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12">
        <h2
          data-about-heading
          data-hide
          className="text-4xl font-semibold leading-[1.05] tracking-tight md:col-span-5 md:text-6xl"
        >
          {about.heading}
        </h2>
        <p data-about-text className="text-2xl leading-snug md:col-span-7 md:text-4xl md:leading-snug">
          {about.paragraph.split(" ").map((word, index) => (
            <span key={`${word}-${index}`}>
              <span className="word">{word}</span>{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
