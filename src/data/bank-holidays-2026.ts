export interface BankHoliday {
  date: string; // ISO date string e.g. "2026-01-26"
  day: string; // e.g. "Monday"
  holidayName: string;
  type: "National" | "Gazetted" | "Regional" | "Negotiable Instruments Act";
  states: string[]; // List of states where applicable, or ["All India"]
  description: string;
}

export const bankHolidays2026: BankHoliday[] = [
  {
    date: "2026-01-26",
    day: "Monday",
    holidayName: "Republic Day",
    type: "National",
    states: ["All India"],
    description: "National holiday commemorating the adoption of the Constitution of India. All banks closed nationwide under the Negotiable Instruments Act."
  },
  {
    date: "2026-02-15",
    day: "Sunday",
    holidayName: "Lui-Ngai-Ni",
    type: "Regional",
    states: ["Manipur"],
    description: "Seed-sowing festival celebrated by the Naga tribes in Manipur. Banks closed across Manipur branches."
  },
  {
    date: "2026-02-19",
    day: "Thursday",
    holidayName: "Chhatrapati Shivaji Maharaj Jayanti",
    type: "Regional",
    states: ["Maharashtra"],
    description: "State holiday in Maharashtra celebrating the birth anniversary of Chhatrapati Shivaji Maharaj. Financial clearing and bank branches closed in Maharashtra."
  },
  {
    date: "2026-03-03",
    day: "Tuesday",
    holidayName: "Holi (Holika Dahan)",
    type: "Gazetted",
    states: ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "Uttarakhand", "Rajasthan"],
    description: "Festival of colors celebration day across Northern and Central India. Banks closed in select states."
  },
  {
    date: "2026-03-04",
    day: "Wednesday",
    holidayName: "Holi / Dhuleti",
    type: "Negotiable Instruments Act",
    states: ["All India (Major Financial Hubs)"],
    description: "Main festival of colors. RBI clearing houses and bank branches closed across major states."
  },
  {
    date: "2026-03-20",
    day: "Friday",
    holidayName: "Jumat-ul-Vida / Id-ul-Fitr (Eid)",
    type: "Negotiable Instruments Act",
    states: ["All India (Varies by Moon Sighting)"],
    description: "Islamic festival marking the end of Ramadan. Regional bank holidays declared based on statutory notifications."
  },
  {
    date: "2026-03-26",
    day: "Thursday",
    holidayName: "Ram Navami",
    type: "Negotiable Instruments Act",
    states: ["Bihar", "Uttar Pradesh", "Madhya Pradesh", "Gujarat", "Chandigarh", "New Delhi"],
    description: "Celebration of Lord Rama's birth. Banks closed in states observing Ram Navami holiday."
  },
  {
    date: "2026-03-31",
    day: "Tuesday",
    holidayName: "Annual Bank Closing / Mahavir Jayanti",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Mandatory annual bank closing day for RBI and commercial bank financial accounts reconciliation, combined with Mahavir Jayanti."
  },
  {
    date: "2026-04-03",
    day: "Friday",
    holidayName: "Good Friday",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Christian holiday commemorating the crucifixion of Jesus Christ. Nationwide bank and RBI clearing holiday."
  },
  {
    date: "2026-04-14",
    day: "Tuesday",
    holidayName: "Dr. B.R. Ambedkar Jayanti / Tamil New Year / Bihu",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Birth anniversary of Dr. B.R. Ambedkar and regional harvest/new year festivals (Bihu, Vishu, Vaisakhi). Nationwide bank holiday."
  },
  {
    date: "2026-05-01",
    day: "Friday",
    holidayName: "May Day / Maharashtra Day / Labour Day",
    type: "Negotiable Instruments Act",
    states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Kerala", "West Bengal", "Telangana"],
    description: "International Workers' Day and foundation day for Maharashtra and Gujarat. Banks closed in industrial states."
  },
  {
    date: "2026-05-27",
    day: "Wednesday",
    holidayName: "Bakrid / Id-ul-Zuha",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Festival of Sacrifice. Statutory bank holiday under the Negotiable Instruments Act."
  },
  {
    date: "2026-06-26",
    day: "Friday",
    holidayName: "Muharram",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Islamic New Year / Day of Ashura. Bank holiday across India."
  },
  {
    date: "2026-08-15",
    day: "Saturday",
    holidayName: "Independence Day",
    type: "National",
    states: ["All India"],
    description: "National holiday commemorating India's independence. All bank branches and RBI clearing operations suspended nationwide."
  },
  {
    date: "2026-08-28",
    day: "Friday",
    holidayName: "Milad-un-Nabi (Prophet Mohammad's Birthday)",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Birthday of Prophet Muhammad. Nationwide bank holiday."
  },
  {
    date: "2026-09-04",
    day: "Friday",
    holidayName: "Janmashtami",
    type: "Negotiable Instruments Act",
    states: ["Uttar Pradesh", "Maharashtra", "Gujarat", "Bihar", "New Delhi"],
    description: "Celebration of Lord Krishna's birth. Banks closed in major financial centers."
  },
  {
    date: "2026-10-02",
    day: "Friday",
    holidayName: "Gandhi Jayanti",
    type: "National",
    states: ["All India"],
    description: "National holiday honoring Mahatma Gandhi's birthday. Nationwide bank holiday."
  },
  {
    date: "2026-10-20",
    day: "Tuesday",
    holidayName: "Dussehra (Maha Saptami / Vijayadashami)",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Victory of good over evil. Nationwide bank holiday under NI Act."
  },
  {
    date: "2026-11-08",
    day: "Sunday",
    holidayName: "Diwali (Deepavali) / Laxmi Puja",
    type: "Negotiable Instruments Act",
    states: ["All India"],
    description: "Festival of lights. Though falling on Sunday, special Muhurat trading and statutory holiday observance where applicable."
  },
  {
    date: "2026-11-09",
    day: "Monday",
    holidayName: "Govardhan Puja / Diwali Holiday",
    type: "Negotiable Instruments Act",
    states: ["Maharashtra", "Uttar Pradesh", "Gujarat", "Karnataka", "Delhi"],
    description: "Post-Diwali holiday. Banks closed across major northern and western states."
  },
  {
    date: "2026-11-24",
    day: "Tuesday",
    holidayName: "Guru Nanak Jayanti",
    type: "Negotiable Instruments Act",
    states: ["Punjab", "Haryana", "Delhi", "Madhya Pradesh", "Uttarakhand"],
    description: "Birth anniversary of Guru Nanak Dev Ji. Bank holiday in Punjab, Haryana, and northern commercial centers."
  },
  {
    date: "2026-12-25",
    day: "Friday",
    holidayName: "Christmas Day",
    type: "National",
    states: ["All India"],
    description: "Christian celebration of the birth of Jesus Christ. Nationwide bank holiday and financial market closure."
  }
];

export function getHolidaysByState(stateQuery: string) {
  if (!stateQuery || stateQuery.toLowerCase() === "all india") {
    return bankHolidays2026;
  }
  return bankHolidays2026.filter(
    (h) => h.states.includes("All India") || h.states.some((s) => s.toLowerCase().includes(stateQuery.toLowerCase()))
  );
}
