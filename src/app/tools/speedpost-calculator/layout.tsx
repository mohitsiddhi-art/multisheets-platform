import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "India Post Speed Post & Parcel Tariff Calculator | MultiSheets",
  description:
    "Calculate India Post Speed Post shipping costs, parcel tariffs, and estimated delivery days instantly. Generate printable dispatch slips and sharing-ready tracking labels.",
  openGraph: {
    title: "Speed Post Calculator & Dispatch Slip Generator | MultiSheets",
    description:
      "Instant India Post tariff calculator with 18% GST inclusion. Calculate domestic parcel costs based on weight and distance slabs.",
    url: "https://multisheets.com/tools/speedpost-calculator",
    type: "website",
  },
};

export default function SpeedPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
