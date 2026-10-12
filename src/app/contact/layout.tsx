import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — MultiSheets Support & Data Corrections",
  description:
    "Get in touch with the MultiSheets team. Submit Pincode or bank IFSC data corrections, partnership inquiries, or general support requests.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
