import { guides } from "@/data/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Clock } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-12 lg:py-20">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-8"
      >
        <ChevronLeft className="size-4" />
        Back to Knowledge Hub
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
          {guide.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-100 py-4">
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span>MultiSheets Editorial Team</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>Oct 13, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>6 min read</span>
          </div>
        </div>
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-8 prose-li:text-slate-600 prose-strong:text-slate-900"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />

      <footer className="mt-16 border-t border-slate-200 pt-10">
        <div className="rounded-2xl bg-slate-900 p-8 text-white">
          <h3 className="text-xl font-bold">Disclaimer</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            The information provided in this guide is for educational and informational purposes only. While we strive for accuracy, banking and postal rules in India are subject to change by respective authorities (RBI and India Post). Always verify critical details with your bank or local post office before proceeding with high-value transactions.
          </p>
        </div>
      </footer>
    </article>
  );
}
