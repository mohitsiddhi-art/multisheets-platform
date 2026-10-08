"use client";

import { useState } from "react";
import { HelpCircle, Trophy } from "lucide-react";

const QUESTIONS = [
  { q: "What does the 1st digit in Indian Pincodes represent?", a: "Region (Zone)", options: ["State", "District", "Region (Zone)", "Post Office"] },
  { q: "In which year was the Pincode system introduced in India?", a: "1972", options: ["1947", "1960", "1972", "1980"] },
  { q: "What does the 5th character '0' in every IFSC code represent?", a: "Reserved for future use", options: ["Zero", "Reserved for future use", "State code", "Bank code"] },
];

export function PostalTriviaQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (ans: string) => {
    if (ans === QUESTIONS[current].a) setScore(s => s + 1);
    if (current < QUESTIONS.length - 1) setCurrent(c => c + 1);
    else setFinished(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
        <HelpCircle className="size-5 text-teal-600" /> Daily Postal Trivia
      </h3>

      {!finished ? (
        <div className="mt-4">
          <p className="font-semibold text-slate-700">{QUESTIONS[current].q}</p>
          <div className="mt-4 space-y-2">
            {QUESTIONS[current].options.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} className="w-full text-left p-2 rounded border border-slate-200 text-sm hover:bg-teal-50">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center p-6 bg-teal-50 rounded-xl">
          <Trophy className="size-10 text-teal-600 mx-auto" />
          <p className="mt-2 font-bold text-lg">Score: {score}/{QUESTIONS.length}</p>
          <p className="text-sm">Great job!</p>
        </div>
      )}
    </div>
  );
}
