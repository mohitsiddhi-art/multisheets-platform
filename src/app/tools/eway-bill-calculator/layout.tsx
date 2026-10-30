import EWayCalculatorPage from "./page";
import { getWebApplicationSchema } from "@/utils/schema";

export const metadata = {
  title: "E-Way Bill Validity & Distance Compliance Estimator | MultiSheets",
  description: "Calculate CGST Rule 138 e-way bill validity periods, distance requirements, and check mandatory ₹50,000 threshold rules instantly.",
};

export default function Layout() {
  const schema = getWebApplicationSchema(
    "E-Way Bill Validity & Distance Compliance Estimator"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EWayCalculatorPage />
    </>
  );
}
