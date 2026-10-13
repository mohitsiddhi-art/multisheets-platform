import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Copy, Building2, AlertCircle, CheckCircle, ArrowUpRight } from "lucide-react";

import { getIfscByCode, getIfscsByBank, toSlug } from "@/lib/dataService";
import { getFinancialServiceSchema } from "@/utils/schema";

interface PageProps {
  params: Promise<{ code: string }>;
  searchParams?: Promise<{ page?: string }>;
}

const isBankSlug = (code: string) => /^[A-Za-z][A-Za-z-]{2,}$/.test(code);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;

  if (isBankSlug(code)) {
    const displayName = code
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${displayName} Bank IFSC Codes & Branches Directory | MultiSheets`,
      description: `Complete directory of IFSC codes and branches for ${displayName}. Verified routing data from the Reserve Bank of India.`,
      openGraph: {
        title: `${displayName} IFSC Code List | MultiSheets`,
        description: `All verified IFSC codes and branch addresses for ${displayName}.`,
        url: `https://multisheets.com/ifsc/${code}`,
        type: "website",
      },
    };
  }

  const branch = await getIfscByCode(code);
  if (!branch) {
    return {
      title: `IFSC ${code} Not Found | MultiSheets`,
      description: `We could not find a record for IFSC ${code}.`,
    };
  }
  return {
    title: `${branch.ifsc} — ${branch.branch}, ${branch.bank_name} | MultiSheets`,
    description: `IFSC ${branch.ifsc} branch details in ${branch.city}, ${branch.state}. MICR and contact information.`,
    openGraph: {
      title: `${branch.ifsc} — ${branch.bank_name}`,
      description: `Branch details for ${branch.ifsc} in ${branch.city}.`,
      url: `https://multisheets.com/ifsc/${code}`,
      type: "website",
    },
  };
}

function IfscCard({ branch }: { branch: IfscWithUrl }) {
  return (
    <Link
      href={branch.url}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shadow-inner">
          <Building2 className="size-6" />
        </span>
        <div>
          <p className="font-mono font-bold text-slate-900 group-hover:text-sky-700">
            {branch.ifsc}
          </p>
          <p className="font-semibold text-slate-900 group-hover:text-sky-700">
            {branch.bank_name}
          </p>
          <p className="text-sm text-slate-500">
            {branch.branch
              ? `${branch.branch}, ${branch.city}, ${branch.state}`
              : [branch.city, branch.state].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {branch.micr && (
          <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-slate-600 sm:inline-block">
            MICR {branch.micr}
          </span>
        )}
        <ArrowUpRight className="size-5 text-slate-300 transition-transform group-hover:rotate-45 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}

interface IfscWithUrl {
  ifsc: string;
  bank_name: string;
  branch?: string;
  micr?: string;
  address?: string;
  city?: string;
  state?: string;
  contact?: string;
  url: string;
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={`?page=${Math.max(1, currentPage - 1)}`}
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="size-4" /> Previous
      </Link>

      <span className="hidden text-sm text-slate-600 sm:inline-block">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`?page=${Math.min(totalPages, currentPage + 1)}`}
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
        aria-disabled={currentPage >= totalPages}
      >
        Next <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function IfscDetailPage({ params, searchParams }: PageProps) {
  const { code } = await params;

  if (isBankSlug(code)) {
    const sp = (await searchParams) ?? {};
    const page = Math.max(1, parseInt(sp.page || "1", 10));
    const limit = 30;
    const data = await getIfscsByBank(code, page, limit);

    if (!data) {
      notFound();
    }

    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="text-slate-400 hover:text-slate-700">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/ifsc" className="text-slate-400 hover:text-slate-700">IFSC Directory</Link>
          <span aria-hidden="true">›</span>
          <span className="font-bold text-slate-700">{data.bankLabel}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {data.bankLabel} IFSC Codes &amp; Branches
          </h1>
          <p className="mt-2 text-slate-600">
            <span className="font-bold text-slate-900">{data.total.toLocaleString()}</span> verified bank branches and routing codes from the Reserve Bank of India.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
            <span className="inline-block size-2 rounded-full bg-emerald-500"></span>
            Data verified & updated for 2026
          </div>
        </div>

        <div className="mb-10">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600">
            <Building2 className="size-4 text-sky-600" /> Branches by State
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {data.states.map((s) => (
              <span
                key={s.state}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700"
              >
                <Building2 className="size-3 text-slate-400" /> {s.state}
                <span className="text-slate-400">({s.count})</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4" id="ifsc-list" role="list" aria-label="IFSC directory">
          {data.records.map((branch, idx) => (
            <IfscCard
              key={`${branch.ifsc}-${idx}`}
              branch={{ ...branch, url: `/ifsc/${branch.ifsc}` }}
            />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={data.totalPages} />

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 text-center">
          <p className="text-xs font-bold text-sky-900">
            Full {data.bankLabel} CSV export available at the Downloads center.
          </p>
          <a
            href={`/api/download/ifsc`}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-sky-700"
            download
          >
            <Copy className="size-3.5" /> Download IFSC CSV
          </a>
        </div>
      </section>
    );
  }

  const branch = await getIfscByCode(code);

  if (!branch) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <AlertCircle className="size-16 text-amber-500" />
        <h1 className="mt-6 text-3xl font-black text-slate-900">IFSC Not Found</h1>
        <p className="mt-3 text-lg text-slate-600">We could not find a record for IFSC {code}.</p>
        <Link href="/" className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-700">
          Search Another
        </Link>
      </section>
    );
  }

  const schema = getFinancialServiceSchema(branch.bank_name, branch.ifsc, branch.address || "", branch.city || "", branch.state || "");

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="mb-8 flex gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-600">Home</Link> /
        <Link href="/ifsc" className="hover:text-sky-600">IFSC</Link> /
        <span className="font-bold text-slate-900">{code}</span>
      </nav>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 sm:p-10">
        <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Bank Directory</span>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{branch.bank_name}</h1>
        <p className="mt-2 text-lg text-slate-600">{branch.branch}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <span className="inline-block size-2 rounded-full bg-emerald-500"></span>
          Data verified & updated for 2026
        </div>

        <div className="mt-8 grid gap-6 rounded-2xl bg-slate-50 p-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">IFSC Code</p>
            <div className="mt-1 flex items-center gap-3">
              <p className="font-mono text-2xl font-bold text-slate-900">{branch.ifsc}</p>
              <button className="rounded-lg p-2 hover:bg-slate-200 text-slate-400">
                <Copy className="size-4" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">MICR Code</p>
            <p className="mt-1 font-mono text-2xl font-bold text-slate-900">{branch.micr || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Contact</p>
            <p className="mt-1 font-mono text-xl font-bold text-slate-900">{branch.contact || 'N/A'}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-slate-500">Address</p>
            <p className="mt-1 font-semibold text-slate-900">{branch.address}, {branch.city}, {branch.state}</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900 flex items-start gap-4">
          <AlertCircle className="size-6 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Verify Before You Transfer</p>
            <p className="mt-1 text-sm">
              Always cross-check the IFSC on your bank's official website or cheque leaf before initiating RTGS/NEFT/IMPS. MultiSheets is a reference directory.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
          <CheckCircle className="size-4 text-emerald-600" />
          <p className="text-xs font-medium text-emerald-800">
            <strong>Verified:</strong> {branch.bank_name}, {branch.city} branch. Data verified & updated for 2026.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Need more branches of this bank?
            <Link href={`/ifsc/${toSlug(branch.bank_name)}`} className="ml-1 inline-block font-bold text-sky-600 hover:underline">
              View all {branch.bank_name} branches
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
