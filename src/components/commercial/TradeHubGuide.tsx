"use client";

import { Building2, MapPin, Package } from "lucide-react";

export function TradeHubGuide() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
        <MapPin className="size-5 text-teal-600" /> Commercial Trade Hub: 700007
      </h3>

      <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white">
        <p className="font-bold">Burrabazar / Loha Patty</p>
        <p className="text-xs text-slate-300 mt-1">India's historic steel & mercantile nerve center.</p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="text-sm">
          <p className="font-semibold text-slate-800">Trade Clusters:</p>
          <p className="text-slate-600 italic">Steel Wholesale, Textiles, Hardware</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-slate-800">Key Nodes:</p>
          <ul className="text-slate-600 list-disc list-inside">
            <li>SBI Strand Road Branch</li>
            <li>Posta Dispatch Point</li>
            <li>Burrabazar Mercantile Grid</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs font-bold text-teal-800">B2B Steel Procurement</p>
        <Package className="size-5 text-teal-600" />
      </div>
    </div>
  );
}
