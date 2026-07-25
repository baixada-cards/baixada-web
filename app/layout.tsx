import type { Metadata } from "next";
import { headers } from "next/headers";
import {
  Cormorant_Garamond,
  Inter,
  Kalam,
  JetBrains_Mono,
} from "next/font/google";
import "@baixada-cards/design-system/tokens.css";
import "@baixada-cards/design-system/brand.css";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const hand = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "baixada.cards";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const image = new URL("/og.png", base).href;

  return {
    metadataBase: base,
    title: "Baixada — card games of the south",
    description:
      "A quiet home for Truco, Escopa, Bisca, and a lab for studying the games of the south.",
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      siteName: "Baixada",
      title: "Baixada — card games of the south",
      description: "A quiet home for the card games of the south.",
      images: [{ url: image, width: 1200, height: 630, alt: "Baixada" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Baixada — card games of the south",
      description: "A quiet home for the card games of the south.",
      images: [image],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${hand.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
