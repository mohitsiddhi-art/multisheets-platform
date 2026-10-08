import Link from "next/link";
import { Logo } from "./Logo";

const categories = [
  { title: "Pincode", href: "/pincode", description: "Search verified Indian pincodes" },
  { title: "IFSC", href: "/ifsc", description: "Verified Bank IFSC branch directory" },
];

const legalLinks = [
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              MultiSheets — India&apos;s unified industrial postal and financial directory gateway.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E293B]">Directories</h3>
            <ul className="mt-5 space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm text-slate-600 transition-colors hover:text-sky-600">
                    {cat.title}
                  </Link>
                  <span className="ml-2 text-xs text-slate-400">{cat.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1E293B]">Legal & Support</h3>
            <ul className="mt-5 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-sky-600">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200/60 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} MultiSheets. All rights reserved. Built for India.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <span>Bada Bazar, Kolkata — 700007</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
