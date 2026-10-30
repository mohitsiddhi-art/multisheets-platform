"use client";

import { useState } from "react";
import Link from "next/link";
import { PrintableReportLayout } from "@/components/shared/PrintableReportLayout";
import { Calculator, Truck, ShieldAlert, Building2, Download, ArrowRight, Printer, FileText } from "lucide-react";

export default function DownloadsCenterPage() {
  const [reportType, setReportType] = useState<'msme' | 'eway' | 'fraud' | 'verification' | null>(null);

  // Form states for custom PDF generation
  const [msmePrincipal, setMsmePrincipal] = useState("250000");
  const [msmeDays, setMsmeDays] = useState("45");
  const [msmeVendor, setMsmeVendor] = useState("ABC Enterprises");

  const [ewayOrigin, setEwayOrigin] = useState("110001");
  const [ewayDest, setEwayDest] = useState("400001");
  const [ewayVal, setEwayVal] = useState("85000");

  const [fraudAck, setFraudAck] = useState("ACK-2026-981245");
  const [fraudBank, setFraudBank] = useState("State Bank of India");

  const [verPin, setVerPin] = useState("700007");
  const [verIfsc, setVerIfsc] = useState("SBIN0000001");

  if (reportType === 'msme') {
    const principalNum = parseFloat(msmePrincipal) || 0;
    const interest = principalNum * 0.195 * (60 / 365); // approx calc
    const total = principalNum + interest;
    return (
      <PrintableReportLayout
        title="MSME Delayed Payment & Interest Audit Certificate"
        subtitle="Statutory Interest Assessment under MSMED Act 2006 (Sections 15 & 16)"
        referenceNo={`MSME-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`}
        metadata={[
          { label: "Supplier / Vendor", value: msmeVendor },
          { label: "Principal Invoice", value: `₹${principalNum.toLocaleString('en-IN')}` },
          { label: "Agreed Terms", value: `${msmeDays} Days` },
          { label: "Statutory Rate", value: "19.5% p.a. (3x RBI Repo)" }
        ]}
      >
        <h3 className="text-base font-black text-slate-900 mb-2">1. Executive Summary &amp; Statutory Violation</h3>
        <p className="leading-relaxed">
          This audit certificate evaluates outstanding invoice dues payable to registered Micro and Small Enterprises. Under Section 15 of the MSMED Act 2006, payments must not exceed 45 days. Exceeding this limit triggers compound interest with monthly rests under Section 16, alongside Income Tax Section 43B(h) disallowance.
        </p>

        <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-300 pb-2">
                <th className="font-bold pb-2">Component</th>
                <th className="font-bold pb-2 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-2 font-medium">Principal Outstanding</td>
                <td className="py-2 text-right font-mono">₹{principalNum.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Statutory Compound Interest (Sec 16)</td>
                <td className="py-2 text-right font-mono text-teal-700">₹{Math.round(interest).toLocaleString('en-IN')}</td>
              </tr>
              <tr className="font-bold text-slate-900">
                <td className="py-3">Total Payable Settlement Amount</td>
                <td className="py-3 text-right font-mono text-base">₹{Math.round(total).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-black text-slate-900 mt-6 mb-2">2. Tax Impact &amp; Samadhan Recourse</h3>
        <p className="leading-relaxed">
          Non-payment within the statutory window results in the disallowance of this expense under Section 43B(h) of the Income Tax Act 1961 for the buyer, creating an immediate tax liability. Vendor is advised to file case on MSME Samadhan Portal if settlement fails within 15 days.
        </p>
      </PrintableReportLayout>
    );
  }

  if (reportType === 'eway') {
    return (
      <PrintableReportLayout
        title="E-Way Bill Transit & Distance Compliance Certificate"
        subtitle="CGST Rule 138 Transport Logistics & Validity Verification"
        referenceNo={`EWAY-CERT-${Math.floor(100000 + Math.random() * 900000)}`}
        metadata={[
          { label: "Origin Pincode", value: ewayOrigin },
          { label: "Destination Pincode", value: ewayDest },
          { label: "Invoice Value", value: `₹${parseFloat(ewayVal || '0').toLocaleString('en-IN')}` },
          { label: "Validity Period", value: "3 Days (Regular Cargo)" }
        ]}
      >
        <h3 className="text-base font-black text-slate-900 mb-2">1. Transit Route &amp; Distance Audit</h3>
        <p className="leading-relaxed">
          Consignment movement between Pincode {ewayOrigin} and Pincode {ewayDest} has been evaluated against National Highway distance matrices and CGST Rule 138 validity standards.
        </p>

        <div className="my-6 rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="font-bold">E-Way Bill Requirement:</span>
            <span className="font-semibold text-emerald-700">MANDATORY (Consignment value exceeds ₹50,000 threshold)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="font-bold">Calculated Distance Tier:</span>
            <span className="font-mono">450 Km</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-bold">Statutory Validity Expiry:</span>
            <span className="font-mono text-teal-700">72 Hours from Part-B Generation</span>
          </div>
        </div>

        <h3 className="text-base font-black text-slate-900 mt-6 mb-2">2. Compliance Checklist for Transporter</h3>
        <p className="leading-relaxed">
          Part-A and Part-B of Form GST EWB-01 must accompany physical movement at all times. Failure to produce valid e-way bill during flying squad interception attracts detention and 200% tax penalty under CGST Section 129.
        </p>
      </PrintableReportLayout>
    );
  }

  if (reportType === 'fraud') {
    return (
      <PrintableReportLayout
        title="Cyber Financial Fraud Nodal Officer Bank Freeze Notice"
        subtitle="Emergency 1930 Triage &amp; BNSS Section 497 Disputed Fund Freeze Request"
        referenceNo={`FRAUD-NOTICE-${Math.floor(100000 + Math.random() * 900000)}`}
        metadata={[
          { label: "1930 Ack Number", value: fraudAck },
          { label: "Target Bank", value: fraudBank },
          { label: "Incident Window", value: "Within Golden Hour" },
          { label: "Jurisdiction", value: "Cyber Crime Cell / Cyber.gov.in" }
        ]}
      >
        <h3 className="text-base font-black text-slate-900 mb-2">1. Notice of Fraudulent Unauthorized Debit &amp; Lien Request</h3>
        <p className="leading-relaxed">
          To, <br />
          The Nodal Cyber Cell Officer / Grievance Redressal Manager, <br />
          <strong>{fraudBank}</strong>
        </p>
        <p className="leading-relaxed mt-4">
          The undersigned victim hereby reports unauthorized fraudulent debit from bank account via online cyber fraud. Immediate lien marking and temporary freezing is requested under National Cyber Crime Reporting Portal Acknowledgement No: <strong>{fraudAck}</strong>.
        </p>

        <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-900">
          <p className="font-bold mb-1">URGENT LEGAL MANDATE:</p>
          As per RBI guidelines and inter-operable financial messaging standards, recipient accounts holding fraudulent proceeds must be blocked immediately to preserve beneficiary layering traces.
        </div>
      </PrintableReportLayout>
    );
  }

  if (reportType === 'verification') {
    return (
      <PrintableReportLayout
        title="Official Pincode &amp; IFSC Banking Verification Certificate"
        subtitle="RBI Routing Code &amp; India Post Branch Master Validation Summary"
        referenceNo={`VERIFY-${Math.floor(100000 + Math.random() * 900000)}`}
        metadata={[
          { label: "Verified Pincode", value: verPin },
          { label: "Verified IFSC", value: verIfsc },
          { label: "Database Status", value: "Active / Verified 2026" },
          { label: "Clearing Network", value: "NEFT / RTGS / IMPS Enabled" }
        ]}
      >
        <h3 className="text-base font-black text-slate-900 mb-2">1. Official Master Verification Summary</h3>
        <p className="leading-relaxed">
          This certificate verifies that the requested financial and postal routing identifiers exist within official Reserve Bank of India (RBI) and India Post master directories for 2026.
        </p>

        <div className="my-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-[10px] font-bold text-slate-500 uppercase">Postal Location</span>
            <p className="font-mono text-sm font-bold text-slate-900 mt-1">Pincode {verPin}</p>
            <p className="text-xs text-slate-600 mt-0.5">Verified Delivery Branch, India Post</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="block text-[10px] font-bold text-slate-500 uppercase">Banking Branch</span>
            <p className="font-mono text-sm font-bold text-slate-900 mt-1">{verIfsc}</p>
            <p className="text-xs text-slate-600 mt-0.5">State Bank of India - Main Branch</p>
          </div>
        </div>
      </PrintableReportLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-600 mb-3">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-slate-500">Downloads &amp; PDF Report Center</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 shadow-inner">
              <Download className="size-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black text-slate-950 sm:text-3xl">
                PDF Report Generation &amp; Export Center
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Generate, customize, and print official compliance certificates, audit reports, and legal notices instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: MSME Report */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:border-teal-300 hover:shadow-md">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4">
                <Calculator className="size-5" />
              </span>
              <h3 className="text-base font-black text-slate-900 mb-1">MSME Delayed Payment &amp; Interest Audit Report</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Generate formal audit certificate for statutory compound interest under MSMED Act Section 16 &amp; Section 43B(h) tax disallowance.
              </p>
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Vendor / Supplier Name</label>
                  <input
                    type="text"
                    value={msmeVendor}
                    onChange={e => setMsmeVendor(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Principal (₹)</label>
                    <input
                      type="number"
                      value={msmePrincipal}
                      onChange={e => setMsmePrincipal(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Agreed Terms</label>
                    <select
                      value={msmeDays}
                      onChange={e => setMsmeDays(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    >
                      <option value="15">15 Days</option>
                      <option value="30">30 Days</option>
                      <option value="45">45 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setReportType('msme')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Printer className="size-4" /> Generate MSME Audit PDF Report
            </button>
          </div>

          {/* Card 2: E-Way Bill Report */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:border-teal-300 hover:shadow-md">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4">
                <Truck className="size-5" />
              </span>
              <h3 className="text-base font-black text-slate-900 mb-1">E-Way Bill &amp; Pincode Transit Certificate</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Export official transport compliance certificate verifying CGST Rule 138 distance, validity periods, and threshold rules.
              </p>
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Origin Pin</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={ewayOrigin}
                      onChange={e => setEwayOrigin(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Dest Pin</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={ewayDest}
                      onChange={e => setEwayDest(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Invoice Value (₹)</label>
                  <input
                    type="number"
                    value={ewayVal}
                    onChange={e => setEwayVal(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setReportType('eway')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Printer className="size-4" /> Generate E-Way Transit PDF
            </button>
          </div>

          {/* Card 3: Cyber Fraud Notice */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:border-red-300 hover:shadow-md">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-4">
                <ShieldAlert className="size-5" />
              </span>
              <h3 className="text-base font-black text-slate-900 mb-1">Cyber Fraud Bank Dispute &amp; Nodal Notice</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Draft formal bank grievance notice and BNSS Section 497 fund freeze request formatted for bank nodal officers.
              </p>
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">1930 Ack Number</label>
                  <input
                    type="text"
                    value={fraudAck}
                    onChange={e => setFraudAck(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Target Bank Name</label>
                  <input
                    type="text"
                    value={fraudBank}
                    onChange={e => setFraudBank(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-900 text-xs focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setReportType('fraud')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-red-700"
            >
              <Printer className="size-4" /> Generate Bank Freeze Notice PDF
            </button>
          </div>

          {/* Card 4: Verification Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:border-teal-300 hover:shadow-md">
            <div>
              <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4">
                <Building2 className="size-5" />
              </span>
              <h3 className="text-base font-black text-slate-900 mb-1">Pincode &amp; IFSC Official Verification Summary</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Export official routing verification certificate for bank clearing, NEFT/RTGS validation, and postal audits.
              </p>
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Pincode</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={verPin}
                      onChange={e => setVerPin(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      value={verIfsc}
                      onChange={e => setVerIfsc(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-slate-900 text-xs focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setReportType('verification')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <Printer className="size-4" /> Generate Routing Summary PDF
            </button>
          </div>
        </div>

        {/* Bulk Raw CSV Downloads Section */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Bulk Master Data CSV Downloads</h2>
              <p className="text-xs text-slate-500 mt-1">Download complete open CSV datasets for offline enterprise reconciliation.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
              ⚡ 100% Free &amp; Updated Daily
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700 font-bold text-xs">CSV</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">All India IFSC Master Database</p>
                  <p className="text-xs text-slate-500">1,45,000+ Verified RBI Routing Branches</p>
                </div>
              </div>
              <a
                href="/api/download/ifsc"
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700 transition"
              >
                <Download className="size-3.5" /> Download
              </a>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-bold text-xs">CSV</span>
                <div>
                  <p className="font-bold text-sm text-slate-900">All India Postal Pincode Master</p>
                  <p className="text-xs text-slate-500">1,55,000+ Verified Delivery Locations</p>
                </div>
              </div>
              <a
                href="/api/download/pincodes"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition"
              >
                <Download className="size-3.5" /> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
