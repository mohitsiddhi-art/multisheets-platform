import CyberFraudRecoveryPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "Cyber Fraud Emergency Response & Money Recovery Tool | MultiSheets",
  description: "Immediate 1930 helpline triage, bank emergency freeze directory, interactive recovery checklist, and RBI dispute letter generator for online financial fraud victims.",
  openGraph: {
    title: "Cyber Fraud Emergency Response & Money Recovery Tool",
    description: "Immediate 1930 helpline triage, bank emergency freeze directory, and RBI dispute letter generator.",
    url: "https://multisheets.com/tools/cyber-fraud-recovery",
    images: [
      {
        url: `https://multisheets.com/og?title=${encodeURIComponent("Cyber Fraud Emergency Response & Recovery")}&subtitle=${encodeURIComponent("1930 Helpline Triage, Bank Freeze Directory & RBI Dispute Letter Generator")}&category=${encodeURIComponent("Emergency Tool")}&badge=${encodeURIComponent("Urgent Action")}`,
        width: 1200,
        height: 630,
        alt: "Cyber Fraud Emergency Response Tool",
      },
    ],
  },
};

export default function Layout() {
  const schema = getWebApplicationSchema(
    "Cyber Fraud Emergency Response & Money Recovery Tool"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CyberFraudRecoveryPage />
    </>
  );
}
