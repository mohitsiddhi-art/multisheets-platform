"use client";

import { useState } from "react";
import { ChequeAmountConverter } from "./ChequeAmountConverter";
import { PositivePayHelper } from "./PositivePayHelper";
import { CourierCostEstimator } from "./CourierCostEstimator";
import { cn } from "@/lib/utils";

export function ToolsSection() {
  const [activeTab, setActiveTab] = useState("cheque");

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900">Everyday Financial Tools</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ChequeAmountConverter />
          <PositivePayHelper />
          <CourierCostEstimator />
        </div>
      </div>
    </section>
  );
}
