import TdsTcsFinderPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "TDS & TCS Compliance Rate & Due Date Lookup | MultiSheets",
  description: "Search 35+ top Income Tax TDS & TCS sections (194C, 194J, 194I, 194Q, 206C), rates, thresholds, and quarterly return due dates.",
};

export default function Layout() {
  const schema = getWebApplicationSchema(
    "TDS & TCS Compliance Rate & Due Date Lookup"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TdsTcsFinderPage />
    </>
  );
}
