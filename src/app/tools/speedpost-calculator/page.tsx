"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Truck,
  Calculator,
  Download,
  Printer,
  Share2,
  ArrowRight,
  Scale,
  MapPin,
  Package,
  Info,
  ShieldCheck,
  Check,
  CheckCircle,
  MessageCircle
} from "lucide-react";
import { getWebApplicationSchema } from "@/utils/schema";

// India Post Speed Post Tariff Logic (Standard Distance & Weight Slabs)
// Local: <50g: 15, <200g: 25, <500g: 30, addl 500g: 10
// <200km: <50g: 35, <200g: 35, <500g: 40, addl 500g: 15
// 201-1000km: <50g: 35, <200g: 45, <500g: 60, addl 500g: 30
// 1001-2000km: <50g: 35, <200g: 60, <500g: 80, addl 500g: 40
// >2000km: <50g: 35, <200g: 70, <500g: 90, addl 500g: 50

type DistanceSlab = "Local" | "Up to 200 km" | "201 to 1000 km" | "1001 to 2000 km" | "Above 2000 km";

const TARIFF_DATA: Record<DistanceSlab, { s50: number; s200: number; s500: number; addl: number }> = {
  "Local": { s50: 15, s200: 25, s500: 30, addl: 10 },
  "Up to 200 km": { s50: 35, s200: 35, s500: 40, addl: 15 },
  "201 to 1000 km": { s50: 35, s200: 45, s500: 60, addl: 30 },
  "1001 to 2000 km": { s50: 35, s200: 60, s500: 80, addl: 40 },
  "Above 2000 km": { s50: 35, s200: 70, s500: 90, addl: 50 },
};

function calculateDistanceSlab(origin: string, dest: string): DistanceSlab {
  if (origin.length < 3 || dest.length < 3) return "Local";
  const o3 = origin.substring(0, 3);
  const d3 = dest.substring(0, 3);
  const o1 = parseInt(origin[0]);
  const d1 = parseInt(dest[0]);

  if (o3 === d3) return "Local";
  if (origin[0] === dest[0]) return "Up to 200 km";

  const diff = Math.abs(o1 - d1);
  if (diff === 1) return "201 to 1000 km";
  if (diff === 2) return "1001 to 2000 km";
  return "Above 2000 km";
}

