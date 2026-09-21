"use client";

import Link from "next/link";
import { BRAND, COLLECTIONS } from "@/lib/catalog";
import BrandLockup from "@/components/layout/BrandLockup";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-ecru pt-12 pb-24 md:pb-10 mt-16 text-center md:text-right">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex justify-center md:justify-start">
            <BrandLockup inverted />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ecru/80">{BRAND.tagline}</p>
          <p className="mt-2 text-sm text-ecru/70">علامة مغربية للملابس النسائية.</p>
        </div>
        <div>
          <h3 className="font-bold text-cream mb-3">المجموعات</h3>
          <ul className="space-y-2 text-sm">
            {COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}`} className="hover:text-camel">
                  {c.name_ar}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link href="/contact" className="font-bold text-cream text-lg hover:text-camel">
            تواصل معنا
          </Link>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shipping-returns" className="hover:text-camel">الشحن والإرجاع</Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-camel">سياسة الخصوصية</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-camel">شروط الاستخدام</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 text-xs text-ecru/50">
        {year} TANDA Brand. جميع الحقوق محفوظة. المغرب.
      </p>
    </footer>
  );
}
