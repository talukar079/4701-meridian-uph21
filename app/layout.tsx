import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://4701meridianuph21.com"),

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
    siteName: "The Algarin Group · Compass",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* OpenPanel Analytics (client-side only). Uses Client ID from Vercel env var. */}
        <Script
          src="https://openpanel.dev/op1.js"
          strategy="afterInteractive"
        />
        <Script
          id="openpanel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.op=window.op||function(){(window.op.q=window.op.q||[]).push(arguments)};
              window.op('init', {
                clientId: '${process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}',
                trackScreenViews: true,
                trackOutgoingLinks: true,
                trackAttributes: true,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
