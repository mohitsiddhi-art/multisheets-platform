"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const HINDI_NUMBERS: Record<number, string> = {
  0: "शून्य", 1: "एक", 2: "दो", 3: "तीन", 4: "चार", 5: "पाँच", 6: "छः", 7: "सात", 8: "आठ", 9: "नौ", 10: "दस",
  11: "ग्यारह", 12: "बारह", 13: "तेरह", 14: "चौदह", 15: "पंद्रह", 16: "सोलह", 17: "सत्रह", 18: "अठारह", 19: "उन्नीस",
  20: "बीस", 21: "इक्कीस", 22: "बाईस", 23: "तेईस", 24: "चौबीस", 25: "पच्चीस", 26: "छब्बीस", 27: "सत्ताइस", 28: "अट्ठाईस", 29: "उनतीस",
  30: "तीस", 31: "इकतीस", 32: "बत्तीस", 33: "तैंतीस", 34: "चौंतीस", 35: "पैंतीस", 36: "छत्तीस", 37: "सैंतीस", 38: "अड़तीस", 39: "उनतालीस",
  40: "चालीस", 41: "इकतालीस", 42: "बयालीस", 43: "तैंतालीस", 44: "चवालीस", 45: "पैंतालीस", 46: "छियालीस", 47: "सैंतालीस", 48: "अड़तालीस", 49: "उनचास",
  50: "पचास", 51: "इक्यावन", 52: "बावन", 53: "तिरपन", 54: "चौवन", 55: "पचपन", 56: "छप्पन", 57: "सत्तावन", 58: "अठावन", 59: "उनसठ",
  60: "साठ", 61: "इकसठ", 62: "बासठ", 63: "तिरसठ", 64: "चौंसठ", 65: "पैंसठ", 66: "छियासठ", 67: "सड़सठ", 68: "अड़सठ", 69: "उनहत्तर",
  70: "सत्तर", 71: "इकहत्तर", 72: "बहत्तर", 73: "तिहत्तर", 74: "चौहत्तर", 75: "पचहत्तर", 76: "छिहत्तर", 77: "सतहत्तर", 78: "अठहत्तर", 79: "उन्यासी",
  80: "अस्सी", 81: "इक्यासी", 82: "बयासी", 83: "तिरासी", 84: "चौरासी", 85: "पचासी", 86: "छियासी", 87: "सत्तासी", 88: "अठासी", 89: "नवासी",
  90: "नब्बे", 91: "इक्यानवे", 92: "बानवे", 93: "तिरानवे", 94: "चौरानवे", 95: "पंचानवे", 96: "छियानवे", 97: "सत्तानवे", 98: "अट्टानवे", 99: "निन्यानवे"
};

const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const converter = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + converter(n % 100) : '');
    if (n < 100000) return converter(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + converter(n % 1000) : '');
    if (n < 10000000) return converter(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + converter(n % 100000) : '');
    return converter(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + converter(n % 10000000) : '');
  };
  return converter(num).trim() + " Only";
};

const numberToHindiWords = (num: number): string => {
  if (num === 0) return "शून्य";
  const converter = (n: number): string => {
    if (n < 100) return HINDI_NUMBERS[n];
    if (n < 1000) return HINDI_NUMBERS[Math.floor(n/100)] + " सौ" + (n%100 !== 0 ? " " + converter(n%100) : "");
    if (n < 100000) return converter(Math.floor(n/1000)) + " हज़ार" + (n%1000 !== 0 ? " " + converter(n%1000) : "");
    if (n < 10000000) return converter(Math.floor(n/100000)) + " लाख" + (n%100000 !== 0 ? " " + converter(n%100000) : "");
    return converter(Math.floor(n/10000000)) + " करोड़" + (n%10000000 !== 0 ? " " + converter(n%10000000) : "");
  };
  return converter(num) + " रुपये मात्र";
};

export function ChequeAmountConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [showHindi, setShowHindi] = useState(false);
  const [copied, setCopied] = useState(false);
  const formattedAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0, }).format(amount);
  const englishWords = amount > 0 ? `Rupees ${numberToWords(amount)}` : "";
  const hindiWords = amount > 0 ? numberToHindiWords(amount) : "";
  const handleCopy = () => {
    const textToCopy = showHindi ? hindiWords : englishWords;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const chips = [5000, 25000, 50000, 100000, 500000];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900">Cheque Amount Converter</h3>
      <div className="mt-4">
        <label className="text-sm text-slate-500">Amount (₹)</label>
        <input type="number" value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-200 p-3 text-2xl font-bold" placeholder="0" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map(chip => (
          <button key={chip} onClick={() => setAmount(chip)} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold hover:bg-teal-100 hover:text-teal-900">₹{new Intl.NumberFormat('en-IN').format(chip)}</button>
        ))}
      </div>
      <div className="mt-6 min-h-[60px] rounded-xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-700">{showHindi ? hindiWords : englishWords}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={handleCopy} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy Words"}
        </button>
        <button onClick={() => setShowHindi(!showHindi)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">
          {showHindi ? "English" : "Hindi"}
        </button>
      </div>
      <div className="mt-6 border-t border-slate-100 pt-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Visual Cheque Preview</p>
        <div className="mt-2 h-24 rounded border border-dashed border-slate-300 p-3 text-[10px]">
          <p>Amount: {formattedAmount}</p>
          <p className="mt-1 font-mono italic">{showHindi ? hindiWords : englishWords}</p>
          <p className="mt-4 text-right font-bold text-slate-400">A/C PAYEE ONLY</p>
        </div>
      </div>
    </div>
  );
}
