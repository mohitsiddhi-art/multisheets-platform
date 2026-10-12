"use client";

import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Loader2, MapPin, Search, X, Download, Copy, Check } from "lucide-react";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  type: "pincode" | "ifsc";
  code: string;
  url: string;
  [key: string]: any;
}

// Replace this temporary dataset with the production directory index in Phase 2.
const SAMPLE_DIRECTORY_DATA: SearchItem[] = [
  {
    id: "p1",
    title: "700001 — Kolkata G.O.",
    subtitle: "Kolkata, West Bengal",
    type: "pincode",
    code: "700001",
    url: "/pincode/700001",
  },
  {
    id: "p2",
    title: "700007 — Burrabazar",
    subtitle: "Kolkata, West Bengal (Loha Patty)",
    type: "pincode",
    code: "700007",
    url: "/pincode/700007",
  },
  {
    id: "p3",
    title: "110001 — Connaught Place",
    subtitle: "New Delhi, Delhi",
    type: "pincode",
    code: "110001",
    url: "/pincode/110001",
  },
  {
    id: "p4",
    title: "400001 — Mumbai G.P.O.",
    subtitle: "Mumbai, Maharashtra",
    type: "pincode",
    code: "400001",
    url: "/pincode/400001",
  },
  {
    id: "i1",
    title: "SBIN0000001 — State Bank of India",
    subtitle: "Main Branch, Kolkata",
    type: "ifsc",
    code: "SBIN0000001",
    url: "/ifsc/SBIN0000001",
  },
  {
    id: "i2",
    title: "HDFC0000014 — HDFC Bank",
    subtitle: "Burrabazar Branch, Kolkata",
    type: "ifsc",
    code: "HDFC0000014",
    url: "/ifsc/HDFC0000014",
  },
  {
    id: "i3",
    title: "ICIC0000007 — ICICI Bank",
    subtitle: "Chowringhee, Kolkata",
    type: "ifsc",
    code: "ICIC0000007",
    url: "/ifsc/ICIC0000007",
  },
  {
    id: "i4",
    title: "PUNB0001200 — Punjab National Bank",
    subtitle: "Bada Bazar, Kolkata",
    type: "ifsc",
    code: "PUNB0001200",
    url: "/ifsc/PUNB0001200",
  },
];

const DEBOUNCE_DELAY_MS = 200;

function findMatches(query: string) {
  const normalizedQuery = query.toLowerCase().trim();

  return SAMPLE_DIRECTORY_DATA.filter((item) =>
    [item.code, item.title, item.subtitle].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}

export function WorkingSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    setQuery(nextQuery);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (nextQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(() => {
      setResults(findMatches(nextQuery));
      setIsOpen(true);
      setIsLoading(false);
    }, DEBOUNCE_DELAY_MS);
  }

  function clearSearch() {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setQuery("");
    setResults([]);
    setIsOpen(false);
    setIsLoading(false);
  }

  function handleSelect(url: string) {
    clearSearch();
    router.push(url);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();
      handleSelect(results[0].url);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const exportData = () => {
    return results.map(r => ({
      ...r,
    }));
  };

  const downloadCSV = () => {
    const headers = ["Title", "Subtitle", "Type", "Code"];
    const rows = results.map(r => [r.title, r.subtitle, r.type, r.code]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'search_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const textContent = results.map(r => `${r.title} (${r.type}) - ${r.code}`).join('\n');
    navigator.clipboard.writeText(textContent).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div ref={searchRef} className="relative mx-auto mt-10 w-full max-w-2xl">
      <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-200 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500">
        <div className="pl-5 text-slate-400" aria-hidden="true">
          {isLoading ? (
            <Loader2 className="size-5 animate-spin text-sky-500" />
          ) : (
            <Search className="size-5" />
          )}
        </div>
        <input
          id="directory-search"
          type="search"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Enter Pincode (e.g. 700001) or IFSC Code (e.g. SBIN0000001)..."
          aria-label="Search by Pincode, IFSC code, branch, or location"
          aria-autocomplete="list"
          aria-controls="directory-search-results"
          autoComplete="off"
          className="w-full rounded-2xl bg-transparent py-4 pl-3 pr-10 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="mr-3 rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Clear search"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          id="directory-search-results"
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          {results.length > 0 ? (
            <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
              {results.map((item) => {
                const Icon = item.type === "pincode" ? MapPin : Building2;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={false}
                    aria-label={`Open ${item.title}`}
                    onClick={() => handleSelect(item.url)}
                    className="group flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`rounded-xl p-2.5 ${
                          item.type === "pincode"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-sky-50 text-sky-600"
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800 transition-colors group-hover:text-sky-600">
                          {item.title}
                        </span>
                        <span className="block text-xs text-slate-500">{item.subtitle}</span>
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-slate-600">
                        {item.type}
                      </span>
                      <ArrowRight className="size-4 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-sky-500" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
              <div className="p-3 bg-slate-50 flex items-center justify-end gap-2 border-t">
                  <button onClick={downloadCSV} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium py-1.5 px-3 rounded-lg flex items-center gap-1.5">
                    <Download className="size-3.5"/> Download CSV
                  </button>
                  <button onClick={copyToClipboard} className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium py-1.5 px-3 rounded-lg flex items-center gap-1.5">
                    {copied ? <Check className="size-3.5"/> : <Copy className="size-3.5"/>} {copied ? "Copied" : "Copy All"}
                  </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500">
              No directory found for &quot;<span className="font-semibold text-slate-700">{query}</span>&quot;.
              <p className="mt-1 text-xs text-slate-400">
                Try a Pincode such as 700007 or IFSC code such as HDFC0000014.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
