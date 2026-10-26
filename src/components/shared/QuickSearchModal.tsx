"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Calculator, Building2, MapPin, Calendar, FileText, ArrowRight, X } from "lucide-react";
import { guides } from "@/data/guides";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Define searchable items
  const items = [
    { title: "PPS Cheque Converter & Validator", href: "/tools/pps-cheque", type: "Tool", icon: Calculator, description: "Generate RBI-standard Positive Pay System slips" },
    { title: "Speed Post Tariff & SLA Calculator", href: "/tools/speedpost-calculator", type: "Tool", icon: Calculator, description: "Calculate weight-based postage and delivery SLAs" },
    { title: "Bank IFSC Codes Directory", href: "/ifsc", type: "Directory", icon: Building2, description: "Search verified RBI bank routing codes" },
    { title: "Indian Postal Pincodes Directory", href: "/pincode", type: "Directory", icon: MapPin, description: "Search India Post branch and pincode locations" },
    { title: "Bank Holiday Calendar 2026", href: "/bank-holidays", type: "Feature", icon: Calendar, description: "Comprehensive nationwide bank holidays list" },
    { title: "Pincode Distance & SLA Calculator", href: "/tools/pincode-distance", type: "Tool", icon: MapPin, description: "Calculate delivery SLA and distance tiers between pincodes" },
    ...guides.map(g => ({
      title: g.title,
      href: `/guides/${g.slug}`,
      type: "Guide",
      icon: FileText,
      description: g.description
    }))
  ];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        router.push(filteredItems[selectedIndex].href);
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 px-4 pt-20 backdrop-blur-sm sm:pt-28">
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-slate-100 px-4 py-3.5">
          <Search className="size-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search tools, directories, guides, or holidays... (Type to filter)"
            className="w-full bg-transparent px-3 text-slate-900 placeholder:text-slate-400 focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No results found for &quot;{query}&quot;. Try searching for IFSC, Pincode, Guides, or Tools.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex cursor-pointer items-center justify-between rounded-xl p-3 transition-colors ${
                      isSelected ? "bg-sky-50 text-sky-900" : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        <IconComponent className="size-5" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{item.title}</p>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-slate-500">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                    </div>
                    <ArrowRight className={`size-4 ${isSelected ? "text-sky-600" : "text-slate-300"}`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px]">↑</kbd> <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd> to select</span>
          </div>
          <span><kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
