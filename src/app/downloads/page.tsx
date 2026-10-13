"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, FileSpreadsheet, MapPin, Building2, Check, ShieldCheck, Database, FileText, ArrowRight } from "lucide-react";

export default function DownloadsPage() {
  const [downloadingPin, setDownloadingPin] = useState(false);
  const [downloadingIfsc, setDownloadingIfsc] = useState(false);

  function triggerDownload(type: "pincodes" | "ifsc") {
    if (type === "pincodes") {
      setDownloadingPin(true);
      window.location.href = "/api/download/pincodes";
      setTimeout(() => setDownloadingPin(false), 3000);
    } else {
      setDownloadingIfsc(true);
      window.location.href = "/api/download/ifsc";
      setTimeout(() => setDownloadingIfsc(false), 3000);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      {/* Header Banner */}
      <div className="mb-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Database className="size-3.5" />
          Bulk Data Export Center
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Download Verified Indian Datasets
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Direct, 1-click CSV downloads for logistics teams, financial developers, and ERP systems.
          Fully normalized datasets compatible with Microsoft Excel, Google Sheets, PostgreSQL, and MySQL.
        </p>
      </div>

      {/* Dataset Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Card 1: Postal Pincodes */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100 transition hover:border-amber-300 hover:shadow-2xl sm:p-10">
          <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-amber-500/10 blur-2xl" />

          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 shadow-inner">
                <MapPin className="size-7" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-black text-amber-800">
                19,300+ Verified Nodes
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              All India Postal Pincodes Directory (CSV)
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Comprehensive postal master dataset sourced from India Post records. Includes 6-digit Pincodes,
              post office names, district, state, delivery status (Delivery / Non-delivery), and postal circles.
            </p>

            <div className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Format:</span>
                <span className="font-bold text-slate-800">Clean UTF-8 CSV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Coverage:</span>
                <span className="font-bold text-slate-800">All 28 States &amp; 8 UTs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Status:</span>
                <span className="font-bold text-emerald-700">Flagged &amp; Verified</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => triggerDownload("pincodes")}
              disabled={downloadingPin}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-amber-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 active:scale-[0.99] disabled:opacity-75"
            >
              {downloadingPin ? (
                <>
                  <Check className="size-5 animate-bounce" />
                  Starting CSV Download...
                </>
              ) : (
                <>
                  <Download className="size-5" />
                  Download Pincodes CSV (1-Click)
                </>
              )}
            </button>
            <p className="mt-2.5 text-center text-[0.7rem] text-slate-400">
              Direct download • No registration required • Free for commercial &amp; private use
            </p>
          </div>
        </div>

        {/* Card 2: Bank IFSC Directory */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100 transition hover:border-sky-300 hover:shadow-2xl sm:p-10">
          <div className="absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-sky-500/10 blur-2xl" />

          <div>
            <div className="flex items-center justify-between">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 shadow-inner">
                <Building2 className="size-7" />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100/80 px-3 py-1 text-xs font-black text-sky-800">
                1,45,000+ Bank Branches
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              All India Bank IFSC &amp; Branch Directory (CSV)
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Master routing dataset containing 11-character alphanumeric IFSC codes, 9-digit MICR numbers,
              bank names, branch titles, full physical branch addresses, contact details, and cities.
            </p>

            <div className="mt-6 space-y-2 rounded-2xl bg-slate-50 p-4 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Modes:</span>
                <span className="font-bold text-sky-700">RTGS, NEFT &amp; IMPS Ready</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bank Scope:</span>
                <span className="font-bold text-slate-800">Public, Private, RRBs, Co-ops</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Encoding:</span>
                <span className="font-bold text-slate-800">Excel UTF-8 (BOM included)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => triggerDownload("ifsc")}
              disabled={downloadingIfsc}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.99] disabled:opacity-75"
            >
              {downloadingIfsc ? (
                <>
                  <Check className="size-5 animate-bounce" />
                  Starting CSV Download...
                </>
              ) : (
                <>
                  <Download className="size-5" />
                  Download Bank IFSC CSV (1-Click)
                </>
              )}
            </button>
            <p className="mt-2.5 text-center text-[0.7rem] text-slate-400">
              Direct download • Normalized columns • Ready for database seeders
            </p>
          </div>
        </div>
      </div>

      {/* Integration & Usage Tips Banner */}
      <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-xl sm:p-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-sky-400">
              <FileSpreadsheet className="size-4" />
              Spreadsheet Ready
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">Opening in Excel &amp; Sheets</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Files are encoded with UTF-8 byte order mark (BOM) ensuring numbers with leading zeros (e.g. 011001 or SBIN0000001) render intact without auto-formatting errors.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-amber-400">
              <Database className="size-4" />
              SQL &amp; Pandas Import
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">Database Seed Script</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Directly ingest into PostgreSQL (<code className="rounded bg-slate-800 px-1 py-0.5 font-mono text-amber-200">\copy table FROM ... CSV HEADER</code>) or Python via <code className="rounded bg-slate-800 px-1 py-0.5 font-mono text-amber-200">pandas.read_csv()</code>.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="size-4" />
              Verified Public License
            </div>
            <h3 className="mt-2 text-lg font-bold text-white">Open Attribution</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Derived from official Open Government Data (OGD) and RBI gazette circulars. Free for commercial application routing and internal lookup indices.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Need live interactive searches instead?</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/pincode"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            Search Pincodes <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/ifsc"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            Search Bank IFSC <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/tools/pps-cheque"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Cheque PPS Generator <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
