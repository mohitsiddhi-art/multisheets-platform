import { HeroWith3D } from "@/components/hero/HeroWith3D";
import { ToolsSection } from "@/components/tools/ToolsSection";
import { EngagementSection } from "@/components/engagement/EngagementSection";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Sparkles,
  Zap,
  Building2,
  Download,
  Package,
  FileSpreadsheet,
  Truck,
  ShieldAlert,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroWith3D />

      {/* ── Quick Trust Badges Strip ── */}
      <section className="border-y border-slate-200/60 bg-slate-50/70 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm">
            <Zap className="size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
            <span className="text-xs font-bold text-amber-800">1,55,000+ Verified Postal Pincodes</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 shadow-sm">
            <Building2 className="size-3.5 shrink-0 text-sky-500" aria-hidden="true" />
            <span className="text-xs font-bold text-sky-800">1,45,000+ Bank IFSC Branches</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm">
            <Download className="size-3.5 shrink-0 text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-bold text-emerald-800">100% Free Open CSV Datasets</span>
          </div>
        </div>
      </section>

      {/* ── Quick Utility Jump Cards ── */}
      <section className="bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            Popular Tools &amp; Resources
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Card A: Bulk Downloads */}
            <Link
              href="/downloads"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md"
            >
              <span className="absolute right-0 top-0 size-24 translate-x-6 -translate-y-6 rounded-full bg-sky-500/8 blur-2xl" />
              <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shadow-inner">
                <FileSpreadsheet className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-black text-slate-900 group-hover:text-sky-700">
                Bulk Downloads Center
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Download complete Indian postal &amp; banking master CSV files.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[0.7rem] font-bold text-sky-500">
                Download Now <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card B: Cheque PPS */}
            <Link
              href="/tools/pps-cheque"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
            >
              <span className="absolute right-0 top-0 size-24 translate-x-6 -translate-y-6 rounded-full bg-amber-500/8 blur-2xl" />
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-inner">
                <Banknote className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-black text-slate-900 group-hover:text-amber-700">
                Cheque PPS &amp; Amount Converter
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Generate RBI-standard Positive Pay slips and words conversion.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[0.7rem] font-bold text-amber-500">
                Open Tool <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {/* Card C: Speed Post Calculator */}
            <Link
              href="/tools/speedpost-calculator"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <span className="absolute right-0 top-0 size-24 translate-x-6 -translate-y-6 rounded-full bg-teal-500/8 blur-2xl" />
              <span className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shadow-inner">
                <Truck className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-black text-slate-900 group-hover:text-teal-700">
                Speed Post &amp; Parcel Calculator
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Calculate parcel tariff, transit days &amp; dispatch slips.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-[0.7rem] font-bold text-teal-500">
                Calculate Now <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cyber Fraud Recovery Emergency Banner */}
      <section className="border-y border-red-200/50 bg-gradient-to-r from-red-600/15 via-rose-500/10 to-amber-500/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/30">
              <ShieldAlert className="size-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">Cyber Fraud Emergency Response &amp; 1930 Helpline Desk</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[0.65rem] font-bold text-red-800">
                  <Sparkles className="size-2.5" /> Urgent Action
                </span>
              </div>
              <p className="text-xs text-slate-600">Lost money to a UPI, APK, or banking scam? Freeze funds, trigger 1930 triage &amp; generate RBI dispute letters.</p>
            </div>
          </div>
          <Link
            href="/tools/cyber-fraud-recovery"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-red-700"
          >
            Launch Recovery Tool
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <ToolsSection />
      <EngagementSection />
    </>
  );
}
