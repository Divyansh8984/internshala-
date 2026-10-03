import "@fontsource-variable/sora";
import "./globals.css";

const title = "Interactive Scroll Experience";
const description =
  "A premium scroll-driven interactive web experience built with Next.js, React, Tailwind CSS and GSAP.";

export const metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05060A",
};

// Marks the document as motion-enabled before first paint so intro states do not flash.
const motionFlag = `if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion")}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
