import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk CSV Downloads — All India Pincodes & Bank IFSC Directory | MultiSheets",
  description:
    "Free 1-click bulk CSV downloads of official Indian Postal Pincodes (19,300+ nodes) and Indian Bank IFSC codes (1,45,000+ branches). Ready for Excel, CRM, and SQL import.",
  openGraph: {
    title: "Download India Pincode & IFSC Datasets (CSV) | MultiSheets",
    description:
      "Instant 1-click downloads for verified Indian Postal Pincodes and Banking IFSC directory datasets in clean CSV format.",
    url: "https://multisheets.com/downloads",
  },
};

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
