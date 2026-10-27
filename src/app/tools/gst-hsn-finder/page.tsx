"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Calculator, FileText, ArrowRight, Copy, Check, Filter, BookOpen, Building2, MapPin } from "lucide-react";
import { GST_HSN_DATASET, GstHsnItem } from "@/data/gst-hsn-codes";
import { saveRecentSearch, getRecentSearches } from "@/utils/recentSearchesCache";

export default function GstHsnFinderPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "HSN" | "SAC">("ALL");
  const [rateFilter, setRateFilter] = useState<string>("ALL");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<Array<{ id: string; title: string; subtitle?: string }>>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches("hsn"));
  }, []);

  const handleCopy = (code: string, description: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    saveRecentSearch("hsn", { id: code, title: code, subtitle: description });
    setRecentSearches(getRecentSearches("hsn"));
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredItems = useMemo(() => {
    return GST_HSN_DATASET.filter((item) => {
      const matchesType = typeFilter === "ALL" || item.type === typeFilter;
      const matchesRate = rateFilter === "ALL" || item.gstRate.toString() === rateFilter;
      const matchesQuery =
        !query ||
        item.code.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      return matchesType && matchesRate && matchesQuery;
    });
  }, [query, typeFilter, rateFilter]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "GST Rate & HSN/SAC Code Finder 2026",
        "url": "https://multisheets.com/tools/gst-hsn-finder",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "Instant HSN and SAC code lookup tool with verified GST rates, cess, and SME compliance guidelines.",
        "browserRequirements": "Requires JavaScript. Requires HTML5."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Difference Between HSN and SAC Codes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Harmonized System of Nomenclature (HSN) codes are internationally standardized numerical codes used to classify physical goods under GST. Services Accounting Codes (SAC), established by the CBIC, are dedicated numerical codes used exclusively for classifying services. While HSN codes range from 2 to 8 digits depending on annual turnover, SAC codes universally adopt a uniform 6-digit structure starting with prefix 99."
            }
          },
          {
            "@type": "Question",
            "name": "Mandatory HSN Digit Rules on Tax Invoices (2026)",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under GST invoice regulations, businesses with an aggregate annual turnover up to ₹5 Crores are required to quote a minimum of 4 digits for B2B tax invoices (and optional for B2C). Taxpayers with an annual turnover exceeding ₹5 Crores must mandate 6-digit HSN codes for goods and SAC codes for services on all B2B outward invoices, whereas export transactions and regulated sector supplies require 8-digit precision."
            }
          },
          {
            "@type": "Question",
            "name": "GST Rates on Courier, Postal & Freight Services",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Standard commercial courier and postal dispatch services (SAC 996811) attract a uniform GST rate of 18% with full Input Tax Credit (ITC) eligibility for registered corporate shippers. Standard road freight transport services operated by goods transport agencies (GTA under SAC 996511) attract 5% GST (with ITC) or 12% GST under forward charge mechanism depending on transporter declaration."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumbs" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>›</span>
        <Link href="/downloads" className="hover:text-slate-700">Tools</Link>
        <span>›</span>
        <span className="font-bold text-slate-700">GST HSN/SAC Finder</span>
      </nav>

      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 shadow-inner">
            <Calculator className="size-6" />
          </span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              GST Rate & HSN/SAC Code Finder 2026
            </h1>
            <p className="mt-1 text-slate-600">
              Look up verified HSN (Goods) and SAC (Services) classification codes, tax rates, and SME compliance rules instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by HSN/SAC code (e.g. 996811, 4819), description, or category..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 transition focus:bg-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
          {/* Type Filter Tabs */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Type:</span>
            {(["ALL", "HSN", "SAC"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                  typeFilter === t
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t === "ALL" ? "All Codes" : t === "HSN" ? "Goods (HSN)" : "Services (SAC)"}
              </button>
            ))}
          </div>

          {/* Rate Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Rate:</span>
            {["ALL", "0", "5", "12", "18", "28"].map((r) => (
              <button
                key={r}
                onClick={() => setRateFilter(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  rateFilter === r
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {r === "ALL" ? "All Rates" : `${r}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches Tray */}
        {recentSearches.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Recent Lookups:</span>
            {recentSearches.map((item) => (
              <button
                key={item.id}
                onClick={() => setQuery(item.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 transition hover:bg-teal-100"
              >
                <span className="font-mono font-bold">{item.id}</span>
                <span className="max-w-[120px] truncate">{item.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Table / Cards */}
      <div className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Matching Codes ({filteredItems.length})
          </h2>
          <p className="text-xs text-slate-500">Click copy button to copy HSN/SAC code to clipboard</p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <FileText className="mx-auto size-12 text-slate-400" />
            <p className="mt-3 font-bold text-slate-700">No HSN or SAC codes found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search query or clearing the rate/type filters.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredItems.map((item) => (
              <div
                key={item.code}
                className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold shadow-inner ${
                    item.type === "HSN" ? "bg-sky-50 text-sky-700" : "bg-purple-50 text-purple-700"
                  }`}>
                    {item.type}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-lg font-bold text-slate-900 group-hover:text-teal-700">
                        {item.code}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-slate-600">
                        {item.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-400 block">GST Rate</span>
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black ${
                      item.gstRate === 0 ? "bg-slate-100 text-slate-700" :
                      item.gstRate <= 5 ? "bg-emerald-50 text-emerald-700" :
                      item.gstRate <= 12 ? "bg-teal-50 text-teal-700" :
                      item.gstRate <= 18 ? "bg-sky-50 text-sky-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      {item.gstRate}% GST
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.code, item.description)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-teal-50 hover:border-teal-300 hover:text-teal-800"
                    title="Copy HSN/SAC Code"
                  >
                    {copiedCode === item.code ? (
                      <>
                        <Check className="size-4 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AEO/GEO Passage-Chunked FAQ Section */}
      <div className="space-y-12 border-t border-slate-200 pt-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            GST Compliance & HSN/SAC Classification Guide
          </h2>
          <p className="mt-2 text-slate-600">
            Expert answers on classification rules, digit requirements, and courier/logistics taxation under Indian GST laws.
          </p>
        </div>

        {/* FAQ 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            What is the Difference Between HSN and SAC Codes?
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Harmonized System of Nomenclature (HSN) codes are internationally standardized numerical codes used to classify physical goods under GST. Services Accounting Codes (SAC), established by the CBIC, are dedicated numerical codes used exclusively for classifying services. While HSN codes range from 2 to 8 digits depending on annual turnover, SAC codes universally adopt a uniform 6-digit structure starting with prefix 99.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left bg-slate-50">
                  <th className="py-3 px-4 font-bold text-slate-700">Parameter</th>
                  <th className="py-3 px-4 font-bold text-slate-700">HSN Code (Goods)</th>
                  <th className="py-3 px-4 font-bold text-slate-700">SAC Code (Services)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Classification Standard</td>
                  <td className="py-3 px-4 text-slate-600">WCO International Convention</td>
                  <td className="py-3 px-4 text-slate-600">CBIC India Domestic Standard</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Digit Length</td>
                  <td className="py-3 px-4 text-slate-600 font-mono">2, 4, 6, or 8 digits</td>
                  <td className="py-3 px-4 text-slate-600 font-mono">Uniform 6 digits (Prefix 99)</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Application Scope</td>
                  <td className="py-3 px-4 text-slate-600">Raw materials, manufactured goods, retail items</td>
                  <td className="py-3 px-4 text-slate-600">Logistics, banking, legal, software, consulting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Mandatory HSN Digit Rules on Tax Invoices (2026)
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Under GST invoice regulations, businesses with an aggregate annual turnover up to ₹5 Crores are required to quote a minimum of 4 digits for B2B tax invoices (and optional for B2C). Taxpayers with an annual turnover exceeding ₹5 Crores must mandate 6-digit HSN codes for goods and SAC codes for services on all B2B outward invoices, whereas export transactions and regulated sector supplies require 8-digit precision.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left bg-slate-50">
                  <th className="py-3 px-4 font-bold text-slate-700">Annual Turnover Slab</th>
                  <th className="py-3 px-4 font-bold text-slate-700">B2B Invoices Requirement</th>
                  <th className="py-3 px-4 font-bold text-slate-700">B2C Invoices Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Up to ₹5 Crores</td>
                  <td className="py-3 px-4 text-slate-600">Mandatory 4 Digits</td>
                  <td className="py-3 px-4 text-slate-600">Optional / Not Mandatory</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Above ₹5 Crores</td>
                  <td className="py-3 px-4 text-slate-600">Mandatory 6 Digits</td>
                  <td className="py-3 px-4 text-slate-600">Mandatory 4 Digits</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Exports & Special Sectors</td>
                  <td className="py-3 px-4 text-slate-600 font-bold text-teal-700">Mandatory 8 Digits</td>
                  <td className="py-3 px-4 text-slate-600 font-bold text-teal-700">Mandatory 8 Digits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            GST Rates on Courier, Postal & Freight Services
          </h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Standard commercial courier and postal dispatch services (SAC 996811) attract a uniform GST rate of 18% with full Input Tax Credit (ITC) eligibility for registered corporate shippers. Standard road freight transport services operated by goods transport agencies (GTA under SAC 996511) attract 5% GST (with ITC) or 12% GST under forward charge mechanism depending on transporter declaration.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left bg-slate-50">
                  <th className="py-3 px-4 font-bold text-slate-700">Service Type</th>
                  <th className="py-3 px-4 font-bold text-slate-700">SAC Code</th>
                  <th className="py-3 px-4 font-bold text-slate-700">Applicable GST Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Commercial Courier & Postal Dispatch</td>
                  <td className="py-3 px-4 font-mono text-slate-600">996811</td>
                  <td className="py-3 px-4 font-bold text-teal-700">18% GST</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">Road Freight Transport (GTA)</td>
                  <td className="py-3 px-4 font-mono text-slate-600">996511</td>
                  <td className="py-3 px-4 font-bold text-teal-700">5% or 12% GST</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-semibold text-slate-900">E-commerce Logistics & Last-Mile</td>
                  <td className="py-3 px-4 font-mono text-slate-600">996813</td>
                  <td className="py-3 px-4 font-bold text-teal-700">18% GST</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cross-linking Callout Cards */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 sm:p-8">
          <h4 className="text-lg font-bold text-sky-900">Speed Post Tariff Calculator</h4>
          <p className="mt-2 text-sm text-sky-800 leading-relaxed">
            Calculate domestic weight-based postal tariffs, transit times, and delivery SLAs across all 1.55 lakh pincodes.
          </p>
          <Link
            href="/tools/speedpost-calculator"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-sky-700 shadow-sm"
          >
            Calculate Tariff <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8">
          <h4 className="text-lg font-bold text-teal-900">Positive Pay System (PPS) Validator</h4>
          <p className="mt-2 text-sm text-teal-800 leading-relaxed">
            Convert and validate cheque particulars for RBI-mandated Positive Pay clearance exceeding ₹50,000.
          </p>
          <Link
            href="/tools/pps-cheque"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 shadow-sm"
          >
            Validate Cheque <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
