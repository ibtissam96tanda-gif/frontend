"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { BRAND } from "@/lib/catalog";

const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("مرحباً، لدي استفسار حول منتجات TANDA Brand")}`;

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { items, openCart } = useCartStore();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const linkClass = (href: string) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-bold transition-colors ${
      pathname === href ? "text-burgundy-500" : "text-gray-500"
    }`;

  return (
    <nav
      className="mobile-only-flex fixed bottom-0 inset-x-0 z-40 bg-cream border-t border-burgundy-100 shadow-[0_-4px_20px_rgba(139,69,83,0.08)] pb-safe"
      aria-label="التنقل السريع"
    >
      <div className="flex items-stretch h-16 max-w-lg mx-auto w-full">
        <Link href="/" className={linkClass("/")}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>الرئيسية</span>
        </Link>
        <Link href="/collections" className={linkClass("/collections")}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>المجموعات</span>
        </Link>
        <button type="button" onClick={openCart} className="relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-bold text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
          </svg>
          <span>السلة</span>
          {count > 0 && (
            <span className="absolute top-1 left-1/2 ml-3 bg-burgundy-500 text-cream text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] font-bold text-[#25D366]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
          <span>واتساب</span>
        </a>
      </div>
    </nav>
  );
}
