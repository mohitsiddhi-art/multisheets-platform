import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Building2, ArrowRight, Landmark } from "lucide-react";
import { INDIA_STATES_DIRECTORY, getStateBySlug } from "@/data/india-states-directory";
import { getIfscsByBank } from "@/lib/dataService";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return { title: "State Not Found | MultiSheets" };
  }

  return {
    title: `${state.stateName} Bank IFSC & MICR Clearing Directory | MultiSheets`,
    description: `Browse verified bank IFSC codes, MICR, and NEFT/RTGS clearing information for branches located in ${state.stateName}.`,
  };
}

export async function generateStaticParams() {
  return INDIA_STATES_DIRECTORY.map((state) => ({
    stateSlug: state.slug,
  }));
}

export default async function IfscStateHubPage({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>›</span>
        <Link href="/ifsc" className="hover:text-slate-700">IFSC Directory</Link>
        <span>›</span>
        <span className="font-bold text-slate-700">{state.stateName}</span>
      </nav>

      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {state.stateName} Bank IFSC & MICR Clearing Directory
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Complete routing information for all banks operating in {state.stateName}.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">RTGS, NEFT & CTS Clearing Hours in {state.stateName}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Banking operations in {state.stateName} are governed by RBI settlement standards.
              Most branches facilitate high-value RTGS settlements and 24/7 NEFT transfers,
              with CTS-2010 cheque truncation applied across all major commercial clearing hubs.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-700">Settlement Rail</th>
                    <th className="py-2 pr-4 font-bold text-slate-700">Clearing Type</th>
                    <th className="py-2 font-bold text-slate-700">Standard SLA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-900 font-semibold">NEFT</td>
                    <td className="py-3 pr-4 text-slate-600">Electronic</td>
                    <td className="py-3 text-slate-600">24x7 Instant</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-900 font-semibold">RTGS</td>
                    <td className="py-3 pr-4 text-slate-600">Gross Settlement</td>
                    <td className="py-3 text-slate-600">Real-time</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4 text-slate-900 font-semibold">CTS Cheque</td>
                    <td className="py-3 pr-4 text-slate-600">Physical</td>
                    <td className="py-3 text-slate-600">T+1 Clearing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600 mb-4">
              <Building2 className="size-4 text-sky-600" /> Major Banks in {state.stateName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {state.majorBanks.map((bank) => (
                <Link
                  key={bank}
                  href={`/ifsc?q=${encodeURIComponent(bank)}`}
                  className="group rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:border-sky-300 hover:shadow-sm"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-sky-700">{bank}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-6">
            <h4 className="font-bold text-sky-900">Positive Pay System (PPS)</h4>
            <p className="mt-2 text-sm text-sky-800">For cheque clearance exceeding ₹50,000 in {state.stateName}, submit your PPS intimation.</p>
            <Link href="/tools/pps-cheque" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700">
              Submit PPS <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-slate-900">Upcoming Holidays</h4>
            <p className="mt-2 text-sm text-slate-600">Check bank closure dates and regional holidays for {state.stateName}.</p>
            <Link href="/bank-holidays" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              View Holidays <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
