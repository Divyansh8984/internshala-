"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { particles } from "@/lib/content";

export default function ScrollVisual() {
  const tiltRef = useRef(null);

  // Pointer lean: fine-pointer devices only, listeners scoped to the hero (not window).
  useIsoLayoutEffect(() => {
    const tilt = tiltRef.current;
    const host = tilt.closest("[data-hero]");
    const mm = gsap.matchMedia();

    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(tilt, { transformPerspective: 1200 });
      const rotateX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
      const rotateY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3.out" });

      const onMove = (event) => {
        rotateY((event.clientX / window.innerWidth - 0.5) * 10);
        rotateX(-(event.clientY / window.innerHeight - 0.5) * 10);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      return () => {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div data-visual-enter data-hide aria-hidden="true" className="orb-root pointer-events-none absolute inset-0">
      <div data-layer="glow" className="orb-layer orb-glow will-change-transform" />
      <div data-layer="floor" className="orb-floor will-change-transform" />

      <div data-layer="object" className="orb-layer will-change-transform">
        <div ref={tiltRef} className="absolute inset-0">
          <div data-ring="a" className="orb-ring orb-ring-a">
            <div data-spin className="orb-ticks" />
          </div>
          <div data-core className="orb-core" />
          <div data-ring="b" className="orb-ring orb-ring-b">
            <span className="orb-satellite" />
          </div>
          <div data-ring="c" className="orb-ring orb-ring-c" />
        </div>
      </div>

      <div data-layer="particles" className="absolute inset-0">
        {particles.map(({ x, y, size, depth }) => (
          <span
            key={`${x}-${y}`}
            data-particle
            data-depth={depth}
            className="particle will-change-transform"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
          />
        ))}
      </div>
    </div>
  );
}
