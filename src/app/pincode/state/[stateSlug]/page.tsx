import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, ArrowRight, BarChart3, Globe } from "lucide-react";
import { INDIA_STATES_DIRECTORY, getStateBySlug } from "@/data/india-states-directory";
import { getPincodesByState } from "@/lib/dataService";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return { title: "State Not Found | MultiSheets" };
  }

  return {
    title: `${state.stateName} Pincode Directory & Postal Circle Guide | MultiSheets`,
    description: `Browse verified Indian postal pincodes and delivery infrastructure in ${state.stateName}. Comprehensive directory for ${state.postalCircle}.`,
  };
}

export async function generateStaticParams() {
  return INDIA_STATES_DIRECTORY.map((state) => ({
    stateSlug: state.slug,
  }));
}

export default async function PincodeStateHubPage({ params, searchParams }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  // Fetch initial data for districts/counts
  const data = await getPincodesByState(stateSlug, 1, 1);
  if (!data) notFound();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>›</span>
        <Link href="/pincode" className="hover:text-slate-700">Pincode Directory</Link>
        <span>›</span>
        <span className="font-bold text-slate-700">{state.stateName}</span>
      </nav>

      <div className="mb-10 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {state.stateName} Pincode Directory & Postal Circle Guide
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl">
          Verified Indian postal pincodes, delivery zones, and distribution nodes for the {state.postalCircle}.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Entity Passage Block */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Postal Circle & Delivery Infrastructure in {state.stateName}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The {state.postalCircle} manages comprehensive postal services across {state.stateName}, covering pincode series {state.pincodePrefix}.
              With an estimated {state.totalPostalDivisionsEstimated} postal divisions, it ensures last-mile connectivity for critical financial, commercial,
              and administrative document dispatch across both urban centers and rural hinterlands.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="py-2 pr-4 font-bold text-slate-700">Division / District</th>
                    <th className="py-2 pr-4 font-bold text-slate-700">Starting Pincode</th>
                    <th className="py-2 font-bold text-slate-700">Delivery Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {state.majorDistricts.slice(0, 3).map((district, i) => (
                    <tr key={district} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 text-slate-900">{district}</td>
                      <td className="py-3 pr-4 font-mono text-slate-600">{state.pincodePrefix}XXXX</td>
                      <td className="py-3 text-slate-600">Zone {i + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Grid */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600 mb-4">
              <MapPin className="size-4 text-teal-600" /> Major Districts & Regions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {state.majorDistricts.map((district) => (
                <Link
                  key={district}
                  href={`/pincode?q=${encodeURIComponent(district)}`}
                  className="group rounded-xl border border-slate-200 bg-white p-3 text-center transition hover:border-teal-300 hover:shadow-sm"
                >
                  <p className="text-sm font-bold text-slate-900 group-hover:text-teal-700">{district}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <h4 className="font-bold text-teal-900">Need precise delivery times?</h4>
            <p className="mt-2 text-sm text-teal-800">Calculate delivery SLA and distance tiers between any two pincodes in {state.stateName}.</p>
            <Link href="/tools/pincode-distance" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700">
              Calculate Distance <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h4 className="font-bold text-slate-900">Speed Post Charges</h4>
            <p className="mt-2 text-sm text-slate-600">Get instant tariff quotes based on weight and destination.</p>
            <Link href="/tools/speedpost-calculator" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
              Calculate Tariff <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
