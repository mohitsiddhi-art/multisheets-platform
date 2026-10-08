"use client";

import { useState, useMemo } from "react";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

type State = 'West Bengal' | 'Maharashtra' | 'Delhi' | 'Tamil Nadu' | 'Gujarat' | 'Karnataka' | 'Uttar Pradesh';

const HOLIDAYS = [
  { date: "2026-01-26", name: "Republic Day", affected: "Everything" },
  { date: "2026-04-01", name: "Annual Closing", affected: "Clearing" },
  { date: "2026-08-15", name: "Independence Day", affected: "Everything" },
  { date: "2026-10-31", name: "Diwali", affected: "Branch & Clearing" },
];

export function BankHolidayCalendar() {
  const [selectedState, setSelectedState] = useState<State>('West Bengal');

  const { isHolidayToday, statusText, statusColor } = useMemo(() => {
    const today = new Date();
    const isWeekend = today.getDay() === 0;

    // Simple 2nd & 4th Sat detector:
    const is2ndOr4thSat = today.getDay() === 6 && (Math.floor((today.getDate() - 1) / 7) + 1) % 2 === 0;

    const isHoliday = isWeekend || is2ndOr4thSat || HOLIDAYS.some(h => h.date === today.toISOString().split('T')[0]);

    return {
      isHolidayToday: isHoliday,
      statusText: isHoliday ? "🔴 Holiday Today" : "🟢 Banks are Open Today",
      statusColor: isHoliday ? "text-red-600 bg-red-50" : "text-emerald-700 bg-emerald-50",
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
        <Calendar className="size-5 text-teal-600" /> Bank Holiday Status
      </h3>
      <div className={`mt-4 rounded-lg p-3 font-bold ${statusColor}`}>
        {statusText}
      </div>

      <select
        className="mt-4 w-full rounded-lg border border-slate-200 p-2 text-sm"
        onChange={(e) => setSelectedState(e.target.value as State)}
      >
        {['West Bengal', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Karnataka', 'Uttar Pradesh'].map(s => <option key={s}>{s}</option>)}
      </select>

      <div className="mt-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Holidays</p>
        <ul className="mt-2 space-y-2">
          {HOLIDAYS.map(h => (
            <li key={h.date} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
              <span className="font-semibold text-slate-700">{h.name}</span>
              <span className="text-xs text-slate-500">{h.affected}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
