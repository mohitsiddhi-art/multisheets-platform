import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertTriangle, ShieldAlert, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — MultiSheets",
  description:
    "Terms of Service for MultiSheets directory platform. Read our terms regarding public data usage, liability, and fair use guidelines.",
};

export default function TermsOfServicePage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-800">
          <Scale className="size-3.5" />
          User Agreement
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last revised: October 2026 • Please read carefully before using MultiSheets
        </p>

        <div className="mt-10 space-y-10 text-slate-600">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <FileText className="size-5 text-sky-600" />
              1. Acceptance of Terms
            </h2>
            <p className="mt-3 leading-relaxed">
              By accessing, browsing, or utilizing the tools and directories hosted on{" "}
              <Link href="/" className="font-semibold text-sky-600 hover:underline">
                multisheets.com
              </Link>{" "}
              (&quot;MultiSheets&quot;, &quot;we&quot;, &quot;our&quot;), you agree to be bound by these
              Terms of Service and our{" "}
              <Link href="/privacy-policy" className="font-semibold text-sky-600 hover:underline">
                Privacy Policy
              </Link>
              . If you do not agree with any provision here, you should discontinue using the platform.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <CheckCircle2 className="size-5 text-emerald-600" />
              2. Nature of Service &amp; Informational Scope
            </h2>
            <p className="mt-3 leading-relaxed">
              MultiSheets is a public data consolidation platform intended purely for convenience,
              postal dispatch reference, and financial administrative assistance.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Directory listings for Indian postal pincodes and bank branch IFSC/MICR codes are
                aggregated from open public datasets and periodic banking gazettes.
              </li>
              <li>
                Tools (such as the Cheque Positive Pay Slip Generator and Amount-in-Words converter) are
                provided as client-side calculation utilities to streamline everyday business documentation.
              </li>
              <li>
                We are <strong>not</strong> a financial institution, payment gateway, banking agent, or
                affiliated post office representative.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <AlertTriangle className="size-5 text-amber-600" />
              3. Data Accuracy &amp; Mandatory User Verification
            </h2>
            <p className="mt-3 leading-relaxed">
              While we make diligent efforts to maintain updated datasets, banking branch codes
              frequently merge, de-merge, or reassign routing addresses.
            </p>
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm text-amber-950">
              <p className="font-bold">Crucial Financial Requirement:</p>
              <p className="mt-1 leading-relaxed">
                Prior to executing any interbank remittance (NEFT, RTGS, IMPS) or issuing a negotiable
                instrument (cheque or demand draft), you <strong>must independently verify</strong> the
                printed IFSC code and branch jurisdiction on the beneficiary&apos;s physical chequebook,
                official passbook, or direct bank confirmation.
              </p>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <ShieldAlert className="size-5 text-rose-600" />
              4. Limitation of Liability
            </h2>
            <p className="mt-3 leading-relaxed">
              To the fullest extent permitted by applicable Indian law, MultiSheets, its founders, and
              contributors disclaim all liability for any direct, indirect, incidental, consequential,
              or punitive damages arising out of:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Any incorrect routing, bounced cheques, or failed electronic bank transfers.</li>
              <li>Misaddressed postal or courier shipments resulting from reliance on pincode data.</li>
              <li>Temporary site downtime, network latency, or service interruptions.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              5. Fair Use &amp; Prohibited Conduct
            </h2>
            <p className="mt-3 leading-relaxed">
              You agree to use MultiSheets solely for legitimate, lawful purposes. You shall not:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              <li>Attempt to perform automated scraping at abusive volumes that degrade service uptime for others.</li>
              <li>Attempt to circumvent platform security or execute denial-of-service (DoS) attempts.</li>
              <li>Misrepresent MultiSheets as an official banking or postal clearance portal.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p className="mt-3 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Republic
              of India. Any disputes arising under or in connection with these terms shall be subject to
              the exclusive jurisdiction of the competent courts in Kolkata, West Bengal, India.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
          >
            Back to Home
          </Link>
          <Link
            href="/privacy-policy"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Privacy Policy
          </Link>
          <Link
            href="/disclaimer"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Disclaimer
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-sky-50 px-6 py-3 text-sm font-bold text-sky-700 transition-colors hover:bg-sky-100"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
