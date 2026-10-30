"use client";

import React from "react";

interface PrintableReportLayoutProps {
  title: string;
  subtitle: string;
  referenceNo: string;
  generatedDate?: string;
  metadata: Array<{ label: string; value: string }>;
  children: React.ReactNode;
  disclaimer?: string;
}

export function PrintableReportLayout({
  title,
  subtitle,
  referenceNo,
  generatedDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  metadata,
  children,
  disclaimer = "This is an official system-generated compliance summary issued via MultiSheets Portal. All statutory figures are calculated in accordance with applicable Indian laws (MSMED Act 2006, CGST Rules 2017, Income Tax Act 1961, and RBI Guidelines)."
}: PrintableReportLayoutProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
      {/* Top Action Bar (Hidden during print) */}
      <div className="mx-auto max-w-4xl px-4 mb-6 flex items-center justify-between print:hidden">
        <button
          onClick={() => window.history.back()}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          ← Back to Portal
        </button>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-700 transition"
        >
          🖨️ Print / Save Official PDF Report
        </button>
      </div>

      {/* A4 Printable Paper Container */}
      <div className="mx-auto max-w-4xl bg-white p-8 sm:p-12 shadow-xl print:shadow-none print:w-full print:max-w-none print:p-6 text-slate-900">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-3 bg-teal-600 rounded-full"></span>
              <span className="text-xs font-black uppercase tracking-widest text-teal-700">MultiSheets Enterprise Compliance Hub</span>
            </div>
            <h1 className="text-2xl font-black text-slate-950 mt-1">{title}</h1>
            <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>
          </div>
          <div className="text-right font-mono text-xs">
            <p className="font-bold text-slate-900">Ref: {referenceNo}</p>
            <p className="text-slate-500 mt-0.5">Date: {generatedDate}</p>
            <span className="inline-block mt-2 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
              VERIFIED COMPLIANCE
            </span>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 print:bg-slate-50 print:border-slate-300">
          {metadata.map((item, idx) => (
            <div key={idx}>
              <span className="block text-[10px] uppercase font-bold text-slate-500">{item.label}</span>
              <span className="text-xs font-bold font-mono text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Main Content Body */}
        <div className="space-y-6 text-sm text-slate-700">
          {children}
        </div>

        {/* Footer / Sign-off */}
        <div className="mt-16 pt-8 border-t border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-600">
          <div className="max-w-xl">
            <p className="font-bold text-slate-900 mb-1">Legal &amp; Regulatory Notice:</p>
            <p className="text-[11px] leading-relaxed text-slate-500">{disclaimer}</p>
          </div>
          <div className="text-right shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-200">
            <div className="h-12 flex items-end justify-end">
              <span className="font-serif italic text-slate-700 font-bold text-sm">Authorized Signatory</span>
            </div>
            <p className="font-bold text-slate-900 mt-1">MultiSheets Verification Desk</p>
            <p className="text-[10px] text-slate-400">https://multisheets.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
