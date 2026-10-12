import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheque Amount in Words & Positive Pay (PPS) Slip Generator | MultiSheets",
  description:
    "Convert cheque amounts to Indian numbering words (Crore, Lakh, Thousand) and generate RBI-compliant Positive Pay System (PPS) confirmation text & printable record slips.",
  openGraph: {
    title: "Cheque PPS Slip & Amount Words Generator | MultiSheets",
    description:
      "Instant RBI-compliant Positive Pay draft, Indian numbering words converter & printable record slips. Zero server upload.",
    type: "website",
    url: "https://multisheets.com/tools/pps-cheque",
  },
};

export default function PpsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
