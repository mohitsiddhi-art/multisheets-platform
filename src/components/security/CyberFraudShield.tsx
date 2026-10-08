"use client";

import { useState } from "react";
import { AlertTriangle, ShieldCheck, PhoneCall, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CyberFraudShield() {
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState<null | { risk: string; type: string; color: string }>(null);

  const analyze = () => {
      const lower = msg.toLowerCase();
      if(lower.includes("apk") || lower.includes("bit.ly") || lower.includes("blocked") || lower.match(/\d{10}/)) {
          setResult({ risk: "High Risk Phishing Scam", type: "Urgent Threat", color: "text-red-600 bg-red-50" });
      } else {
          setResult({ risk: "Educational Advice", type: "Low Risk", color: "text-amber-600 bg-amber-50"});
      }
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900">🚨 National Cyber Crime & Financial Fraud Shield</h2>
        <p className="mt-2 text-slate-600">Verify suspicious messages, avoid phishing links, and take immediate action within the 2-hour Golden Window.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white bg-white p-6 shadow-sm">
                <h4 className="font-bold text-lg">Fake SMS Verifier</h4>
                <textarea className="mt-4 w-full rounded-lg border border-slate-200 p-3" rows={4} onChange={(e) => setMsg(e.target.value)} placeholder="Paste suspicious message here..." />
                <button onClick={analyze} className="mt-4 rounded-lg bg-red-600 px-6 py-2.5 font-bold text-white hover:bg-red-700">Instant Analysis</button>
                {result && (
                    <div className={cn("mt-4 rounded-lg p-4 font-semibold", result.color)}>
                        {result.risk} — {result.type}
                    </div>
                )}
            </div>

            <div className="rounded-2xl border border-white bg-white p-6 shadow-sm">
                <h4 className="font-bold text-lg">Emergency Golden Window (1930)</h4>
                <div className="mt-6 flex items-center justify-between gap-4 rounded-lg bg-slate-900 p-4 text-white">
                    <div>
                        <p className="text-sm">National Cyber Crime Helpline</p>
                        <p className="text-3xl font-black">1930</p>
                    </div>
                    <a href="tel:1930" className="rounded-full bg-red-600 p-4 hover:bg-red-700"><PhoneCall className="size-6" /></a>
                </div>
                <div className="mt-6 text-sm">
                    <p className="font-semibold text-slate-700">Official SMS Header Check:</p>
                    <p className="mt-2 text-slate-500">Genuine: <span className="font-mono bg-emerald-50 text-emerald-800">AD-SBIINB</span> | Fraud: <span className="font-mono bg-red-50 text-red-800">+91-9876543210</span></p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
