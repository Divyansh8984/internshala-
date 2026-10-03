// All copy and repeated UI data lives here so the page can be re-skinned without touching components.

export const brand = "Orbita";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroLines = ["Enter the", "Orbit"];

export const heroCaption =
  "Every frame here follows your scroll. Nothing on this page runs on a timer.";

// Placeholder figures for demonstration only. Replace with real, verifiable numbers.
export const stats = [
  { value: "98%", label: "Visual quality" },
  { value: "4.9x", label: "Faster interaction" },
  { value: "72%", label: "More engagement" },
  { value: "24/7", label: "Experience" },
];

export const about = {
  heading: "Designed for motion",
  paragraph:
    "Most pages animate on a timer. This one does not. Each transform you see is tied to your scroll position and eased with a short delay, so the page moves when you move and stops when you stop. Scroll back up and everything unwinds exactly as it arrived.",
};

export const features = {
  heading: "Four constraints behind every frame",
  items: [
    {
      number: "01",
      title: "Smooth motion",
      text: "Scroll position drives each transform. Scrub smoothing lets fast flicks settle instead of snap.",
    },
    {
      number: "02",
      title: "Intelligent interaction",
      text: "The hero object leans toward the pointer on devices that have one, and stays still on touch screens.",
    },
    {
      number: "03",
      title: "Responsive experience",
      text: "Distances, scale and pinning are retuned per breakpoint with gsap.matchMedia.",
    },
    {
      number: "04",
      title: "Performance first",
      text: "Transform and opacity only, one ScrollTrigger per sequence, everything reverted on unmount.",
    },
  ],
};

export const showcase = {
  heading: "Every layer moves at its own speed",
  panels: [
    { art: "art-1", title: "Depth", text: "Glow, object and particles travel at different rates, so the scene reads as having distance behind it." },
    { art: "art-2", title: "Pace", text: "A short scrub delay keeps motion fluid whether you scroll slowly or throw the page." },
    { art: "art-3", title: "Weight", text: "Scale and rotation grow together, which gives the object a sense of mass as it approaches." },
    { art: "art-4", title: "Focus", text: "Supporting text fades out as the object takes over, then returns the moment you scroll up." },
    { art: "art-5", title: "Release", text: "When the sequence ends the pin lets go and the next section arrives without a jump." },
  ],
};

export const cta = {
  heading: "Ready to experience more?",
  text: "Take the structure, swap the content and ship it as a static site.",
  button: "Start a project",
  href: "mailto:hello@example.com",
};

export const footerNote = "Built with Next.js, React, Tailwind CSS and GSAP.";

// Decorative particles: x/y are hero percentages, depth scales how far each travels on scroll.
export const particles = [
  { x: 12, y: 24, size: 3, depth: 0.55 },
  { x: 22, y: 68, size: 2, depth: 0.9 },
  { x: 30, y: 40, size: 4, depth: 0.35 },
  { x: 41, y: 16, size: 2, depth: 0.7 },
  { x: 47, y: 82, size: 3, depth: 1.0 },
  { x: 58, y: 12, size: 2, depth: 0.45 },
  { x: 66, y: 74, size: 4, depth: 0.6 },
  { x: 73, y: 30, size: 3, depth: 0.85 },
  { x: 81, y: 58, size: 2, depth: 0.5 },
  { x: 88, y: 20, size: 4, depth: 0.95 },
  { x: 92, y: 78, size: 3, depth: 0.4 },
  { x: 7, y: 52, size: 2, depth: 0.75 },
  { x: 36, y: 90, size: 2, depth: 0.65 },
  { x: 62, y: 46, size: 2, depth: 0.3 },
];
