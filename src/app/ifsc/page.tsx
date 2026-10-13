import { getAllIfsc } from "@/lib/dataService";
import Link from "next/link";
import { Building2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE = 20;

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
        href={`/ifsc?page=${Math.max(1, currentPage - 1)}`}
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
        href={`/ifsc?page=${Math.min(totalPages, currentPage + 1)}`}
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

export default async function IfscDirectoryPage({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const branches = await getAllIfsc(page, PER_PAGE);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Browse All Bank IFSC Codes
        </h1>
        <p className="mt-2 text-slate-600">
          Verified Indian bank branch IFSC codes. Select any code to view
          branch address, MICR, and contact details.
        </p>
      </div>

      {branches.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
          <Building2 className="mx-auto size-10 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700">No branches found</p>
          <p className="text-sm text-slate-500">Try another page or search directly.</p>
        </div>
      ) : (
        <>
          <div
            className="grid gap-4"
            id="ifsc-list"
            role="list"
            aria-label="IFSC directory"
          >
            {branches.map((b, idx) => (
              <IfscCard
                key={`${b.ifsc}-${idx}`}
                branch={{ ...b, url: `/ifsc/${b.ifsc}` }}
              />
            ))}
          </div>

          <Pagination currentPage={page} totalPages={Math.ceil(150000 / PER_PAGE)} />
        </>
      )}

      <div className="mt-12 rounded-xl border border-sky-200 bg-sky-50 p-6 text-sky-900">
        <p className="font-bold">About This Directory</p>
        <p className="mt-1 text-sm">
          IFSC data is sourced from bank records and RBI published lists. Every
          code is cross-checked to ensure accurate NEFT/RTGS/IMPS routing. Use
          the search bar at the top to find a code instantly.
        </p>
      </div>
    </section>
  );
}
