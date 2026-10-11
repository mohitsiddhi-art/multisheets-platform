import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MultiSheets — India Pincode & IFSC Directory",
  description:
    "Search 19,000+ Indian Pincode directories and IFSC bank codes instantly. MultiSheets — the industrial directory platform for India.",
  keywords: ["pincode", "ifsc", "bank directory", "india postal", "multi directory"],
  authors: [{ name: "MultiSheets Team" }],
  creator: "MultiSheets",
  metadataBase: new URL("https://multisheets.com"),
  openGraph: {
    title: "MultiSheets — India Directory Platform",
    description:
      "Fast Pincode & IFSC directory search for India. Browse directories, get instant results.",
    url: "https://multisheets.com",
    siteName: "MultiSheets",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiSheets — India Directory Platform",
    description: "Fast Pincode & IFSC directory search.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MultiSheets",
  "url": "https://multisheets.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://multisheets.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
