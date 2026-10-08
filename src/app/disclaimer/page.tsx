import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer — MultiSheets",
  description: "Legal and regulatory disclaimer for MultiSheets - India's industrial directory platform.",
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <span className="text-sm font-bold uppercase tracking-wider text-sky-600">
          Legal Compliance
        </span>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
          Legal & Regulatory Disclaimer
        </h1>

        <div className="mt-10 space-y-10 text-slate-600">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Non-Affiliation Notice</h2>
            <p className="mt-3 leading-relaxed">
              MultiSheets (multisheets.com) is an independent informational utility platform.
              We are NOT affiliated with, sponsored by, or endorsed by the Reserve Bank of India (RBI),
              the Department of Posts (India Post), or any specific commercial bank, governmental
              body, or financial institution. All trademarks and logos are the property of their
              respective owners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Financial & Transaction Liability</h2>
            <p className="mt-3 leading-relaxed">
              All IFSC, MICR, and bank branch details displayed on this platform are aggregated from
              publicly available data sources. We strive for accuracy, but data may become outdated
              due to branch mergers or bank realignments.
            </p>
            <p className="mt-3 font-semibold text-slate-900">
              IMPORTANT: You must cross-verify any IFSC code, branch name, or account number
              printed on your official bank chequebook or passbook prior to executing NEFT, RTGS, or
              IMPS transactions. MultiSheets bears zero liability for any financial loss or
              transaction error resulting from your reliance on the information provided here.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Postal Accuracy</h2>
            <p className="mt-3 leading-relaxed">
              Pincodes, post office jurisdictions, and associated locality data are for
              informational reference only. For critical mail delivery verification, please consult
              the official India Post website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">External Links & Cyber Safety</h2>
            <p className="mt-3 leading-relaxed">
              MultiSheets will <strong>NEVER</strong> request your bank OTPs, net-banking passwords,
              debit card details, or UPI PINs. If you encounter any site impersonating MultiSheets
              to request sensitive financial credentials, please report it immediately to the local
              cybercrime authority. We are not responsible for the content or security of external
              websites linked within our directory.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-700"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
          >
            Contact Information
          </Link>
        </div>
      </div>
    </section>
  );
}
