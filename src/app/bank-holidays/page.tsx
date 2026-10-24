import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { bankHolidays2026 as holidays } from "@/data/bank-holidays-2026";

export const metadata: Metadata = {
  title: "Bank Holiday Calendar 2026 | MultiSheets",
  description: "Comprehensive list of bank holidays in India for 2026, including national and state-specific holidays.",
};

export default async function BankHolidaysPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-20">
      <nav className="mb-8 flex gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-600">Home</Link> /
        <span className="font-bold text-slate-900">Bank Holidays 2026</span>
      </nav>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-100 sm:p-10">
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Bank Holiday Calendar 2026</h1>
        <p className="mt-4 text-lg text-slate-600">
          Official bank holidays in India for the year 2026. Please check with your local branch for state-specific regional holidays.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="text-xs uppercase bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Day</th>
                <th className="px-6 py-3">Holiday</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{holiday.date}</td>
                  <td className="px-6 py-4">{holiday.day}</td>
                  <td className="px-6 py-4">{holiday.holidayName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
