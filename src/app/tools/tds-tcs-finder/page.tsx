"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Search, ArrowRight, ShieldAlert, FileText, CheckCircle2, Building2, Calendar, Copy, Check } from "lucide-react";
import { tdsTcsDatabase, TdsTcsItem } from "@/data/tds-tcs-codes";

export default function TdsTcsFinderPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'ALL' | 'TDS' | 'TCS'>('ALL');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const filteredItems = tdsTcsDatabase.filter(item => {
    const matchesTab = activeTab === 'ALL' || item.category === activeTab;
    const matchesQuery =
      item.section.toLowerCase().includes(query.toLowerCase()) ||
      item.natureOfPayment.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const handleCopy = (item: TdsTcsItem) => {
    const text = `Income Tax Section ${item.section} (${item.category}):
- Nature of Payment: ${item.natureOfPayment}
- Threshold Limit: ${item.thresholdLimit}
- Rate (Individual/HUF): ${item.rateIndividual}
- Rate (Company/Corporate): ${item.rateCompany}
- Due Dates: ${item.dueDate}
- Description: ${item.description}`;

    navigator.clipboard.writeText(text);
    setCopiedSection(item.section);
    setTimeout(() => setCopiedSection(null), 2000);
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
            <span className="text-slate-500">TDS &amp; TCS Compliance Rate &amp; Due Date Lookup</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-inner">
              <Calculator className="size-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
                TDS &amp; TCS Compliance Rate &amp; Due Date Lookup
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Instant lookup for Income Tax TDS (Sections 194C, 194J, 194I, 194Q) &amp; TCS rates, thresholds, and quarterly return due dates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {/* Search & Tabs */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by section (e.g. 194J, 194C), contractor, rent, professional fees..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-teal-500 focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-200/60 p-1 rounded-xl">
            {(['ALL', 'TDS', 'TCS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All Sections' : `${tab} Sections`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map(item => (
            <div
              key={item.section}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-teal-50 px-3 py-1 font-mono text-sm font-black text-teal-800 border border-teal-200">
                      Sec {item.section}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                      item.category === 'TDS' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(item)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    {copiedSection === item.section ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                    {copiedSection === item.section ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{item.natureOfPayment}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Individual / HUF Rate</span>
                    <span className="font-mono font-bold text-slate-900">{item.rateIndividual}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Company / Corporate Rate</span>
                    <span className="font-mono font-bold text-slate-900">{item.rateCompany}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2 text-slate-500">
                  <span className="font-bold text-slate-700 shrink-0">Threshold:</span>
                  <span>{item.thresholdLimit}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-500">
                  <span className="font-bold text-slate-700 shrink-0">Due Date:</span>
                  <span className="text-teal-700">{item.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-sm font-bold text-slate-700">No TDS/TCS sections found matching &quot;{query}&quot;</p>
            <p className="text-xs text-slate-500 mt-1">Try searching for section numbers like 194J, 194C, or keywords like rent, professional fees.</p>
          </div>
        )}

        {/* AEO/GEO Passage-Chunked FAQ Section */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Frequently Asked Questions on TDS &amp; TCS Compliance Rates &amp; Deposit Due Dates
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What are the Standard TDS Deposit and Quarterly Return Due Dates?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Tax Deducted at Source (TDS) must be deposited to the government treasury by the 7th day of the month following the month in which deduction was made (for March deductions, the deadline is April 30th). Quarterly returns are filed in Form 26Q (non-salary), Form 24Q (salary), and Form 27EQ (TCS).
              </p>

              {/* Micro-Table 1 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Quarter Period</th>
                      <th className="px-4 py-3 font-bold">TDS / TCS Deposit Due Date</th>
                      <th className="px-4 py-3 font-bold">Quarterly Return Filing Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Q1 (Apr - Jun)</td>
                      <td className="px-4 py-3">7th of Next Month</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">July 31st</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Q2 (Jul - Sep)</td>
                      <td className="px-4 py-3">7th of Next Month</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">October 31st</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Q3 (Oct - Dec)</td>
                      <td className="px-4 py-3">7th of Next Month</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">January 31st</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Q4 (Jan - Mar)</td>
                      <td className="px-4 py-3">April 30th</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">May 31st</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What are the Penalties for Late TDS Deduction or Non-Deposit?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Failure to deduct TDS attracts interest at 1% per month from the date tax was deductible to the date of actual deduction. Failure to deposit deducted TDS to the government attracts interest at 1.5% per month from the date of deduction to the date of actual deposit under Section 201(1A). Late filing fee under Section 234E is ₹200 per day of default until fees equal the deductible amount.
              </p>

              {/* Micro-Table 2 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Default Type</th>
                      <th className="px-4 py-3 font-bold">Legal Section</th>
                      <th className="px-4 py-3 font-bold">Penalty / Interest Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Failure to Deduct TDS</td>
                      <td className="px-4 py-3">Sec 201(1)</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">1% per month + demand recovery</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Failure to Deposit Deducted TDS</td>
                      <td className="px-4 py-3">Sec 201(1A)</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">1.5% per month from deduction to deposit</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Late Return Filing</td>
                      <td className="px-4 py-3">Sec 234E</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">₹200 per day of default</td>
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
