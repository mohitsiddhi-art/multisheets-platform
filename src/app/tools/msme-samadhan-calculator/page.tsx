"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldAlert, FileText, CheckCircle2, AlertTriangle, Building2, Calendar, Copy, Check } from "lucide-react";
import { calculateMsmeInterest } from "@/utils/msmeCalculator";

export default function MsmeSamadhanCalculatorPage() {
  const [principal, setPrincipal] = useState<string>("250000");
  const [buyerType, setBuyerType] = useState<'micro' | 'small' | 'medium'>('micro');
  const [agreementType, setAgreementType] = useState<'with_agreement' | 'without_agreement'>('with_agreement');
  const [agreedDays, setAgreedDays] = useState<number>(45);
  const [invoiceDate, setInvoiceDate] = useState<string>("2026-02-15");
  const [repoRate, setRepoRate] = useState<string>("6.5");
  const [copied, setCopied] = useState(false);

  const principalNum = parseFloat(principal) || 0;
  const repoRateNum = parseFloat(repoRate) || 6.5;

  const result = calculateMsmeInterest(
    principalNum,
    buyerType,
    agreementType,
    agreedDays,
    invoiceDate,
    repoRateNum
  );

  const handleCopySummary = () => {
    const text = `MSME Samadhan Interest Calculation (MSMED Act 2006 Sec 15/16):
- Principal Invoice Amount: ₹${result.principalAmount.toLocaleString('en-IN')}
- Enterprise Buyer Type: ${result.buyerType.toUpperCase()}
- Credit Agreement Type: ${result.agreementType === 'with_agreement' ? `Written Agreement (${result.maxCreditDays} days)` : 'No Written Agreement (15 days)'}
- Invoice Date: ${result.invoiceDate}
- Due Date: ${result.dueDate}
- Delay Period: ${result.delayDays} Days
- Statutory Interest Rate: ${result.statutoryInterestRate}% p.a. (3x RBI Repo Rate ${repoRateNum}%)
- Statutory Compound Interest: ₹${result.compoundInterestAmount.toLocaleString('en-IN')}
- Total Payable Amount: ₹${result.totalPayableAmount.toLocaleString('en-IN')}
- Tax Impact: Income Tax Section 43B(h) disallowance applies if unpaid within statutory window.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-600 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:underline">Tools</Link>
            <span>/</span>
            <span className="text-slate-500">MSME Samadhan &amp; 45-Day Interest Calculator</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-inner">
              <Calculator className="size-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
                MSME Samadhan &amp; 45-Day Interest Calculator
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Calculate statutory compound interest under MSMED Act Section 16 &amp; check Income Tax Sec 43B(h) disallowance rules.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Calculator Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="size-4 text-teal-600" /> Invoice &amp; Agreement Parameters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Invoice Principal Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={principal}
                    onChange={e => setPrincipal(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono text-base focus:border-teal-500 focus:bg-white focus:outline-none"
                    placeholder="250000"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Buyer Enterprise Classification
                    </label>
                    <select
                      value={buyerType}
                      onChange={e => setBuyerType(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                    >
                      <option value="micro">Micro Enterprise</option>
                      <option value="small">Small Enterprise</option>
                      <option value="medium">Medium Enterprise (Exempt from 45d)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Written Agreement Status
                    </label>
                    <select
                      value={agreementType}
                      onChange={e => setAgreementType(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                    >
                      <option value="with_agreement">With Written Agreement</option>
                      <option value="without_agreement">No Written Agreement (15 Days Max)</option>
                    </select>
                  </div>
                </div>

                {agreementType === 'with_agreement' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Agreed Credit Period (Max 45 Days as per Law)
                    </label>
                    <select
                      value={agreedDays}
                      onChange={e => setAgreedDays(parseInt(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                    >
                      <option value="15">15 Days</option>
                      <option value="30">30 Days</option>
                      <option value="45">45 Days (Statutory Maximum)</option>
                    </select>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={e => setInvoiceDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      RBI Repo Rate (% p.a.)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={repoRate}
                      onChange={e => setRepoRate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 font-mono text-sm focus:border-teal-500 focus:bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Statutory rate is 3x RBI Bank Rate (e.g. {repoRateNum * 3}% p.a. compounded monthly).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Section 43B(h) Warning Box */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <AlertTriangle className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-amber-900">Income Tax Section 43B(h) Compliance Notice</h3>
                  <p className="mt-1 text-xs leading-relaxed text-amber-800">
                    As per Finance Act 2023, any sum payable by a buyer to a micro or small enterprise beyond the 15/45 day limit is <strong>disallowed as a business expense deduction</strong> in computing taxable profits for that financial year, and is taxed as business income in the year of non-payment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-black text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Samadhan Settlement Summary</span>
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[0.7rem] font-bold text-teal-800">
                  Sec 16 Compounded
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Statutory Due Date</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{result.dueDate}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Delayed Days</span>
                  <span className={`font-mono text-sm font-bold ${result.delayDays > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {result.delayDays} Days
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Statutory Interest Rate</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{result.statutoryInterestRate}% p.a. (Monthly)</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-xs text-slate-500">Compound Interest Amount</span>
                  <span className="font-mono text-sm font-bold text-teal-700">₹{result.compoundInterestAmount.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between py-3 bg-teal-50/60 rounded-xl px-4 border border-teal-100">
                  <div>
                    <p className="text-xs font-bold text-teal-900">Total Payable Amount</p>
                    <p className="text-[10px] text-teal-700">Principal + Compound Interest</p>
                  </div>
                  <span className="font-mono text-lg font-black text-teal-950">
                    ₹{result.totalPayableAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? "Copied Calculation Summary!" : "Copy Samadhan Calculation Report"}
                </button>

                <a
                  href="https://samadhan.msme.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  File Case on MSME Samadhan Portal <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AEO/GEO Passage-Chunked FAQ Section */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Frequently Asked Questions on MSME 45-Day Rule &amp; Samadhan Recovery
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What is the 45-Day Payment Rule for MSMEs Under Section 15 of MSMED Act?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Section 15 of the Micro, Small and Medium Enterprises Development (MSMED) Act, 2006 mandates that buyers procuring goods or services from registered micro and small enterprises must make payment within the agreed credit period, which cannot exceed 45 days from the date of acceptance or deemed acceptance. If there is no written agreement, the statutory credit limit defaults strictly to 15 days. Failure to pay within this timeframe triggers penal compound interest at three times the RBI bank rate.
              </p>

              {/* Micro-Table 1 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Enterprise Classification</th>
                      <th className="px-4 py-3 font-bold">Max Credit Period Allowed</th>
                      <th className="px-4 py-3 font-bold">Legal Consequence of Delay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Micro &amp; Small Enterprises</td>
                      <td className="px-4 py-3">Max 45 days (with agreement) / 15 days (without agreement)</td>
                      <td className="px-4 py-3 text-teal-700 font-semibold">3x RBI repo rate monthly compound interest + Sec 43B(h) disallowance</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Medium Enterprises</td>
                      <td className="px-4 py-3">Governed by normal commercial contract terms</td>
                      <td className="px-4 py-3">Standard civil contract remedies (Interest as per agreement)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                How Does Income Tax Section 43B(h) Treat Unpaid MSME Invoices?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Introduced via the Finance Act 2023, Section 43B(h) of the Income Tax Act provides that any sum payable by an enterprise to a micro or small supplier beyond the statutory 15 or 45-day threshold is strictly disallowed as a deduction for computing business profits. The disallowed amount is added back to the buyer&apos;s taxable income for that financial year and taxed accordingly, even if paid in subsequent years.
              </p>

              {/* Micro-Table 2 */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 font-bold">Payment Condition</th>
                      <th className="px-4 py-3 font-bold">Tax Deduction Status</th>
                      <th className="px-4 py-3 font-bold">Fiscal Year Impact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Paid within 15 / 45 days</td>
                      <td className="px-4 py-3 text-emerald-700 font-semibold">Fully Allowed as Business Expense</td>
                      <td className="px-4 py-3">Deductible in year incurred</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-slate-900">Unpaid beyond 15 / 45 days at year-end</td>
                      <td className="px-4 py-3 text-red-600 font-semibold">Disallowed &amp; Added to Taxable Profits</td>
                      <td className="px-4 py-3">Taxed in the current financial year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
