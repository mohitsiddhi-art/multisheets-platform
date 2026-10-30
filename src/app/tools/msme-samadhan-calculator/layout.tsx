import MsmeSamadhanCalculatorPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "MSME Samadhan & 45-Day Interest Calculator | MultiSheets",
  description: "Calculate statutory compound interest under MSMED Act Section 16 and check Income Tax Section 43B(h) disallowance rules for delayed vendor payments.",
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
