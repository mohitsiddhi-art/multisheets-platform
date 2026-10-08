"use client";

import { BankHolidayCalendar } from "../holidays/BankHolidayCalendar";
import { TradeHubGuide } from "../commercial/TradeHubGuide";
import { PostalTriviaQuiz } from "../gamification/PostalTriviaQuiz";

export function EngagementSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-slate-900">Community & Engagement</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <BankHolidayCalendar />
          <TradeHubGuide />
          <PostalTriviaQuiz />
        </div>
      </div>
    </section>
  );
}
