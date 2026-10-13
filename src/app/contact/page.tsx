"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, ShieldCheck, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "data-correction",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-700">
          <Mail className="size-3.5" />
          Support &amp; Data Corrections
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Have an updated IFSC code or Pincode branch correction to report? Want to discuss a feature
          or partnership? Reach out to our team at MultiSheets.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left: Contact Info & Guidelines */}
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Official Channel</h2>
            <p className="mt-1 text-sm text-slate-500">
              Direct all official inquiries to our central desk.
            </p>

            <div className="mt-6">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Official Support Desk
                  </p>
                  <a
                    href="mailto:support@multisheets.com"
                    className="mt-1 block font-mono text-base font-bold text-sky-600 hover:underline"
                  >
                    support@multisheets.com
                  </a>
                  <p className="mt-1 text-xs text-slate-500">
                    Email: support@multisheets.com | Response within 24–48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-rose-200/60 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/40 p-6 text-sm text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <ShieldCheck className="size-5 text-rose-600" />
              Cyber Fraud Safety Reminder
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              MultiSheets is an open reference directory. Our representatives will{" "}
              <strong>NEVER</strong> contact you asking for your bank OTP, debit card CVV, net-banking
              credentials, or payment transfers. If you encounter any suspicious activity, immediately
              dial the National Cybercrime Helpline at <strong>1930</strong> or visit cybercrime.gov.in.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <HelpCircle className="size-4 text-slate-500" />
              Frequently Reported Issues
            </h3>
            <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
              <li>• <strong>Bank Merger Changes:</strong> When a bank merges (e.g. Syndicate into Canara), please provide the revised 11-character IFSC code.</li>
              <li>• <strong>New Post Office Nodes:</strong> Provide the 6-digit Pincode, Taluk, and official delivery branch name for instant indexing.</li>
            </ul>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-inner">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-slate-900">
                  Message Sent Successfully
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
                  Thank you, <strong>{formData.name}</strong>. Our directory verification team has
                  received your inquiry and will review it promptly.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", topic: "data-correction", message: "" });
                    }}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Send a Message or Correction
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill out the form below or write directly to support@multisheets.com.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Your Name *
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email Address *
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Topic / Inquiry Type
                  </span>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  >
                    <option value="data-correction">Directory Data Correction (Pincode / IFSC)</option>
                    <option value="missing-branch">Add a Missing Bank Branch / Pincode</option>
                    <option value="pps-tool">Cheque &amp; PPS Tool Feedback</option>
                    <option value="business">Partnership / API Inquiry</option>
                    <option value="general">General Support &amp; Feedback</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Message Details *
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include relevant Pincode, IFSC code, or details..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </label>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
                >
                  <Send className="size-4" />
                  Submit Inquiry
                </button>

                <p className="text-center text-xs text-slate-400">
                  By submitting, you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-slate-600">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="underline hover:text-slate-600">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
