import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lem-holding.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LEM Holding | Projects, Accommodation, and Supply Solutions",
    template: "%s | LEM Holding",
  },
  description:
    "LEM Holding brings together LEM Projects, LEM Accommodation, and LEM Supply Enterprise to support strategic execution, reliable accommodation, and everyday operational supply.",
  keywords: [
    "LEM Holding",
    "business solutions Limpopo",
    "strategic projects",
    "accommodation Polokwane",
    "accommodation Lebowakgomo",
    "supply enterprise",
    "Limpopo business group",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LEM Holding | Projects, Accommodation, and Supply Solutions",
    description:
      "Explore the LEM group portfolio across strategic projects, reliable accommodation, and operational supply support.",
    url: siteUrl,
    siteName: "LEM Holding",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logos/LEM-Holding_Logo.png",
        width: 1200,
        height: 630,
        alt: "LEM Holding logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEM Holding | Projects, Accommodation, and Supply Solutions",
    description:
      "A unified LEM group presence across strategic projects, accommodation, and supply support.",
    images: ["/logos/LEM-Holding_Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
