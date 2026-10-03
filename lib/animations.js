import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile address-bar resizes should not trigger a layout refresh mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

export const queries = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
};

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Wait for webfonts (capped) so letter-spaced headline metrics are final before the intro plays.
export function whenFontsReady(timeout = 900) {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  return Promise.race([fontsReady, new Promise((resolve) => setTimeout(resolve, timeout))]);
}

// One-shot load sequence. Targets are different elements than the scroll timeline uses
// (letters/stats/visual-enter vs. headline/stats wrapper/layers), so the two never fight.
export function playIntro(root) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(q("[data-layer='bg']"), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0)
    .fromTo(
      q("[data-visual-enter]"),
      { opacity: 0, scale: 0.96, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "expo.out" },
      0.15
    )
    .fromTo(
      q("[data-letter]"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.045, ease: "expo.out" },
      0.4
    )
    .fromTo(q("[data-stat]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 1.1);

  return tl;
}

// The pinned hero sequence. Everything is scrubbed: progress is the scroll position, not time.
export function buildHeroScroll(root, { mobile }) {
  const q = gsap.utils.selector(root);
  const readout = root.querySelector("[data-progress]");
  const reach = mobile ? 0.5 : 1;

  // Ring orientation. The CSS fallback in globals.css matches these values for reduced motion.
  gsap.set(q("[data-ring='a']"), { transformPerspective: 900, rotationX: 68, rotationZ: -18 });
  gsap.set(q("[data-ring='b']"), { transformPerspective: 900, rotationX: 64, rotationZ: 52 });
  gsap.set(q("[data-ring='c']"), { transformPerspective: 900, rotationX: 74, rotationZ: 118 });

  let lastShown = -1;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: mobile ? "+=90%" : "+=150%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!readout) return;
        const shown = Math.round(self.progress * 100);
        if (shown === lastShown) return;
        lastShown = shown;
        readout.textContent = String(shown).padStart(3, "0");
      },
    },
  });

  tl.fromTo(
    q("[data-layer='object']"),
    { scale: mobile ? 0.7 : 0.75, x: 0, y: 0, rotation: 0, opacity: 0.7 },
    {
      scale: mobile ? 1.05 : 1.25,
      x: () => window.innerWidth * (mobile ? 0.04 : 0.13),
      y: () => -window.innerHeight * (mobile ? 0.08 : 0.12),
      rotation: mobile ? 4 : 6,
      opacity: 1,
      duration: 1,
    },
    0
  )
    .to(q("[data-ring='a']"), { rotationZ: "+=110", rotationX: "-=16", duration: 1 }, 0)
    .to(q("[data-ring='b']"), { rotationZ: "-=140", rotationX: "+=10", duration: 1 }, 0)
    .to(q("[data-ring='c']"), { rotationZ: "+=70", rotationX: "-=22", duration: 1 }, 0)
    .to(q("[data-spin]"), { rotation: 200, duration: 1 }, 0)
    .to(q("[data-core]"), { scale: 1.12, duration: 1 }, 0)
    .fromTo(
      q("[data-layer='glow']"),
      { scale: 1, opacity: 0.55, y: 0 },
      { scale: 1.5, opacity: 0.95, y: () => -window.innerHeight * 0.06, duration: 1 },
      0
    )
    .to(q("[data-layer='floor']"), { scale: 0.55, opacity: 0.15, duration: 1 }, 0)
    .to(q("[data-layer='bg']"), { yPercent: 12, duration: 1 }, 0)
    .to(q("[data-headline]"), { y: -90 * reach, scale: 1.05, opacity: 0, duration: 0.5 }, 0)
    .to(q("[data-stats]"), { y: 60, opacity: 0, duration: 0.3 }, 0)
    .fromTo(q("[data-caption]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 0.6);

  q("[data-particle]").forEach((particle) => {
    tl.to(particle, { y: -Number(particle.dataset.depth) * 260 * reach, duration: 1 }, 0);
  });

  return tl;
}
