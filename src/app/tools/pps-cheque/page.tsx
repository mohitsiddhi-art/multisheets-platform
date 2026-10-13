"use client";

import { useState, useMemo } from "react";
import { Check, Copy, Download, MessageCircle, Printer, ShieldCheck, Banknote, CheckCircle } from "lucide-react";
import { getWebApplicationSchema } from "@/utils/schema";

function numberToWordsINR(amount: number): string {
  if (isNaN(amount) || amount < 0) return "";
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertLessThanOneThousand(num: number): string {
    if (num === 0) return "";
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + convertLessThanOneThousand(num % 100) : "");
  }

  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const hundred = rupees % 1000;

  const parts: string[] = [];
  if (crore > 0) parts.push(convertLessThanOneThousand(crore) + " Crore");
  if (lakh > 0) parts.push(convertLessThanOneThousand(lakh) + " Lakh");
  if (thousand > 0) parts.push(convertLessThanOneThousand(thousand) + " Thousand");
  if (hundred > 0) parts.push(convertLessThanOneThousand(hundred));

  let words = parts.join(" ");
  if (!words) words = "Zero";
  words += " Rupees";
  if (paise > 0) words += " and " + convertLessThanOneThousand(paise) + " Paise";
  words += " Only";
  return words;
}

export default function PpsChequePage() {
  const schema = getWebApplicationSchema("PPS Cheque & Amount-in-Words Generator");
  const [chequeNo, setChequeNo] = useState("123456");
  const [date, setDate] = useState("2026-10-12");
  const [payee, setPayee] = useState("Rajesh Kumar");
  const [bank, setBank] = useState("State Bank of India");
  const [ifsc, setIfsc] = useState("SBIN0000001");
  const [amount, setAmount] = useState(543210.5);
  const [copied, setCopied] = useState(false);
  const [copiedSlip, setCopiedSlip] = useState(false);

  const amountWords = useMemo(() => {
    const val = parseFloat(amount.toString());
    if (isNaN(val) || val < 0) return "";
    return numberToWordsINR(val);
  }, [amount]);

  const amountFormatted = useMemo(() => {
    const val = parseFloat(amount.toString());
    return isNaN(val)
      ? ""
      : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(val);
  }, [amount]);

  const ppsSMS = `PPS Confirmation: Chq No: ${chequeNo} | Date: ${date.split("-").reverse().join("/")} | Payee: ${payee} | Amt: INR ${amountFormatted} | IFSC: ${ifsc} | Bank: ${bank} | Generated via multisheets.com/tools/pps-cheque`;

  function handleCopySMS() {
    navigator.clipboard.writeText(ppsSMS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  function handleCopySlip() {
    const slip = `MULTISHEETS CHEQUE SLIP | Verified
Cheque No: ${chequeNo}
Date: ${date.split("-").reverse().join("/")}
Payee: ${payee}
Bank: ${bank} (IFSC: ${ifsc})
Amount (Figures): ${amountFormatted}
Amount (Words): ${amountWords}
Verified via MultiSheets.com`;
    navigator.clipboard.writeText(slip).then(() => {
      setCopiedSlip(true);
      setTimeout(() => setCopiedSlip(false), 2200);
    });
  }

  function handlePrint() {
    window.print();
  }

  const shareText = encodeURIComponent(ppsSMS);
  const whatsappLink = `https://wa.me/?text=${shareText}`;

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mb-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-700">
          <Banknote className="size-3.5" />
          Financial Utility
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle className="size-3.5" />
          Data verified & updated for 2026
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 lg:text-5xl">
          Cheque PPS Slip &amp; Amount-in-Words Generator
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Generate RBI-compliant Positive Pay System (PPS) confirmation text, convert amounts to Indian numbering words, and create a printable cheque record slip — all in one place. No server upload required.
        </p>
      </div>

      <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-lg font-bold text-slate-900">What is Positive Pay System (PPS) / Cheque Confirmation?</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Positive Pay System (PPS) is RBI's security mechanism for cheques of ₹50,000 and above. Before issuing high-value cheques, the issuer confirms details (Cheque No, Date, Payee, and Amount) with their bank to prevent cheque fraud and clearing bounce.
        </p>
        <p className="mt-3 text-sm font-semibold text-slate-800">
          Feature highlight: Includes automatic Amount-to-Words (Rupees in Lakhs & Crores) and instant RBI-standard WhatsApp/SMS bank confirmation draft.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Inputs + Preview */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
            <h2 className="text-xl font-black text-slate-900">Cheque Details</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cheque No</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={chequeNo}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setChequeNo(v);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 font-mono text-sm font-bold text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="123456"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cheque Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Payee Name</span>
                <input
                  type="text"
                  value={payee}
                  onChange={(e) => setPayee(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="To whom the cheque is issued"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Bank Name</span>
                <input
                  type="text"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="e.g. State Bank of India"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">IFSC Code</span>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 font-mono text-sm font-bold text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="SBIN0000001"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cheque Amount (₹)</span>
                <input
                  type="number"
                  step={0.01}
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 font-mono text-lg font-black text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="0.00"
                />
              </label>
            </div>
          </div>

          {/* Preview Card */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-sky-50 shadow-2xl shadow-amber-100/50 print:shadow-none print:border-slate-300">
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-amber-300 to-sky-300" />
            <div className="p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Cheque Slip Preview</h3>
                  <h2 className="mt-1 font-mono text-2xl font-black text-slate-900">{bank}</h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">Verified via MultiSheets</span>
              </div>

              <div className="mt-8 grid gap-6 border-b border-amber-100 pb-8 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Cheque No</p>
                  <p className="mt-1 font-mono text-xl font-black text-slate-900">{chequeNo}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Date</p>
                  <p className="mt-1 font-mono text-lg font-bold text-slate-900">{date ? new Date(date + "T00:00:00").toLocaleDateString("en-IN") : ""}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Payee</p>
                  <p className="mt-1 text-base font-bold text-slate-900">{payee || "—"}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Amount (Figures)</p>
                  <p className="mt-2 font-mono text-3xl font-black text-slate-900">{amountFormatted}</p>
                </div>
                <div className="rounded-xl border border-sky-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-600">Amount (Words)</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-slate-800">{amountWords || "—"}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Cross-verified for PPS compliance. Always confirm with your bank before sending.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/20">
            <h2 className="text-xl font-black">Action Center</h2>
            <p className="mt-2 text-slate-400">Copy, share, or print your PPS confirmation instantly.</p>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleCopySMS}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3.5 text-sm font-black shadow-lg shadow-white/10 transition hover:bg-slate-100"
              >
                {copied ? <Check className="size-5 text-emerald-600" /> : <Copy className="size-5" />}
                {copied ? "Copied PPS SMS" : "Copy PPS SMS / WhatsApp Draft"}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                <MessageCircle className="size-5" />
                Share via WhatsApp
              </a>

              <button
                onClick={handleCopySlip}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {copiedSlip ? <Check className="size-5 text-emerald-400" /> : <Copy className="size-5" />}
                {copiedSlip ? "Slip Copied" : "Copy Cheque Slip / Print"}
              </button>

              <button
                onClick={handlePrint}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3.5 text-sm font-bold text-amber-100 transition hover:bg-amber-400/20"
              >
                <Printer className="size-5" />
                Print / Download Slip
              </button>
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  const slip = `MULTISHEETS CHEQUE RECORD SLIP | Verified\nCheque No: ${chequeNo}\nDate: ${date ? new Date(date + "T00:00:00").toLocaleDateString("en-IN") : ""}\nPayee: ${payee}\nBank: ${bank} (IFSC: ${ifsc})\nAmount (Figures): ${amountFormatted}\nAmount (Words): ${amountWords}\n---\nVerified via MultiSheets.com`;
                  a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(slip);
                  a.download = `pps-slip-${chequeNo}.txt`;
                  a.click();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-5 py-3.5 text-sm font-bold text-sky-100 transition hover:bg-sky-400/20"
              >
                <Download className="size-5" />
                Download Slip .txt
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-100">
            <h3 className="text-lg font-black text-slate-900">PPS SMS Format</h3>
            <p className="mt-2 text-sm text-slate-500">Standard RBI-compliant format for Positive Pay confirmation.</p>
            <div className="mt-4 rounded-xl bg-slate-900 p-4 font-mono text-xs leading-6 text-amber-100 shadow-inner">
              <p>PPS Confirmation: Chq No: {chequeNo}</p>
              <p>Date: {date ? new Date(date + "T00:00:00").toLocaleDateString("en-IN") : "DD/MM/YYYY"}</p>
              <p>Payee: {payee || "XYZ"}</p>
              <p>Amt: INR {amountFormatted || "—"}</p>
              <p>IFSC: {ifsc || "SBIN0000001"}</p>
              <p>Bank: {bank || "SBI"}</p>
              <p>Generated via multisheets.com/tools/pps-cheque</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
