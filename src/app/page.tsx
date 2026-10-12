import { HeroWith3D } from "@/components/hero/HeroWith3D";
import { ToolsSection } from "@/components/tools/ToolsSection";
import { EngagementSection } from "@/components/engagement/EngagementSection";
import Link from "next/link";
import { ArrowRight, Banknote, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroWith3D />

      {/* Featured PPS Tool Quick-Banner */}
      <section className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-teal-500/10 border-y border-amber-200/40 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30">
              <Banknote className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">Cheque PPS Slip &amp; Amount Words Generator</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold text-amber-800">
                  <Sparkles className="size-2.5" /> High Utility
                </span>
              </div>
              <p className="text-xs text-slate-500">Instant RBI-compliant Positive Pay draft, Indian numbering words converter &amp; printable record slips.</p>
            </div>
          </div>
          <Link
            href="/tools/pps-cheque"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-slate-800"
          >
            Launch PPS Generator
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      <ToolsSection />
      <EngagementSection />
    </>
  );
}
