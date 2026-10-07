import type { Metadata } from "next";
import { Geist_Mono, Hedvig_Letters_Serif, Mona_Sans } from "next/font/google";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

// Self-hosted through next/font. Keep these here rather than in a CSS
// @import url(...): that import gets dropped from the built stylesheet.
const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  variable: "--font-hedvig-letters-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Product Designer & Developer",
  description:
    "I design and build user-centered digital experiences across web, mobile, and enterprise software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${monaSans.variable} ${hedvigLettersSerif.variable} ${geistMono.variable} no-scrollbar h-full antialiased`}
    >
      <body className="bg-background text-text font-sans flex min-h-full flex-col">
        {/* Both pin themselves to the top of the viewport, so they live in the
            layout rather than in a page and persist across navigations. */}
        <Nav />
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
