import CyberFraudRecoveryPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "Cyber Fraud Emergency Response & Money Recovery Tool | MultiSheets",
  description: "Immediate 1930 helpline triage, bank emergency freeze directory, interactive recovery checklist, and RBI dispute letter generator for online financial fraud victims.",
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
