"use client";

import { useState } from "react";
import { Link2, Smartphone, Copy, Check } from "lucide-react";

interface Bank {
  name: string;
  portalUrl: string;
  smsNumber: string;
  smsFormat: string;
}

const BANKS: Bank[] = [
  {
    name: "State Bank of India (SBI)",
    portalUrl: "https://www.onlinesbi.sbi/",
    smsNumber: "+917208933145",
    smsFormat: "CPPS <Cheque_No> <Cheque_Date_DDMMYYYY> <Amount> <Payee_Name>"
  },
  {
    name: "HDFC Bank",
    portalUrl: "https://netbanking.hdfcbank.com/netbanking/",
    smsNumber: "5676712",
    smsFormat: "HDFCPPS <Cheque_No> <Cheque_Date_DDMMYYYY> <Amount> <Payee_Name>"
  },
  {
    name: "ICICI Bank",
    portalUrl: "https://infinity.icicibank.com/",
    smsNumber: "9215676766",
    smsFormat: "PPS <Account_No> <Cheque_No> <Cheque_Date_DDMMYYYY> <Amount> <Payee_Name>"
  },
  {
    name: "Punjab National Bank (PNB)",
    portalUrl: "https://netpnb.com/",
    smsNumber: "9264092640",
    smsFormat: "PPS <Cheque_No> <Cheque_Date> <Amount> <Account_No>"
  },
  {
    name: "Bank of Baroda",
    portalUrl: "https://www.bankofbaroda.in/",
    smsNumber: "8422009988",
    smsFormat: "CPPS <Account_No> <Cheque_No> <Cheque_Date_DDMMYYYY> <Amount>"
  },
];

export function PositivePayHelper() {
  const [selectedBank, setSelectedBank] = useState<Bank>(BANKS[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `SMS '${selectedBank.smsFormat}' to ${selectedBank.smsNumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">Positive Pay System Helper</h3>
      <select
        className="mt-4 w-full rounded-lg border border-slate-200 p-3"
        onChange={(e) => setSelectedBank(BANKS.find(b => b.name === e.target.value)!)}
      >
        {BANKS.map(bank => <option key={bank.name}>{bank.name}</option>)}
      </select>

      <div className="mt-6">
        <a
            href={selectedBank.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-semibold"
        >
          <Link2 className="size-4" /> Visit Official Bank PPS Portal
        </a>

        <div className="mt-4 rounded-lg bg-teal-50 p-3 text-sm text-teal-900">
            <p className="font-bold flex items-center">
                <Smartphone className="inline size-4 mr-2" />
                SMS Details:
            </p>
            <p className="text-xs break-all mt-1 font-mono">{selectedBank.smsFormat}</p>
            <p className="text-xs font-bold mt-1">To: {selectedBank.smsNumber}</p>
            <button
                onClick={handleCopy}
                className="mt-2 flex items-center gap-1 rounded bg-teal-100 px-2 py-1 text-[10px] font-bold text-teal-800 hover:bg-teal-200"
            >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied" : "Copy SMS Format"}
            </button>
        </div>
      </div>

      <div className="mt-6 text-sm font-semibold text-slate-700 border-t border-slate-100 pt-4">
        <p>Mandatory Fields Checklist:</p>
        <ul className="mt-2 space-y-1 text-slate-500 font-normal">
          {[ 'Cheque Date', '6-digit Cheque No', 'Payee Name', 'Amount', 'Account Number'].map(f => <li key={f}>• {f}</li>)}
        </ul>
      </div>
    </div>
  );
}
