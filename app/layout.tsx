import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Ensures OG/Twitter image URLs resolve as absolute URLs (Apple/iMessage-safe)
  metadataBase: new URL("https://4701meridianuph21.com"),

  // Canonical URL for SEO + previews
  alternates: {
    canonical: "https://4701meridianuph21.com",
  },

  title: "4701 Meridian Ave · UPH21 | Miami Beach",
  description:
    "SkyHouse at The Ritz-Carlton Residences Miami Beach. A rare upper penthouse offering with panoramic water views and resort-level living.",

  openGraph: {
    title: "4701 Meridian Ave · UPH21 | Miami Beach",
    description:
      "A crown jewel residence at The Ritz-Carlton Residences Miami Beach. Upper penthouse living with sweeping views.",
    url: "https://4701meridianuph21.com",

    // ✅ FIXED: iMessage-friendly site label
    siteName: "4701MeridianUPH21.com",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "4701 Meridian Ave UPH21 – Miami Beach",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "4701 Meridian Ave · UPH21 | Miami Beach",
    description:
      "Upper penthouse living at The Ritz-Carlton Residences Miami Beach.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

