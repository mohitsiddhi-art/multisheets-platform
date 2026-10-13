import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Copy, MapPin, Building2, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, ArrowUpRight, Download, BarChart3 } from "lucide-react";

import { getPincodeByCode, getPincodesByState, toSlug } from "@/lib/dataService";
import { getPostalAddressSchema } from "@/utils/schema";

interface PageProps {
  params: Promise<{ code: string }>;
  searchParams?: Promise<{ page?: string }>;
}

// An "IFSC-like" code is 6 digits → pincode detail. Otherwise treated as a state slug.
const isPincodeCode = (code: string) => /^\d{6}$/.test(code);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;

  if (isPincodeCode(code)) {
    const pincode = await getPincodeByCode(code);
    if (!pincode) {
      return {
        title: `Pincode ${code} Not Found | MultiSheets`,
        description: `We could not find a record for Pincode ${code}.`,
      };
    }
    return {
      title: `${pincode.pincode} — ${pincode.office_name}, ${pincode.state} | MultiSheets`,
      description: `Post office details for pincode ${pincode.pincode}: ${pincode.office_name}, ${pincode.district}, ${pincode.state}.`,
      openGraph: {
        title: `${pincode.pincode} — ${pincode.office_name}`,
        description: `Verified pincode ${pincode.pincode} branch in ${pincode.state}.`,
        url: `https://multisheets.com/pincode/${code}`,
        type: "website",
      },
    };
  }

  // State slug → reuse state directory metadata.
  const displayName = code.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${displayName} Pincode Directory & Post Offices List | MultiSheets`,
    description: `View all verified Indian postal pincodes and post office branches in ${displayName}. Data sourced from India Post official records.`,
    openGraph: {
      title: `${displayName} Pincode Directory | MultiSheets`,
      description: `Verified India Post pincode and branch list for ${displayName}.`,
      url: `https://multisheets.com/pincode/${code}`,
      type: "website",
    },
  };
}

function DeliveryStatus({ status }: { status: string }) {
  if (!status) {
    return <span className="text-xs text-slate-400">Data pending</span>;
  }
  return status === "Delivery" ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-emerald-700">
      Delivery
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide text-amber-700">
      Non-delivery
    </span>
  );
}

function IfscCard({ branch }: { branch: IfscWithUrl }) {
  return (
    <Link
      href={branch.url}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 shadow-inner">
          <MapPin className="size-6" />
        </span>
        <div>
          <p className="font-mono font-bold text-slate-900 group-hover:text-sky-700">
            {branch.pincode}
          </p>
          <p className="font-semibold text-slate-900 group-hover:text-sky-700">
            {branch.office_name}
          </p>
          <p className="text-sm text-slate-500">
            {branch.district}, {branch.state}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DeliveryStatus status={branch.delivery_status} />
        <ArrowUpRight className="size-5 text-slate-300 transition-transform group-hover:rotate-45 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}

interface IfscWithUrl {
  pincode: string;
  office_name: string;
  district: string;
  state: string;
  delivery_status: string;
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

export default async function PincodeDetailPage({ params, searchParams }: PageProps) {
  const { code } = await params;

  // ── STATE DIRECTORY VIEW ───────────────────────────────────────────────────
  if (!isPincodeCode(code)) {
    const canonicalSlug = toSlug(code);
    const sp = (await searchParams) ?? {};
    const page = Math.max(1, parseInt(sp.page || "1", 10));
    const limit = 25;
    const data = await getPincodesByState(canonicalSlug, page, limit);

    if (!data) {
      notFound();
    }

    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700">
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/pincode" className="text-slate-400 hover:text-slate-700">Pincode Directory</Link>
          <span aria-hidden="true">›</span>
          <span className="font-bold text-slate-700">{data.stateLabel}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {data.stateLabel} Pincode Directory
          </h1>
          <p className="mt-2 text-slate-600">
            <span className="font-bold text-slate-900">{data.total.toLocaleString()}</span> verified postal nodes sourced from India Post records.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600">
            <BarChart3 className="size-4 text-teal-600" /> Districts
          </h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {data.districts.map((d) => (
              <span
                key={d.district}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700"
              >
                <MapPin className="size-3 text-slate-400" /> {d.district}
                <span className="text-slate-400">({d.count})</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4" id="pincode-list" role="list" aria-label="Pincode directory">
          {data.records.map((pc, idx) => (
            <IfscCard
              key={`${pc.pincode}-${idx}`}
              branch={{ ...pc, url: `/pincode/${pc.pincode}` }}
            />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={data.totalPages} />

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-6 text-center">
          <p className="text-xs font-bold text-amber-900">
            Full {data.stateLabel} dataset available as CSV.
          </p>
          <a
            href={`/api/download/pincodes`}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-amber-700"
            download
          >
            <Copy className="size-3.5" /> Download Pincodes CSV
          </a>
        </div>
      </section>
    );
  }

  // ── PINCODE DETAIL VIEW ─────────────────────────────────────────────────────
  const pincode = await getPincodeByCode(code);

  if (!pincode) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <AlertCircle className="size-16 text-amber-500" />
        <h1 className="mt-6 text-3xl font-black text-slate-900">Pincode Not Found</h1>
        <p className="mt-3 text-lg text-slate-600">We could not find a record for Pincode {code}.</p>
        <Link href="/" className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white hover:bg-slate-700">
          Search Another
        </Link>
      </section>
    );
  }

  const schema = getPostalAddressSchema(pincode.pincode);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className="mb-8 flex gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-600">Home</Link> /
        <Link href="/pincode" className="hover:text-sky-600">Pincode</Link> /
        <span className="font-bold text-slate-900">{code}</span>
      </nav>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Postal Directory</span>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${pincode.delivery_status === 'Delivery' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {pincode.delivery_status || 'Data Pending'}
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pincode</span>
            <p className="mt-1.5 font-mono text-2xl font-black text-slate-900">{pincode.pincode}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Type</span>
            <p className="mt-1.5 text-lg font-bold text-slate-900">{pincode.office_type || "—"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Circle</span>
            <p className="mt-1.5 text-sm font-bold text-slate-900">{pincode.circle}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Office Name</span>
            <p className="mt-1 text-sm font-bold text-slate-900">{pincode.office_name}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">District</span>
            <p className="mt-1 text-sm font-bold text-slate-900">{pincode.district}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">State</span>
            <p className="mt-1 text-sm font-bold text-slate-900">{pincode.state}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Region / Division</span>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {pincode.region} / {pincode.division}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
          <CheckCircle className="size-4 text-emerald-600" />
          <p className="text-xs font-medium text-emerald-800">
            <strong>Delivery verified:</strong> <span className="font-bold">{pincode.office_name}</span> is a {pincode.delivery_status} office for <strong>{pincode.pincode}</strong>. Data verified & updated for 2026.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Need related post offices in the same state?
            <Link href={`/pincode/${toSlug(pincode.state)}`} className="ml-1 inline-block font-bold text-sky-600 hover:underline">
              View all pincodes in {pincode.state}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
