"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type DirectoryKind = "pincode" | "ifsc";

interface DirectoryResult {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  type: DirectoryKind;
  url: string;
}

const DIRECTORY_INDEX: DirectoryResult[] = [
  {
    id: "pincode-700007",
    code: "700007",
    title: "Burrabazar / Loha Patty",
    subtitle: "Kolkata, West Bengal",
    type: "pincode",
    url: "/pincode/700007",
  },
  {
    id: "pincode-700001",
    code: "700001",
    title: "Kolkata G.P.O.",
    subtitle: "Kolkata, West Bengal",
    type: "pincode",
    url: "/pincode/700001",
  },
  {
    id: "pincode-110001",
    code: "110001",
    title: "Connaught Place",
    subtitle: "New Delhi, Delhi",
    type: "pincode",
    url: "/pincode/110001",
  },
  {
    id: "pincode-400001",
    code: "400001",
    title: "Mumbai G.P.O.",
    subtitle: "Mumbai, Maharashtra",
    type: "pincode",
    url: "/pincode/400001",
  },
  {
    id: "ifsc-sbin0000001",
    code: "SBIN0000001",
    title: "State Bank of India",
    subtitle: "Kolkata Main Branch, West Bengal",
    type: "ifsc",
    url: "/ifsc/SBIN0000001",
  },
  {
    id: "ifsc-hdfc0000014",
    code: "HDFC0000014",
    title: "HDFC Bank",
    subtitle: "Burrabazar Branch, Kolkata",
    type: "ifsc",
    url: "/ifsc/HDFC0000014",
  },
  {
    id: "ifsc-icic0000007",
    code: "ICIC0000007",
    title: "ICICI Bank",
    subtitle: "Chowringhee Branch, Kolkata",
    type: "ifsc",
    url: "/ifsc/ICIC0000007",
  },
];

const TRENDING_SEARCHES = [
  { label: "700007 (Burrabazar)", query: "700007" },
  { label: "SBIN0000001 (Kolkata Main)", query: "SBIN0000001" },
  { label: "110001 (Connaught Place)", query: "110001" },
  { label: "HDFC0000014", query: "HDFC0000014" },
];

const SEARCH_DEBOUNCE_MS = 200;

function searchDirectory(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  return DIRECTORY_INDEX.filter((entry) =>
    [entry.code, entry.title, entry.subtitle].some((field) =>
      field.toLowerCase().includes(normalizedQuery),
    ),
  );
}

function highlightMatch(text: string, query: string): ReactNode {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return text;

  const lowerText = text.toLowerCase();
  const matchStart = lowerText.indexOf(normalizedQuery.toLowerCase());
  if (matchStart === -1) return text;

  const matchEnd = matchStart + normalizedQuery.length;

  return (
    <>
      {text.slice(0, matchStart)}
      <mark className="rounded bg-sky-100 px-0.5 font-bold text-sky-800">
        {text.slice(matchStart, matchEnd)}
      </mark>
      {text.slice(matchEnd)}
    </>
  );
}

function VisualCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [0, -10, 0] }
      }
      transition={
        reduceMotion
          ? { duration: 0.35, delay }
          : {
              opacity: { duration: 0.35, delay },
              y: { duration: 5.5, delay, ease: "easeInOut", repeat: Infinity },
            }
      }
      whileHover={reduceMotion ? undefined : { y: -14, scale: 1.02 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroWith3D() {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DirectoryResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-300, 300], [7, -7]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-400, 400], [-8, 8]), {
    stiffness: 160,
    damping: 22,
  });

  const activeType = useMemo(() => {
    const normalizedQuery = query.trim().toUpperCase();
    if (/^\d{6}$/.test(normalizedQuery)) return "PINCODE";
    if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(normalizedQuery)) return "IFSC";
    return "DIRECTORY";
  }, [query]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveResultIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) return;

    const timeoutId = window.setTimeout(() => {
      setResults(searchDirectory(normalizedQuery));
      setIsOpen(true);
      setIsSearching(false);
      setActiveResultIndex(-1);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  function clearSearch() {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setIsSearching(false);
    setActiveResultIndex(-1);
  }

  async function selectResult(result: DirectoryResult) {
    clearSearch();
    router.push(result.url);
  }

  async function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    setActiveResultIndex(-1);

    if (nextQuery.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    // Real search connection
    const searchRes = await fetch(`/api/search?q=${encodeURIComponent(nextQuery)}`)
      .then((res) => res.json())
      .then((data) =>
        data.map((item: any) => ({
          id: item.type === "pincode" ? `pincode-${item.code}` : `ifsc-${item.code}`,
          code: item.code,
          title: item.title,
          subtitle: item.subtitle,
          type: item.type,
          url: item.url,
        }))
      )
      .catch(() => []);
    setResults(searchRes);
    setIsSearching(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveResultIndex(-1);
      return;
    }

    if (!isOpen || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveResultIndex((currentIndex) =>
        currentIndex >= results.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveResultIndex((currentIndex) =>
        currentIndex <= 0 ? results.length - 1 : currentIndex - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      selectResult(results[activeResultIndex >= 0 ? activeResultIndex : 0]);
    }
  }

  function applyTrendingQuery(nextQuery: string) {
    setQuery(nextQuery);
    setResults(searchDirectory(nextQuery));
    setIsSearching(false);
    setIsOpen(true);
    setActiveResultIndex(-1);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - (bounds.left + bounds.width / 2));
    pointerY.set(event.clientY - (bounds.top + bounds.height / 2));
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#0B0F19] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_83%_14%,rgba(14,165,233,0.28),transparent_28%),radial-gradient(circle_at_18%_76%,rgba(45,212,191,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="mx-auto grid min-h-[calc(100vh-4.5rem)] w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-28">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-bold text-emerald-100 shadow-lg shadow-emerald-950/20"
          >
            <span className="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]" />
            <span>🟢 Banks Operating Today • 19,300+ Verified Postal Nodes Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.08 }}
            className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            India&apos;s Unified Industrial{" "}
            <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Postal &amp; Financial Gateway
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl"
          >
            Instant search across 19,000+ Indian pincodes and 1,45,000+ bank IFSC branches with sub-second verified accuracy.
          </motion.p>

          <div ref={searchContainerRef} className="relative mt-10 max-w-2xl">
            <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-white/10 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-400/70">
              <Search className="ml-3 size-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                placeholder="Enter Pincode, IFSC, bank, or locality…"
                aria-label="Search Pincode, IFSC code, bank, or locality"
                aria-autocomplete="list"
                aria-controls="directory-results"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent px-2 py-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  aria-label="Clear search"
                >
                  <X className="size-5" />
                </button>
              )}
              <span className="hidden rounded-xl bg-slate-100 px-3 py-2 text-[0.65rem] font-black tracking-wider text-slate-500 sm:inline-flex">
                {isSearching ? "SEARCHING" : activeType}
              </span>
            </div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id="directory-results"
                  role="listbox"
                  initial={{ opacity: 0, y: -8, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.985 }}
                  transition={{ duration: 0.16 }}
                  className="absolute inset-x-0 z-30 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl"
                >
                  {results.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto py-2">
                      {results.map((result, index) => {
                        const Icon = result.type === "pincode" ? MapPin : Building2;
                        const searchableText = `${result.code} — ${result.title}`;

                        return (
                          <button
                            key={result.id}
                            type="button"
                            role="option"
                            aria-selected={activeResultIndex === index}
                            onMouseEnter={() => setActiveResultIndex(index)}
                            onClick={() => selectResult(result)}
                            className={cn(
                              "flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors focus:outline-none",
                              activeResultIndex === index ? "bg-sky-50" : "hover:bg-slate-50",
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span
                                className={cn(
                                  "rounded-xl p-2.5",
                                  result.type === "pincode"
                                    ? "bg-amber-50 text-amber-600"
                                    : "bg-sky-50 text-sky-600",
                                )}
                              >
                                <Icon className="size-5" aria-hidden="true" />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-bold text-slate-800">
                                  {highlightMatch(searchableText, query)}
                                </span>
                                <span className="block truncate text-xs text-slate-500">
                                  {highlightMatch(result.subtitle, query)}
                                </span>
                              </span>
                            </span>
                            <ArrowRight className="size-4 shrink-0 text-slate-300" aria-hidden="true" />
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="px-6 py-7 text-center text-sm text-slate-500">
                      No verified record matches <span className="font-bold text-slate-800">“{query}”</span>.
                      <p className="mt-1 text-xs text-slate-400">Try a Pincode, IFSC, bank name, or locality.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="mr-1 font-semibold text-slate-500">Trending searches:</span>
              {TRENDING_SEARCHES.map((trend) => (
                <button
                  key={trend.query}
                  type="button"
                  onClick={() => applyTrendingQuery(trend.query)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-semibold text-slate-300 transition-colors hover:border-sky-300/40 hover:bg-sky-300/10 hover:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {trend.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="relative mx-auto hidden w-full max-w-lg [perspective:1400px] lg:block"
          style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="absolute -inset-16 -z-10 rounded-full bg-sky-400/15 blur-3xl" />

          <VisualCard
            className="relative z-20 mx-auto w-[88%] rounded-[2rem] border border-sky-200/30 bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-700 p-6 shadow-[0_28px_70px_rgba(14,165,233,0.33)]"
          >
            <div className="flex items-start justify-between">
              <span className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                <MapPin className="size-8 text-white" />
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[0.65rem] font-black tracking-[0.18em] text-white">POSTAL GEO-PIN</span>
            </div>
            <p className="mt-14 text-sm font-bold uppercase tracking-[0.18em] text-sky-100">Postal intelligence</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-white">19,300+ nodes</p>
            <p className="mt-2 text-sm leading-6 text-sky-100">Verified delivery corridors, Pincode zones, and industrial localities.</p>
          </VisualCard>

          <VisualCard
            delay={0.4}
            className="relative z-30 -mt-8 ml-auto mr-0 w-[76%] rounded-[1.6rem] border border-cyan-200/20 bg-[#122033]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Holographic IFSC</span>
              <Building2 className="size-5 text-teal-300" />
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="h-1.5 w-24 rounded-full bg-cyan-300/60" />
              <div className="mt-4 flex items-end justify-between">
                <span className="font-mono text-lg font-bold text-white">SBIN0000001</span>
                <span className="text-[0.65rem] font-bold text-emerald-300">VERIFIED</span>
              </div>
              <div className="mt-3 h-px bg-white/10" />
              <div className="mt-3 flex gap-1.5">
                {["w-12", "w-7", "w-16", "w-9"].map((width) => (
                  <span key={width} className={cn("h-1.5 rounded-full bg-slate-400/40", width)} />
                ))}
              </div>
            </div>
          </VisualCard>

          <VisualCard
            delay={0.8}
            className="relative z-10 -mt-7 ml-2 w-[67%] rounded-[1.5rem] border border-emerald-200/20 bg-emerald-400/10 p-5 shadow-xl shadow-emerald-950/20 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-emerald-300/15 p-2.5 text-emerald-300">
                <ShieldCheck className="size-6" />
              </span>
              <span>
                <span className="block text-sm font-black text-white">Cyber Fraud Shield</span>
                <span className="mt-0.5 block text-xs text-emerald-100">Verified financial directory layer</span>
              </span>
            </div>
          </VisualCard>
        </motion.div>
      </div>
    </section>
  );
}
