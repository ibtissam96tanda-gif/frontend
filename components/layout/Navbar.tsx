"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { BRAND, COLLECTIONS } from "@/lib/catalog";
import BrandLockup from "@/components/layout/BrandLockup";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المجموعات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const { items, openCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className="bg-burgundy-700 text-cream text-center text-[11px] sm:text-sm py-2 px-3 leading-relaxed">
        توصيل مجاني · الدفع عند الاستلام ·{" "}
        <span className="ltr inline-block" dir="ltr">
          {BRAND.order_phone}
        </span>
      </div>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-burgundy-100">
        <div className="relative max-w-6xl mx-auto px-3 sm:px-4 h-16 sm:h-[4.5rem] flex items-center justify-between gap-2">
          <nav className="desktop-only-flex items-center gap-6 text-sm font-medium text-ink z-10">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-burgundy-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="mobile-only p-2 text-ink z-10"
            aria-label="فتح القائمة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <BrandLockup />
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-1.5 bg-burgundy-500 text-cream px-3 py-2 rounded-full text-sm font-semibold hover:bg-burgundy-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              <span className="hidden sm:inline">السلة</span>
              {count > 0 && (
                <span className="absolute -top-2 -left-2 bg-camel text-ink text-xs font-black rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60] overlay-enter" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-[min(100%,20rem)] bg-cream z-[70] shadow-2xl flex flex-col slide-up">
            <div className="flex items-center justify-between p-4 border-b border-burgundy-100">
              <BrandLockup href="/" />
              <button type="button" onClick={() => setMenuOpen(false)} className="p-2" aria-label="إغلاق">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3.5 rounded-xl font-semibold hover:bg-burgundy-50 hover:text-burgundy-700"
                >
                  {link.label}
                </Link>
              ))}
              <p className="px-4 pt-4 text-xs text-burgundy-500 font-bold">المجموعات</p>
              {COLLECTIONS.map((c) => (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm hover:bg-burgundy-50"
                >
                  {c.name_ar}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
