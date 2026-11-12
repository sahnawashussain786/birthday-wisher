import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `Happy Birthday, ${site.herName} ✨`,
  description:
    "A little universe built by hand — a cake that never melts, balloons that never fall, and a sky full of light, just for you.",
  openGraph: {
    title: `Happy Birthday, ${site.herName} ✨`,
    description: "A little universe built by hand, just for you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07040f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
