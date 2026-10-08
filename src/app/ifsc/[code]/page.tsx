import { getIfscByCode } from "@/lib/dataService";
import Link from "next/link";
import { Copy, Building2, AlertCircle, CheckCircle } from "lucide-react";

export default async function IfscDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
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

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 sm:p-10">
        <span className="text-sm font-bold uppercase tracking-wider text-sky-600">Bank Directory</span>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">{branch.bank_name}</h1>
        <p className="mt-2 text-lg text-slate-600">{branch.branch}</p>

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
                <p className="mt-1 text-sm">Always cross-verify the IFSC code and account details on your official bank chequebook or passbook before executing NEFT/RTGS/IMPS transactions.</p>
            </div>
        </div>
      </div>
    </section>
  );
}
