import { getPincodeByCode } from "@/lib/dataService";
import Link from "next/link";
import { Copy, MapPin, Building2, AlertCircle, CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PincodeDetailPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
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

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20">
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

        <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900">{pincode.office_name}</h1>

        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-2">
            <div>
                <p className="text-sm text-slate-500">Pincode</p>
                <p className="mt-1 flex items-center gap-3 text-2xl font-mono font-bold text-slate-900">
                    {pincode.pincode}
                    <button className="rounded-lg p-2 hover:bg-slate-200 text-slate-400">
                      <Copy className="size-4" />
                    </button>
                </p>
            </div>
            <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{pincode.district}, {pincode.state}</p>
            </div>
            <div>
                <p className="text-sm text-slate-500">Office Details</p>
                <p className="mt-1 font-semibold text-slate-900">{pincode.office_type} - {pincode.division} Division</p>
                <p className="text-sm text-slate-500">{pincode.region}</p>
            </div>
            <div>
                <p className="text-sm text-slate-500">Circle</p>
                <p className="mt-1 font-semibold text-slate-900">{pincode.circle}</p>
            </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle className="size-4 text-sky-600" />
            <span>Source: India Post Public Records</span>
        </div>
      </div>
    </section>
  );
}