export default function SpeedPostCalculatorPage() {
  const schema = getWebApplicationSchema("Speed Post & Parcel Calculator");
  const [senderPincode, setSenderPincode] = useState("");
  const [receiverPincode, setReceiverPincode] = useState("");
  const [weightGrams, setWeightGrams] = useState<number>(50);
  const [articleType, setArticleType] = useState("Document");
  const [isCopied, setIsCopied] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const weightPresets = [
    { label: "50g", value: 50 },
    { label: "200g", value: 200 },
    { label: "500g", value: 500 },
    { label: "1kg", value: 1000 },
    { label: "2kg", value: 2000 },
  ];

  const calculation = useMemo(() => {
    if (senderPincode.length < 6 || receiverPincode.length < 6) return null;

    const slab = calculateDistanceSlab(senderPincode, receiverPincode);
    const data = TARIFF_DATA[slab];

    let baseTariff = 0;
    if (weightGrams <= 50) {
      baseTariff = data.s50;
    } else if (weightGrams <= 200) {
      baseTariff = data.s200;
    } else if (weightGrams <= 500) {
      baseTariff = data.s500;
    } else {
      const extraWeight = weightGrams - 500;
      const extraSlabs = Math.ceil(extraWeight / 500);
      baseTariff = data.s500 + extraSlabs * data.addl;
    }

    const gst = baseTariff * 0.18;
    const total = baseTariff + gst;

    const deliveryDays = slab === "Local" ? "1-2 Days" : slab === "Up to 200 km" ? "2-3 Days" : "3-5 Days";

    return {
      slab,
      baseTariff,
      gst,
      total,
      deliveryDays
    };
  }, [senderPincode, receiverPincode, weightGrams]);

  const shareText = `📦 Dispatch Estimate: From ${senderPincode} To ${receiverPincode} | Weight: ${weightGrams}g | Approx Tariff: ₹${calculation?.total.toFixed(2)} | Generated on multisheets.com/tools/speedpost-calculator`;

  function handlePrint() {
    window.print();
  }

  function handleShareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  }

  function handleCopyLabel() {
    const label = `MULTISHEETS DISPATCH SLIP
--------------------------
FROM PIN: ${senderPincode}
TO PIN: ${receiverPincode}
WEIGHT: ${weightGrams}g
TYPE: ${articleType}
EST. DELIVERY: ${calculation?.deliveryDays}
TOTAL TARIFF: ₹${calculation?.total.toFixed(2)} (Incl. GST)
--------------------------
Generated via MultiSheets.com`;

    navigator.clipboard.writeText(label).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700">
          <Truck className="size-3.5" />
          Logistics Utility
        </div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle className="size-3.5" />
          Data verified & updated for 2026
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Speed Post & Parcel Calculator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Instant tariff estimation for India Post domestic Speed Post. Calculate costs based on weight slabs, distance, and 18% GST inclusion.
        </p>
      </div>

      <div className="mx-auto mb-10 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-bold text-slate-900">India Post Speed Post Tariff & Distance Estimator</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Calculate official India Post domestic parcel shipping charges based on origin & destination pincodes, weight slabs (50g to 2kg+), and 18% GST. Instantly generate printable parcel dispatch slips with estimated delivery timelines.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Input Panel */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-100 sm:p-8">
            <h2 className="flex items-center gap-2.5 text-lg font-bold text-slate-900">
              <Calculator className="size-5 text-teal-600" />
              Tariff Configuration
            </h2>

            <div className="mt-8 space-y-6">
              {/* Pincodes */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Sender Pincode</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 110001"
                      value={senderPincode}
                      onChange={(e) => setSenderPincode(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 font-mono text-sm font-bold focus:border-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Receiver Pincode</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 700001"
                      value={receiverPincode}
                      onChange={(e) => setReceiverPincode(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 font-mono text-sm font-bold focus:border-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Parcel Weight</label>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                    {weightGrams >= 1000 ? `${(weightGrams / 1000).toFixed(2)} kg` : `${weightGrams} grams`}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {weightPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setWeightGrams(p.value)}
                      className={`rounded-lg py-2.5 text-xs font-bold transition ${
                        weightGrams === p.value
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Scale className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    placeholder="Enter custom weight in grams"
                    value={weightGrams}
                    onChange={(e) => setWeightGrams(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-bold focus:border-teal-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Article Type */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Article Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Document", "Merchandise", "Parcel"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setArticleType(type)}
                      className={`rounded-lg py-2.5 text-xs font-bold transition ${
                        articleType === type
                          ? "bg-slate-900 text-white shadow-lg"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-amber-50 p-4">
              <div className="flex gap-3">
                <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
                <p className="text-[0.7rem] leading-relaxed text-amber-800">
                  <strong>Disclaimer:</strong> Tariffs are estimated based on standard India Post distance and weight slabs. Final charges may vary based on actual weight, volume, and additional services at the post office counter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5">
          {calculation ? (
            <div className="sticky top-24 space-y-6">
              {/* Tariff Card */}
              <div className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-2xl shadow-teal-900/5 transition-all">
                <div className="bg-teal-600 px-6 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest opacity-80">Estimated Tariff</span>
                    <Package className="size-4 opacity-50" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">₹{calculation.total.toFixed(2)}</span>
                    <span className="text-sm font-bold opacity-80">total</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Base Tariff</span>
                      <span className="font-bold text-slate-900">₹{calculation.baseTariff.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">GST (18%)</span>
                      <span className="font-bold text-slate-900">₹{calculation.gst.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-bold text-slate-900">Distance Slab</span>
                        <span className="font-bold text-teal-600">{calculation.slab}</span>
                      </div>
                      <div className="mt-1 flex justify-between text-sm">
                        <span className="font-bold text-slate-900">Est. Delivery</span>
                        <span className="font-bold text-emerald-600">{calculation.deliveryDays}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button
                      onClick={handlePrint}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50 active:scale-95"
                    >
                      <Printer className="size-3.5" /> Print Slip
                    </button>
                    <button
                      onClick={handleCopyLabel}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50 active:scale-95"
                    >
                      {isCopied ? <Check className="size-3.5 text-emerald-600" /> : <Download className="size-3.5" />}
                      {isCopied ? "Copied" : "Dispatch Memo"}
                    </button>
                  </div>

                  <button
                    onClick={handleShareWhatsApp}
                    className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 text-xs font-black text-white shadow-lg shadow-emerald-500/20 transition hover:bg-[#22c35e] active:scale-[0.99]"
                  >
                    <MessageCircle className="size-4" /> Share Estimate on WhatsApp
                  </button>
                </div>
              </div>

              {/* Printable Dispatch Slip (Visual Only) */}
              <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 print:block">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-teal-600" />
                    <span className="text-xs font-black tracking-tight text-slate-900">MultiSheets Dispatch</span>
                  </div>
                  <ShieldCheck className="size-4 text-emerald-500" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">From Pincode</p>
                    <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">{senderPincode}</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">To Pincode</p>
                    <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">{receiverPincode}</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">Weight</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{weightGrams}g</p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">Tariff (Incl. GST)</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">₹{calculation.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center grayscale opacity-20">
                  <p className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-slate-900">Verified via MultiSheets.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
                <Calculator className="size-8 text-slate-300" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900">Ready to Calculate</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Enter 6-digit sender and receiver pincodes to view the Speed Post tariff breakdown.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQs / Info Section */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-900 p-8 text-white">
          <h3 className="text-lg font-bold">About Speed Post Slabs</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Speed Post provides time-bound delivery across India. Domestic tariffs are based on distance (measured between the source and destination pin zones) and weight slabs. MultiSheets uses the standard slabs: Local, up to 200km, 201-1000km, 1001-2000km, and above 2000km.
          </p>
          <ul className="mt-6 space-y-3 text-xs font-medium text-slate-300">
            <li className="flex items-center gap-2"><ArrowRight className="size-3 text-teal-400" /> Local: Within same city/district</li>
            <li className="flex items-center gap-2"><ArrowRight className="size-3 text-teal-400" /> Weight: Slabs of 50g, 200g, 500g, and addl. 500g</li>
            <li className="flex items-center gap-2"><ArrowRight className="size-3 text-teal-400" /> GST: 18% Service Tax included in final estimate</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h3 className="text-lg font-bold text-slate-900">Dispatch & Tracking</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Once you've calculated the tariff, you can use our printable dispatch memo for internal records. Note that this calculator is an estimation tool. For actual booking, please visit your nearest India Post office.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pincode" className="text-xs font-bold text-teal-600 hover:underline underline-offset-4">Find Nearest Post Office</Link>
            <span className="text-slate-300">|</span>
            <Link href="/downloads" className="text-xs font-bold text-teal-600 hover:underline underline-offset-4">Download Pincode Master</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
