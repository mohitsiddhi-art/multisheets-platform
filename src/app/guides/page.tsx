import { guides } from "@/data/guides";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function GuidesPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
          <BookOpen className="size-3.5" />
          Knowledge Hub
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
          Operational Guides & Practical Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Deep dives into Indian financial and postal procedures. Written by practitioners for professionals who value accuracy and compliance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-700">
              {guide.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
              {guide.description}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-600">
              Read Guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
