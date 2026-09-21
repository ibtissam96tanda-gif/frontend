import Link from "next/link";
import { COLLECTIONS } from "@/lib/catalog";
import ComingSoon from "@/components/ui/ComingSoon";

const FAQS = [
  {
    q: "ما هي مدة وتكلفة التوصيل؟",
    a: "نوصل لجميع مدن المغرب خلال 24 إلى 72 ساعة. التوصيل مجاني. بعد الشحن يصلك اتصال أو رسالة من الموزع.",
  },
  {
    q: "هل يمكنني إرجاع أو استبدال القطعة؟",
    a: "نعم، خلال 7 أيام من الاستلام بشرط أن تكون القطعة غير مستعملة وفي تغليفها الأصلي. تواصلي عبر واتساب.",
  },
  {
    q: "كيف أختار المقاس؟",
    a: "اعتمدي دليل الوزن في صفحة المنتج. إذا ترددتِ بين مقاسين اختاري الأكبر. نؤكّد المقاس معكِ قبل الشحن.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-16 w-[28rem] h-[28rem] bg-burgundy-100/70 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-camel/30 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-burgundy-500 tracking-[0.3em] text-xs uppercase mb-4">TANDA BRAND · المغرب</p>
          <h1 className="font-display text-[2.35rem] sm:text-5xl md:text-7xl text-ink leading-tight">فن الأنوثة العصرية</h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            اكتشفي مجموعة الخريف والشتاء — قريباً بعد التصوير.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-burgundy-500 hover:bg-burgundy-600 text-cream font-bold px-10 py-4 rounded-2xl">
              أبقي على اطلاع
            </Link>
            <Link href="/about" className="border border-burgundy-200 text-burgundy-700 font-bold px-10 py-4 rounded-2xl bg-white/70">
              قصتنا
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm">
          <span>توصيل مجاني</span>
          <span>الدفع عند الاستلام</span>
          <span>مقاسات حتى 3XL</span>
          <span>تأكيد واتساب قبل الشحن</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl text-center mb-2">مجموعاتنا</h2>
        <p className="text-center text-gray-500 mb-10">الخريف والشتاء — قريباً</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="rounded-2xl bg-white border border-burgundy-100 p-6 hover:border-burgundy-400 transition-colors"
            >
              <h3 className="font-display text-2xl text-burgundy-700">{c.name_ar}</h3>
              <p className="text-sm text-gray-500 mt-2">{c.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <ComingSoon />
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-center mb-8">أسئلة شائعة</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-cream rounded-2xl p-5">
                <summary className="font-bold cursor-pointer">{f.q}</summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
