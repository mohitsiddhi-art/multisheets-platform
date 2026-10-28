"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  PhoneCall,
  Lock,
  Clock,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  Copy,
  Check,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import {
  NATIONAL_HELPLINES,
  BANK_EMERGENCY_DIRECTORY,
  RBI_LIABILITY_MATRIX,
  SCAM_PLAYBOOKS,
  BankEmergencyInfo,
} from "@/data/cyber-fraud-helplines";

export default function CyberFraudRecoveryPage() {
  const [activeTab, setActiveTab] = useState<"wizard" | "banks" | "checklist" | "generator">("wizard");

  // Wizard State
  const [fraudTime, setFraudTime] = useState<string>("golden");
  const [fraudType, setFraudType] = useState<string>("upi");
  const [coerced, setCoerced] = useState<string>("coerced");
  const [wizardResult, setWizardResult] = useState<{
    tier: string;
    probability: string;
    liability: string;
    steps: string[];
  }>({ tier: "", probability: "", liability: "", steps: [] });

  // Bank Search State
  const [bankSearch, setBankSearch] = useState("");
  const [copiedSms, setCopiedSms] = useState<string | null>(null);

  // Checklist State (LocalStorage)
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
  });

  // Generator State
  const [victimName, setVictimName] = useState("");
  const [bankNameGen, setBankNameGen] = useState("");
  const [last4, setLast4] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [amount, setAmount] = useState("");
  const [utr, setUtr] = useState("");
  const [ack1930, setAck1930] = useState("");
  const [incidentType, setIncidentType] = useState("Unauthorized UPI / Online Fraud");
  const [copiedLetter, setCopiedLetter] = useState<string | null>(null);

  useEffect(() => {
    // Load checklist
    try {
      const saved = localStorage.getItem("multisheets_fraud_checklist_v1");
      if (saved) {
        setChecklist(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const updateChecklist = (key: string) => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    try {
      localStorage.setItem("multisheets_fraud_checklist_v1", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const calculateWizard = () => {
    let tier = "Priority 1: Golden Hour Emergency Response";
    let probability = "85% - 95% Recovery Probability (Funds likely trapped in 1st/2nd layer mule account)";
    let liability = "Zero Liability (₹0) under RBI Master Directions if reported within 3 working days.";
    let steps = [
      "Dial 1930 immediately and report the transaction UTR to block funds on CFCFRMS portal.",
      "Call your bank's 24x7 emergency helpline to hotlist cards and disable NetBanking/UPI.",
      "Log onto cybercrime.gov.in and lodge your formal cyber financial fraud complaint.",
    ];

    if (fraudTime === "24hours") {
      tier = "Priority 2: Same-Day Lien Request";
      probability = "60% - 75% Recovery (Funds may be moving to 3rd layer wallets)";
      liability = "Zero to Limited Liability depending on exact reporting timestamp.";
      steps = [
        "Ensure 1930 ticket and NCRP acknowledgement number are generated.",
        "Submit written dispute letter to home branch Nodal Officer with 1930 acknowledgement copy.",
        "Request Bank Nodal Officer to issue inter-bank hold notice to beneficiary bank.",
      ];
    } else if (fraudTime === "days" || fraudTime === "week" || fraudTime === "older") {
      tier = "Priority 3: Formal Legal & BNSS Court Petition";
      probability = "35% - 50% Recovery (Requires Court Superdari / BNSS 497 Release Order)";
      liability = "Subject to individual bank board policy and reporting delay.";
      steps = [
        "Obtain certified bank account statement showing fraudulent debit.",
        "Follow up with Investigating Officer (IO) at local Cyber Police Station for lien confirmation.",
        "File application under Section 497/503 BNSS (CrPC 457) before Magistrate for release of frozen funds.",
      ];
    }

    if (coerced === "coerced") {
      liability = "Limited Liability (₹5,000 to ₹25,000) or Bank Board Policy due to voluntary OTP/credential sharing.";
    }

    setWizardResult({ tier, probability, liability, steps });
  };

  useEffect(() => {
    calculateWizard();
  }, [fraudTime, fraudType, coerced]);

  const filteredBanks = BANK_EMERGENCY_DIRECTORY.filter(b =>
    b.bankName.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.slug.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSms(id);
    setTimeout(() => setCopiedSms(null), 2000);
  };

  const letter1 = `To,
The Branch Manager / Nodal Officer,
${bankNameGen || "[Bank Name]"}
Home Branch / Cyber Cell Division, India.

Subject: Urgent Dispute, Lien Request & Shadow Credit Claim under RBI Guidelines (Ref: UTR ${utr || "[UTR / Transaction ID]"} / ₹${amount || "[Amount]"} / 1930 Ack: ${ack1930 || "[NCRP Ack]"})

Respected Sir/Madam,

I, ${victimName || "[Victim Name]"}, hold a savings bank account bearing number ending in [${last4 || "XXXX"}] with your esteemed branch. I am writing to formally report an unauthorized financial fraudulent transaction that occurred on ${dateTime || "[Date & Time]"}.

Incident Details:
1. Disputed Amount: ₹${amount || "[Amount]"}
2. UTR / RRN / Transaction ID: ${utr || "[UTR Number]"}
3. 1930 National Cyber Helpline Ticket / NCRP Acknowledgement: ${ack1930 || "[NCRP Ack Number]"}
4. Incident Description: ${incidentType}

As per Reserve Bank of India (RBI) Master Directions on Customer Protection (DBR.No.Leg.BC.78/09.07.005/2017-18), since this unauthorized electronic banking transaction has been reported within the statutory window and is attributable to a third-party breach/fraudulent vector without my contributory negligence, I am entitled to Zero / Limited Liability and a mandatory Shadow Credit reversal within T+10 working days.

Prayers & Urgent Action Required:
1. Immediately place a total lien/hold on the beneficiary account where funds were routed using UTR ${utr}.
2. Issue an electronic freeze instruction to the beneficiary bank via the CFCFRMS gateway.
3. Credit the disputed amount of ₹${amount} into my account as a shadow credit pending final inquiry.
4. Issue an official incident report and statement copy for my legal records.

Thanking you,

Yours faithfully,
${victimName || "[Your Signature & Name]"}
Registered Mobile: [Your Phone Number]
Date: ${new Date().toLocaleDateString("en-IN")}`;

  const letter2 = `To,
The Station House Officer (SHO) / Investigating Officer (IO),
Cyber Crime Police Station,
[City / District State], India.

Subject: Application for Confirmation of Amount Freeze & Subsequent Release Petition under Section 497 / 503 of Bharatiya Nagarik Suraksha Sanhita (BNSS) / CrPC 457 (Ref: 1930 NCRP Ack No: ${ack1930 || "[NCRP Ack]"} / UTR: ${utr || "[UTR]"})

Respected Sir/Madam,

I, ${victimName || "[Victim Name]"}, resident of [Your Address], am the victim of a cyber financial fraud committed on ${dateTime || "[Date]"} wherein an illegal transfer of ₹${amount || "[Amount]"} was executed from my account (Bank: ${bankNameGen || "[Bank]"}, A/c Ending: ${last4 || "XXXX"}) via UTR ${utr || "[UTR Number]"}.

Immediate Steps Taken:
1. Dialed 1930 and lodged complaint (Ack No: ${ack1930 || "[NCRP Ack]"}).
2. Notified bank and blocked compromised credentials.
3. Filed formal complaint on cybercrime.gov.in.

Current Status & Prayer:
The fraudulent transfer landed in a mule account. I request your kind office to:
1. Confirm that a lien / hold has been successfully placed on the recipient mule account by communicating with the beneficiary bank Nodal Officer.
2. Issue a formal No Objection Certificate (NOC) / Release Directive to the bank for refunding the seized amount of ₹${amount} back to my source account.
3. In the event of dispute by account holder, facilitate a court release order petition under Section 497 / 503 BNSS (formerly Section 457 CrPC) before the jurisdictional Magistrate.

Thanking you for your prompt action and protection.

Yours faithfully,
${victimName || "[Your Name]"}
Contact No: [Your Phone]
Date: ${new Date().toLocaleDateString("en-IN")}`;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16">
      {/* Header Banner */}
      <div className="mb-10 rounded-2xl border border-red-200 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <ShieldAlert className="size-4 animate-pulse text-yellow-300" /> Emergency Response &amp; Recovery Desk
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Cyber Fraud Emergency &amp; Money Recovery Tool
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-red-100 sm:text-base">
              Immediate action center for victims of online financial fraud, UPI scams, APK malware, and unauthorized banking debits. Execute the Golden Hour triage, freeze funds, and generate bank dispute letters.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-xl bg-white/10 p-5 backdrop-blur-md border border-white/20">
            <p className="text-xs font-bold uppercase tracking-wider text-yellow-300">National 24x7 Helpline</p>
            <a
              href={`tel:${NATIONAL_HELPLINES.cyberHelpLine}`}
              className="inline-flex items-center gap-3 text-3xl font-black tracking-wider text-white hover:underline"
            >
              <PhoneCall className="size-8 text-yellow-300 animate-bounce" />
              {NATIONAL_HELPLINES.cyberHelpLine}
            </a>
            <p className="text-[11px] text-red-200">Free toll-free dial for instant CFCFRMS fund freeze.</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab("wizard")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition shadow-sm ${
            activeTab === "wizard"
              ? "bg-red-600 text-white shadow-red-600/20"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Clock className="size-4" /> 1. Golden Hour Triage Wizard
        </button>
        <button
          onClick={() => setActiveTab("banks")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition shadow-sm ${
            activeTab === "banks"
              ? "bg-red-600 text-white shadow-red-600/20"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Building2 className="size-4" /> 2. Instant Bank Freeze Directory
        </button>
        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition shadow-sm ${
            activeTab === "checklist"
              ? "bg-red-600 text-white shadow-red-600/20"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <CheckCircle2 className="size-4" /> 3. Recovery Action Checklist
        </button>
        <button
          onClick={() => setActiveTab("generator")}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition shadow-sm ${
            activeTab === "generator"
              ? "bg-red-600 text-white shadow-red-600/20"
              : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <FileText className="size-4" /> 4. Bank Dispute &amp; Lien Letter Generator
        </button>
      </div>

      {/* TAB 1: WIZARD */}
      {activeTab === "wizard" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock className="size-5 text-red-600" /> Step 1: Tell Us What Happened
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Answer 3 quick questions to calculate your recovery window and RBI liability status.
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  When did the fraudulent transaction occur?
                </label>
                <select
                  value={fraudTime}
                  onChange={(e) => setFraudTime(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                >
                  <option value="golden">&lt; 2 Hours Ago [Golden Hour - Highest Recovery Chance]</option>
                  <option value="24hours">2 to 24 Hours Ago [Same-Day Lien Window]</option>
                  <option value="days">1 to 3 Days Ago [Urgent Bank Escalation]</option>
                  <option value="week">4 to 7 Days Ago [Legal Dispute &amp; NCRP Window]</option>
                  <option value="older">&gt; 7 Days Ago [Requires Court BNSS 497 Petition]</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  How was the money lost?
                </label>
                <select
                  value={fraudType}
                  onChange={(e) => setFraudType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                >
                  <option value="upi">UPI Collect / QR Code / Fake Payment Request</option>
                  <option value="apk">NetBanking Phishing / Screen-Sharing APK Malware</option>
                  <option value="investment">Fake Investment / Telegram Task / Part-Time Scam</option>
                  <option value="extortion">Digital Arrest / Fake CBI, Customs &amp; Police Extortion</option>
                  <option value="card">Unauthorized Credit / Debit Card Swipe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Did you share an OTP, PIN, or install an unknown remote app?
                </label>
                <select
                  value={coerced}
                  onChange={(e) => setCoerced(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                >
                  <option value="no">No — Completely Unauthorized Breach (Zero Liability)</option>
                  <option value="coerced">Yes — Tricked, Coerced or Shared OTP / APK</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wizard Output Card */}
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                <AlertTriangle className="size-4" /> Action Strategy &amp; Assessment
              </div>

              <h3 className="mt-4 text-lg font-black text-slate-900">{wizardResult.tier}</h3>
              <p className="mt-2 text-sm font-bold text-red-700">{wizardResult.probability}</p>
              <p className="mt-2 text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <strong>RBI Liability Status:</strong> {wizardResult.liability}
              </p>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Immediate Execution Steps</h4>
                <ul className="space-y-2.5">
                  {wizardResult.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-5">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-red-200 flex items-center justify-between">
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-red-700"
              >
                File on cybercrime.gov.in <ExternalLink className="size-3.5" />
              </a>
              <button
                onClick={() => setActiveTab("generator")}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-5 py-3 text-xs font-bold text-red-700 transition hover:bg-red-50"
              >
                Generate Dispute Letter <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANKS DIRECTORY */}
      {activeTab === "banks" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="size-5 text-red-600" /> Bank Emergency Fraud Block Directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Instantly find 24x7 fraud helplines and SMS block formats for all 15 major Indian banks.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3.5 size-4 text-slate-400" />
              <input
                type="text"
                value={bankSearch}
                onChange={(e) => setBankSearch(e.target.value)}
                placeholder="Search bank name..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBanks.map((bank) => (
              <div key={bank.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-slate-900">{bank.bankName}</h3>
                    <Link
                      href="/ifsc"
                      className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1"
                    >
                      IFSC <ArrowRight className="size-3" />
                    </Link>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Toll-Free Fraud Numbers</p>
                      <div className="flex flex-wrap gap-2">
                        {bank.tollFreeFraudNumbers.map((num, i) => (
                          <a
                            key={i}
                            href={`tel:${num}`}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200 hover:bg-red-100"
                          >
                            <PhoneCall className="size-3" /> {num}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">SMS Block Format</p>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-xs font-mono text-slate-800 border border-slate-200">
                        <span className="truncate">{bank.smsBlockFormat}</span>
                        <button
                          onClick={() => handleCopyText(bank.smsBlockFormat, bank.slug)}
                          className="text-slate-500 hover:text-slate-900 p-1"
                          title="Copy SMS format"
                        >
                          {copiedSms === bank.slug ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600">
                      <strong>Instant Block:</strong> {bank.missedCallOrUpiBlockInfo}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={bank.fraudReportPortal}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center gap-1"
                  >
                    Official Portal <ExternalLink className="size-3" />
                  </a>
                  <a
                    href={`tel:${bank.tollFreeFraudNumbers[0]}`}
                    className="rounded-xl bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-red-700"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CHECKLIST */}
      {activeTab === "checklist" && (
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-6 mb-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="size-6 text-emerald-600" /> Interactive Recovery Action Checklist
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Complete each step sequentially to ensure watertight documentation for bank dispute resolution and police recovery. Your progress is saved automatically in your browser.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { id: "item1", label: "1. Block Card / UPI / NetBanking via Bank Emergency Helpline", desc: "Immediately hotlist compromised debit/credit cards and disable digital banking access." },
              { id: "item2", label: "2. Dial 1930 and obtain 14-digit NCRP Acknowledgement Number", desc: "Critical for activating the CFCFRMS automated inter-bank hold gateway." },
              { id: "item3", label: "3. Save 12-digit UTR / RRN / Bank Transaction Reference Number", desc: "Retrieve transaction reference from SMS alert, UPI app, or bank passbook." },
              { id: "item4", label: "4. Capture full screenshot of fraudster phone number, UPI ID, or chat", desc: "Evidence of scammer handle, Telegram username, or phishing link." },
              { id: "item5", label: "5. Download PDF Bank Statement showing fraudulent debit entry", desc: "Required for bank grievance submission and police station verification." },
              { id: "item6", label: "6. File detailed complaint with attachments on cybercrime.gov.in", desc: "Convert your 1930 ticket into a formal National Cyber Crime Report." },
              { id: "item7", label: "7. Submit written dispute letter + 1930 Ack copy to Home Bank Branch & Nodal Officer", desc: "Mandatory under RBI DBR circular to trigger T+10 shadow credit." },
              { id: "item8", label: "8. Follow up with Investigating Officer (IO) for Lien Confirmation & BNSS Release", desc: "Secure police NOC or Magistrate court order under Section 497/503 BNSS for refund." },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => updateChecklist(item.id)}
                className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all ${
                  checklist[item.id]
                    ? "border-emerald-200 bg-emerald-50/60 text-slate-800"
                    : "border-slate-200 bg-white hover:border-slate-300 text-slate-900"
                }`}
              >
                <div className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border ${
                  checklist[item.id] ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 bg-white"
                }`}>
                  {checklist[item.id] && <Check className="size-4" />}
                </div>
                <div>
                  <p className={`font-bold text-sm ${checklist[item.id] ? "line-through text-emerald-900" : "text-slate-900"}`}>
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-xs font-bold text-slate-600">
              Completed: {Object.values(checklist).filter(Boolean).length} of 8 steps
            </span>
            <button
              onClick={() => {
                const cleared = { item1: false, item2: false, item3: false, item4: false, item5: false, item6: false, item7: false, item8: false };
                setChecklist(cleared);
                localStorage.removeItem("multisheets_fraud_checklist_v1");
              }}
              className="text-xs font-semibold text-slate-500 hover:text-red-600"
            >
              Reset Checklist
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GENERATOR */}
      {activeTab === "generator" && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                <Lock className="size-3" /> 100% Client-Side Privacy
              </div>
              <h2 className="mt-2 text-lg font-bold text-slate-900">Dispute &amp; Letter Inputs</h2>
              <p className="text-xs text-slate-500">Your information never leaves your browser.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Victim Full Name</label>
              <input
                type="text"
                value={victimName}
                onChange={(e) => setVictimName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={bankNameGen}
                onChange={(e) => setBankNameGen(e.target.value)}
                placeholder="e.g. State Bank of India"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">A/c or Card Last 4</label>
                <input
                  type="text"
                  value={last4}
                  onChange={(e) => setLast4(e.target.value)}
                  placeholder="4321"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Fraud Amount (₹)</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="25000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Date &amp; Time of Fraud</label>
              <input
                type="text"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="28 Oct 2026, 14:30 IST"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">UTR / Transaction ID (12-Digit)</label>
              <input
                type="text"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="430291049281"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">1930 NCRP Acknowledgement No.</label>
              <input
                type="text"
                value={ack1930}
                onChange={(e) => setAck1930(e.target.value)}
                placeholder="328260001928"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Incident Category</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
              >
                <option value="Unauthorized UPI Collect Scam">Unauthorized UPI Collect Scam</option>
                <option value="Screen-Sharing APK Malware Theft">Screen-Sharing APK Malware Theft</option>
                <option value="Fake Telegram Investment Task Scam">Fake Telegram Investment Task Scam</option>
                <option value="Digital Arrest Extortion Fraud">Digital Arrest Extortion Fraud</option>
              </select>
            </div>
          </div>

          {/* Generated Letters Output */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7 space-y-8">
            {/* Template 1 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Template 1: Bank Nodal Officer Dispute &amp; Shadow Credit Letter</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(letter1);
                      setCopiedLetter("t1");
                      setTimeout(() => setCopiedLetter(null), 2000);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {copiedLetter === "t1" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />} Copy
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-red-700"
                  >
                    <Printer className="size-3.5" /> Print / PDF
                  </button>
                </div>
              </div>
              <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700 leading-relaxed">
                {letter1}
              </pre>
            </div>

            {/* Template 2 */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-900">Template 2: Cyber Police Station / BNSS Section 497 Release Petition</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(letter2);
                    setCopiedLetter("t2");
                    setTimeout(() => setCopiedLetter(null), 2000);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  {copiedLetter === "t2" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />} Copy Petition
                </button>
              </div>
              <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-700 leading-relaxed">
                {letter2}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* AEO / GEO Passage-Chunked FAQ & Micro-Tables */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Cyber Fraud Recovery &amp; RBI Rules FAQ</h2>
          <p className="mt-2 text-sm text-slate-600">
            Authoritative answers on financial fraud recovery, NCRP protocols, and statutory liability limits under Indian banking law.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900 text-sm">How does dialing 1930 instantly freeze money?</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Dialing 1930 feeds the transaction details into the CFCFRMS (Citizen Financial Cyber Fraud Reporting and Management System). This automatically transmits electronic freeze notices to banks, payment aggregators, and wallets holding the funds in layer-1 and layer-2 mule accounts, preventing ATM withdrawals.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-bold text-slate-900 text-sm">What is the BNSS Section 497 process for getting money back?</h3>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Once police freeze scammer funds, the money remains under judicial hold (Lien). To transfer frozen funds back to your account, you must file a Superdari / Release petition under Section 497/503 of Bharatiya Nagarik Suraksha Sanhita (BNSS) before the jurisdictional Magistrate and serve the court order to the bank Nodal Officer.
            </p>
          </div>
        </div>

        {/* Micro-table */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 font-bold text-slate-700">
                <th className="p-3">Recovery Stage</th>
                <th className="p-3">Responsible Authority</th>
                <th className="p-3">Action Required by Victim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-3 font-semibold">1. Instant Hold (Golden Hour)</td>
                <td className="p-3">National Cyber Crime Helpline (1930) / CFCFRMS</td>
                <td className="p-3">Dial 1930 within 2 hours, provide UTR and bank account details.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">2. NCRP Complaint &amp; Branch Notice</td>
                <td className="p-3">Home Bank Nodal Officer &amp; Cyber Cell</td>
                <td className="p-3">Submit written dispute letter with 1930 acknowledgment within 3 days.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">3. Court Superdari Release</td>
                <td className="p-3">Jurisdictional Magistrate (BNSS Sec 497)</td>
                <td className="p-3">File release petition through lawyer or guidance of Cyber IO.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <Link
            href="/guides/cyber-fraud-money-recovery-guide"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:underline"
          >
            Read Comprehensive Cyber Fraud Money Recovery Guide <ArrowRight className="size-4" />
          </Link>
          <div className="flex gap-3">
            <Link
              href="/tools/pps-cheque"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cheque PPS Tool
            </Link>
            <Link
              href="/ifsc"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              IFSC Directory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
