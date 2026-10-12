import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — MultiSheets",
  description:
    "Privacy Policy for MultiSheets. Understand how we protect your privacy when using our Indian Pincode, IFSC directory, and financial utility tools.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-700">
          <Shield className="size-3.5" />
          Data Protection & Privacy
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: October 2026 • Compliant with Indian IT Act, 2000 &amp; SPDI Rules
        </p>

        <div className="mt-10 space-y-10 text-slate-600">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <FileText className="size-5 text-sky-600" />
              1. Overview
            </h2>
            <p className="mt-3 leading-relaxed">
              MultiSheets (accessible via{" "}
              <Link href="/" className="font-semibold text-sky-600 hover:underline">
                multisheets.com
              </Link>
              ) is an independent public information utility and directory platform providing
              verified Indian postal pincodes, bank IFSC codes, branch details, and client-side
              financial helper tools. Your privacy is paramount to us, and this Privacy Policy outlines
              our practices regarding information collection, usage, and safeguarding.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Lock className="size-5 text-sky-600" />
              2. Zero Financial Credential Storage
            </h2>
            <p className="mt-3 leading-relaxed">
              We uphold a strict zero-retention policy for any financial or sensitive user data:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>No Bank Account or Card Details:</strong> MultiSheets never asks for, captures,
                or stores bank account numbers, passwords, PINs, OTPs, or debit/credit card information.
              </li>
              <li>
                <strong>Client-Side Execution:</strong> Tools such as the Cheque PPS Generator,
                Number-to-Words converter, and Courier Cost Estimator compute results completely inside
                your web browser. No cheque numbers, payee names, or amounts are transmitted to or stored
                on our backend servers.
              </li>
              <li>
                <strong>Public Directory Data:</strong> All postal and banking directory data served on
                MultiSheets originates from publicly accessible government and institutional records.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Eye className="size-5 text-sky-600" />
              3. Analytics &amp; Cookies
            </h2>
            <p className="mt-3 leading-relaxed">
              To guarantee fast query speeds and monitor service uptime, we use privacy-centric,
              aggregate analytics (such as Vercel Analytics). These metrics measure anonymous
              page views, general geographic region, and device browser type without fingerprinting
              individual users.
            </p>
            <p className="mt-3 leading-relaxed">
              We do not utilize tracking cookies for behavioral ad profiling. You can adjust your
              browser settings to decline cookies at any time without impacting your ability to search
              pincodes or look up IFSC codes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              4. Third-Party Websites &amp; Portals
            </h2>
            <p className="mt-3 leading-relaxed">
              Our website may contain external links to official government portals (such as India Post
              consignment tracking) or verified commercial bank websites (such as Positive Pay portals).
              Once you navigate away from MultiSheets, you are governed by the privacy terms and security
              policies of the respective external destination.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              5. Children&apos;s Information
            </h2>
            <p className="mt-3 leading-relaxed">
              MultiSheets is an informational reference utility and does not knowingly solicit or collect
              any personally identifiable information from children under the age of 18.
            </p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <Mail className="size-5 text-sky-600" />
              6. Grievance Redressal &amp; Contact
            </h2>
            <p className="mt-3 leading-relaxed">
              Under the Information Technology Act, 2000 and rules made thereunder, for any queries,
              feedback, or privacy-related concerns, you may reach out to our team:
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <p className="font-bold text-slate-900">MultiSheets Support &amp; Privacy Officer</p>
              <p className="mt-1 text-slate-600">
                Email:{" "}
                <a
                  href="mailto:support@multisheets.com"
                  className="font-semibold text-sky-600 hover:underline"
                >
                  support@multisheets.com
                </a>
              </p>
              <p className="mt-1 text-slate-600">
                Operating Location: Bada Bazar, Kolkata, West Bengal — 700007, India
              </p>
            </div>
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
            href="/terms"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-sky-50 px-6 py-3 text-sm font-bold text-sky-700 transition-colors hover:bg-sky-100"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}
