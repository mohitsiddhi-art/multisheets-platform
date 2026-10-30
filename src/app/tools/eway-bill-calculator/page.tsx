"use client";

import { useState } from "react";
import Link from "next/link";
import { Truck, Calculator, ArrowRight, ShieldAlert, FileText, CheckCircle2, AlertTriangle, MapPin, Copy, Check } from "lucide-react";
import { calculateEWayValidity } from "@/utils/ewayCalculator";

export default function EWayCalculatorPage() {
  const [distance, setDistance] = useState<string>("450");
  const [cargoType, setCargoType] = useState<'regular' | 'overdimensional'>('regular');
  const [invoiceValue, setInvoiceValue] = useState<string>("75000");
  const [originPin, setOriginPin] = useState<string>("110001");
  const [destPin, setDestPin] = useState<string>("400001");
  const [copied, setCopied] = useState(false);

  const distanceNum = parseFloat(distance) || 0;
  const invoiceNum = parseFloat(invoiceValue) || 0;
  const isMandatory = invoiceNum > 50000;

  const result = calculateEWayValidity(distanceNum, cargoType);

  const handleCopySummary = () => {
    const text = `E-Way Bill Compliance & Validity Estimate (CGST Rule 138):
- Origin Pincode: ${originPin}
- Destination Pincode: ${destPin}
- Estimated Distance: ${distanceNum} km
- Invoice Value: ₹${invoiceNum.toLocaleString('en-IN')}
- E-Way Bill Requirement: ${isMandatory ? 'MANDATORY (Value exceeds ₹50,000 threshold)' : 'Optional / Not Mandated by value (Check state intra-state rules)'}
- Cargo Type: ${cargoType === 'overdimensional' ? 'Over Dimensional Cargo (ODC)' : 'Normal Cargo'}
- Validity Period: ${result.validityDays} Days
- Estimated Expiry: ${result.expiresAtSummary}
- Legal Reference: ${result.ruleReference}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-600 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:underline">Tools</Link>
            <span>/</span>
            <span className="text-slate-500">E-Way Bill Validity &amp; Distance Estimator</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-inner">
              <Truck className="size-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
                E-Way Bill Validity &amp; Distance Estimator
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Estimate transport distance, CGST Rule 138 validity periods, and mandatory e-way bill compliance thresholds.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Calculator Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="size-4 text-teal-600" /> Shipment &amp; Route Parameters
              </h2>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Origin Pincode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={originPin}
                      onChange={e => setOriginPin(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono text-base focus:border-teal-500 focus:bg-white focus:outline-none"
                      placeholder="110001"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Destination Pincode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={destPin}
                      onChange={e => setDestPin(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono text-base focus:border-teal-500 focus:bg-white focus:outline-none"
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Estimated Distance (Km)
                    </label>
                    <input
                      type="number"
                      value={distance}
                      onChange={e => setDistance(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono text-base focus:border-teal-500 focus:bg-white focus:outline-none"
                      placeholder="450"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Invoice Total Value (₹)
                    </label>
                    <input
                      type="number"
                      value={invoiceValue}
                      onChange={e => setInvoiceValue(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono text-base focus:border-teal-500 focus:bg-white focus:outline-none"
                      placeholder="75000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Cargo Classification
                  </label>
                  <select
                    value={cargoType}
                    onChange={e => setCargoType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                  >
                    <option value="regular">Regular Cargo (1 Day per 200 Km)</option>
                    <option value="overdimensional">Over Dimensional Cargo / ODC (1 Day per 20 Km)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Penalty & Detention Warning */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
                  <ShieldAlert className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-red-900">CGST Section 129 Detention &amp; Penalty Risk</h3>
                  <p className="mt-1 text-xs leading-relaxed text-red-800">
                    {result.penaltyWarning}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Compliance &amp; Validity Matrix</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${isMandatory ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {isMandatory ? 'Mandatory E-Way Bill' : 'Below ₹50K Threshold'}
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Route Distance</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{distanceNum} Km</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Validity Period</span>
                  <span className="font-mono text-sm font-bold text-teal-700">{result.validityDays} Days</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Estimated Expiry</span>
                  <span className="font-mono text-xs font-bold text-slate-900">{result.expiresAtSummary}</span>
                </div>

                <div className="flex items-center justify-between py-3 bg-teal-50/60 rounded-xl px-4 border border-teal-100">
                  <div>
                    <p className="text-xs font-bold text-teal-900">Rule 138 Basis</p>
                    <p className="text-[10px] text-teal-700">{cargoType === 'overdimensional' ? '1 Day / 20 Km (ODC)' : '1 Day / 200 Km (Regular)'}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-teal-950">
                    CGST Rule 138(10)
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Copied Estimate Report!" : "Copy E-Way Bill Estimate"}
                </button>

                <Link
                  href="/tools/pincode-distance"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Calculate Exact Pincode Distance <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* AEO/GEO Passage-Chunked FAQ Section */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Frequently Asked Questions on E-Way Bill Validity &amp; CGST Rule 138
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What is the E-Way Bill Generation Threshold and Validity Rule?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Under GST provisions (CGST Rule 138), an e-way bill is electronically generated on the portal for the movement of goods of consignment value exceeding ₹50,000. Validity is calculated automatically based on distance: regular cargo receives 1 valid day for every 200 km (or part thereof), whereas over-dimensional cargo (ODC) receives 1 valid day for every 20 km (or part thereof) from the relevant date.
              </p>

              {/* Micro-Table 1 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Cargo Type</th>
                      <th className="px-4 py-3 font-bold">Distance Factor</th>
                      <th className="px-4 py-3 font-bold">Validity Calculation Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Regular Cargo</td>
                      <td className="px-4 py-3">1 Day per 200 Km</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">450 Km = 3 Days validity</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Over Dimensional Cargo (ODC)</td>
                      <td className="px-4 py-3">1 Day per 20 Km</td>
                      <td className="px-4 py-3">100 Km = 5 Days validity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Can E-Way Bill Validity Be Extended in Transit Emergencies?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Yes. As per the provisos to CGST Rule 138(10), if goods cannot be transported within the validity period due to exceptional circumstances such as natural calamities, law and order issues, transshipment delay, or vehicle breakdown, the transporter or generator may extend validity by updating Part B within 8 hours of expiry.
              </p>

              {/* Micro-Table 2 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Transit Exception</th>
                      <th className="px-4 py-3 font-bold">Extension Procedure</th>
                      <th className="px-4 py-3 font-bold">Time Window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Vehicle Breakdown / Accident</td>
                      <td className="px-4 py-3">Update transporter details / new vehicle in Part-B</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">Within 8 hours of expiry</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Transshipment Delay</td>
                      <td className="px-4 py-3">Generate extended validity on e-way bill portal</td>
                      <td className="px-4 py-3">Prior to or immediately upon expiry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
