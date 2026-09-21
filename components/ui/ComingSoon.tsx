import Link from "next/link";
import { BRAND } from "@/lib/catalog";

const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("مرحباً، أريد معرفة موعد مجموعة الخريف والشتاء")}`;

export default function ComingSoon({ title }: { title?: string }) {
  return (
    <div className="max-w-xl mx-auto text-center py-10 px-4">
      <p className="text-burgundy-500 tracking-[0.25em] text-xs uppercase mb-3">قريباً</p>
      <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">{title ?? "مجموعة الخريف والشتاء"}</h2>
      <p className="text-gray-600 leading-relaxed mb-8">
        المنتجات ستظهر هنا بعد تصوير مجموعة الخريف والشتاء.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-burgundy-500 hover:bg-burgundy-600 text-cream font-bold px-8 py-3 rounded-full"
        >
          واتساب
        </a>
        <a
          href={`https://instagram.com/${BRAND.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-burgundy-200 text-burgundy-700 font-bold px-8 py-3 rounded-full bg-white/70"
        >
          @{BRAND.instagram}
        </a>
      </div>
    </div>
  );
}
