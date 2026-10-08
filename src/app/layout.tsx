import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${inter.variable} scroll-smooth`}>
      <body className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-800 antialiased selection:bg-sky-100 selection:text-sky-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
