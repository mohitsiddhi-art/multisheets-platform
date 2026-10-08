"use client";

import { useState } from "react";
import { Truck, ExternalLink } from "lucide-react";

type WeightRange = 'Up to 50g' | '51g-250g' | '251g-500g' | 'Above 500g';
type Zone = 'Local' | 'Upto 200 km' | '201 to 1000 km' | '1001 to 2000 km' | 'Above 2000 km';

const TARIFFS: Record<Zone, Record<WeightRange, string>> = {
  'Local': { 'Up to 50g': '₹23', '51g-250g': '₹28', '251g-500g': '₹34', 'Above 500g': 'Add ₹12/500g' },
  'Upto 200 km': { 'Up to 50g': '₹55', '51g-250g': '₹69', '251g-500g': '₹82', 'Above 500g': 'Add ₹35/500g' },
  '201 to 1000 km': { 'Up to 50g': '₹55', '51g-250g': '₹75', '251g-500g': '₹89', 'Above 500g': 'Add ₹40/500g' },
  '1001 to 2000 km': { 'Up to 50g': '₹55', '51g-250g': '₹84', '251g-500g': '₹102', 'Above 500g': 'Add ₹47/500g' },
  'Above 2000 km': { 'Up to 50g': '₹55', '51g-250g': '₹91', '251g-500g': '₹109', 'Above 500g': 'Add ₹55/500g' },
};

const TAT_ESTIMATES: Record<Zone, string> = {
  'Local': '1–2 Business Days',
  'Upto 200 km': '2–3 Business Days',
  '201 to 1000 km': '3–5 Business Days',
  '1001 to 2000 km': '3–5 Business Days',
  'Above 2000 km': '3–5 Business Days',
};

const calculateZone = (origin: string, dest: string): Zone => {
  if (origin.length < 3 || dest.length < 3) return 'Local';
  const o3 = origin.substring(0, 3);
  const d3 = dest.substring(0, 3);
  const o1 = parseInt(origin[0]);
  const d1 = parseInt(dest[0]);
  const o1s = origin[0];
  const d1s = dest[0];

  if (o3 === d3) return 'Local';
  if (o1s === d1s) return 'Upto 200 km';
  if (Math.abs(o1 - d1) === 1) return '201 to 1000 km';
  if (Math.abs(o1 - d1) <= 2) return '1001 to 2000 km';
  return 'Above 2000 km';
};

export function CourierCostEstimator() {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [weight, setWeight] = useState<WeightRange>('Up to 50g');

  const zone = calculateZone(origin, dest);
  const tariff = TARIFFS[zone][weight];
  const tat = TAT_ESTIMATES[zone];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">Courier Cost Estimator</h3>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <input placeholder="Origin Pincode" className="rounded-lg border border-slate-200 p-2" onChange={(e) => setOrigin(e.target.value)} />
        <input placeholder="Dest Pincode" className="rounded-lg border border-slate-200 p-2" onChange={(e) => setDest(e.target.value)} />
      </div>
      <select className="mt-2 w-full rounded-lg border border-slate-200 p-2" onChange={(e) => setWeight(e.target.value as WeightRange)}>
        {(['Up to 50g', '51g-250g', '251g-500g', 'Above 500g'] as WeightRange[]).map(w => <option key={w}>{w}</option>)}
      </select>

      {origin.length >= 6 && dest.length >= 6 && (
        <div className="mt-6 rounded-lg bg-teal-50 p-4">
          <p className="text-sm font-semibold text-teal-800">India Post Speed Post ({zone})</p>
          <p className="text-2xl font-bold text-teal-900">{tariff}</p>
          <p className="text-xs text-teal-700 mt-1">Estimated TAT: {tat}</p>
        </div>
      )}

      <a
        href="https://www.indiapost.gov.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
      >
        Track Official Consignment on India Post <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
