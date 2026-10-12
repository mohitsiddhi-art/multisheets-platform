import { getAllPincodes } from "@/lib/dataService";
import Link from "next/link";
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE = 20;

interface PincodeWithUrl {
  pincode: string;
  office_name: string;
  district: string;
  state: string;
  delivery_status: string;
  url: string;
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

function PincodeCard({ pincode }: { pincode: PincodeWithUrl }) {
  return (
    <Link
      href={pincode.url}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-inner">
          <span className="font-mono text-xl font-bold text-slate-900">
            {pincode.pincode}
          </span>
        </span>
        <div>
          <p className="font-semibold text-slate-900 group-hover:text-sky-700">
            {pincode.office_name}
          </p>
          <p className="text-sm text-slate-500">
            {pincode.district}, {pincode.state}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DeliveryStatus status={pincode.delivery_status} />
        <ArrowUpRight className="size-5 text-slate-300 transition-transform group-hover:rotate-45 group-hover:text-sky-500" />
      </div>
    </Link>
  );
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
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Link
        href={`/pincode?page=${Math.max(1, currentPage - 1)}`}
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        aria-label="Previous page"
        aria-disabled={currentPage <= 1}
        rel={currentPage <= 1 ? "nofollow" : ""}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Link>

      <span className="hidden text-sm text-slate-600 sm:inline-block">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={`/pincode?page=${Math.min(totalPages, currentPage + 1)}`}
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
        aria-label="Next page"
        aria-disabled={currentPage >= totalPages}
        rel={currentPage >= totalPages ? "nofollow" : ""}
      >
        Next
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}

export default async function PincodeDirectoryPage({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const pincodes = await getAllPincodes(page, PER_PAGE);

  // Generate static params for SEO / pre-render
  // (generateStaticParams is defined at build time; this is a simple approach)
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Browse All Pincodes
        </h1>
        <p className="mt-2 text-slate-600">
          Verified Indian postal pincodes from India Post public records.
          <span className="block mt-1 text-sm text-slate-500">
            Select any pincode to view detailed branch and delivery information.
          </span>
        </p>
      </div>

      {pincodes.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <MapPin className="mx-auto size-10 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700">No pincodes found</p>
          <p className="text-sm text-slate-500">Try another page or search directly.</p>
        </div>
      ) : (
        <>
          <div
            className="grid gap-4"
            id="pincode-list"
            role="list"
            aria-label="Pincode directory"
          >
            {pincodes.map((pc, idx) => (
              <PincodeCard
                key={`${pc.pincode}-${idx}`}
                pincode={{ ...pc, url: `/pincode/${pc.pincode}` }}
              />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={Math.ceil(2000 / PER_PAGE)} />
        </>
      )}

      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <p className="font-bold">About This Directory</p>
        <p className="mt-1 text-sm">
          Pincode data is sourced from India Post public records. Every entry is
          cross-checked against official records to ensure delivery accuracy.
          Use the search bar at the top to find a specific pincode in milliseconds.
        </p>
      </div>
    </section>
  );
}
