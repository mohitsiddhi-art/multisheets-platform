import MsmeSamadhanCalculatorPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "MSME Samadhan & 45-Day Interest Calculator | MultiSheets",
  description: "Calculate statutory compound interest under MSMED Act Section 16 and check Income Tax Section 43B(h) disallowance rules for delayed vendor payments.",
  openGraph: {
    title: "MSME Samadhan & 45-Day Interest Calculator",
    description: "Calculate statutory compound interest under MSMED Act Section 16 & Sec 43B(h) tax rules.",
    url: "https://multisheets.com/tools/msme-samadhan-calculator",
    images: [
      {
        url: `https://multisheets.com/og?title=${encodeURIComponent("MSME Samadhan & 45-Day Interest Calculator")}&subtitle=${encodeURIComponent("Statutory Compound Interest under MSMED Act Sec 16 & Income Tax Sec 43B(h)")}&category=${encodeURIComponent("Compliance Tool")}&badge=${encodeURIComponent("2026 Updated")}`,
        width: 1200,
        height: 630,
        alt: "MSME Samadhan Calculator",
      },
    ],
  },
};

export default function Layout() {
  const schema = getWebApplicationSchema(
    "MSME Samadhan & 45-Day Interest Calculator"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MsmeSamadhanCalculatorPage />
    </>
  );
}
