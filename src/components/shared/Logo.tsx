import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="MultiSheets Home" className={`inline-flex items-center gap-2.5 gap-x-3 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="36" height="36" rx="8" fill="#0EA5E9" />
        <rect x="8" y="8" width="20" height="20" rx="4" fill="#1E293B" opacity="0.9" />
        <rect x="12" y="12" width="12" height="12" rx="2" fill="#F8FAFC" />
        <rect x="17" y="17" width="6" height="6" rx="1" fill="#0EA5E9" />
      </svg>
      <div className="flex flex-col justify-center">
        <span className="text-[1.125rem] font-black tracking-tight leading-none text-[#1E293B]">MultiSheets</span>
        <span className="mt-1 text-[0.625rem] font-bold tracking-[0.14em] uppercase text-[#0EA5E9] leading-none">Directory Platform</span>
      </div>
    </Link>
  );
}
