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

// Safe to read on the server; embedded into the client init script.
// This is a public identifier (NOT a secret). Do not put any secret keys in client code.
const OPENPANEL_CLIENT_ID = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* --------------------------- OpenPanel Analytics --------------------------- */}
        {/* Bootstrap queue first (so calls are queued until SDK loads) */}
        <Script
          id="openpanel-bootstrap"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.op = window.op || function(){ (window.op.q = window.op.q || []).push(arguments) };
            `,
          }}
        />

        {/* Load OpenPanel SDK */}
        <Script
          src="https://openpanel.dev/op1.js"
          strategy="afterInteractive"
        />

        {/* Init (guard against missing env var to prevent 401 spam) */}
        <Script
          id="openpanel-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var cid = ${JSON.stringify(OPENPANEL_CLIENT_ID)};
                if (!cid || cid === "undefined") {
                  console.warn("[OpenPanel] Missing NEXT_PUBLIC_OPENPANEL_CLIENT_ID. Tracking disabled.");
                  return;
                }
                window.op('init', {
                  clientId: cid,
                  trackScreenViews: true,
                  trackOutgoingLinks: true,
                  trackAttributes: true,
                });
                // Optional one-time debug event (uncomment to verify end-to-end):
                // window.op('track', 'op_loaded', { host: location.host });
              })();
            `,
          }}
        />
        {/* ------------------------------------------------------------------------ */}
      </body>
    </html>
  );
}
