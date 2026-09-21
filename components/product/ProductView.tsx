"use client";

import { useMemo, useState } from "react";
import type { ColorOption, Product } from "@/lib/catalog";
import { CATALOG, OFFERS, SIZE_GUIDE, formatPrice, getProduct, reviewsFor, reviewStats } from "@/lib/catalog";
import { useCartStore } from "@/lib/store";
import ProductCover from "@/components/ui/ProductCover";
import SizeChart from "@/components/product/SizeChart";
import ReviewList from "@/components/product/ReviewList";

type Slot = { slug: string; colorId: string; size: string };

function splitOffer(total: number, pieces: number) {
  const base = Math.floor(total / pieces);
  const rest = total - base * pieces;
  return Array.from({ length: pieces }, (_, i) => base + (i === 0 ? rest : 0));
}

function defaultSlot(product: Product, color: ColorOption, size: string): Slot {
  return { slug: product.slug, colorId: color.id, size };
}

export default function ProductView({ product }: { product: Product }) {
  const addOffer = useCartStore((s) => s.addOffer);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes.includes("M") ? "M" : product.sizes[0]);
  const [tier, setTier] = useState<(typeof OFFERS)[number]>(OFFERS[1]);
  const [guide, setGuide] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([
    defaultSlot(product, product.colors[0], product.sizes.includes("M") ? "M" : product.sizes[0]),
    defaultSlot(product, product.colors[1] ?? product.colors[0], product.sizes.includes("M") ? "M" : product.sizes[0]),
  ]);

  const extraCount = tier.pieces - 1;
  const stats = reviewStats(product.slug);

  const extraSlots = useMemo(() => {
    const extras: Slot[] = [];
    for (let i = 0; i < extraCount; i++) {
      extras.push(slots[i] ?? defaultSlot(product, color, size));
    }
    return extras;
  }, [extraCount, slots, product, color, size]);

  const setExtra = (index: number, patch: Partial<Slot>) => {
    setSlots((current) => {
      const next = [...current];
      const prev = next[index] ?? defaultSlot(product, color, size);
      const merged = { ...prev, ...patch };
      const target = getProduct(merged.slug) ?? product;
      if (!target.colors.some((c) => c.id === merged.colorId)) {
        merged.colorId = target.colors[0].id;
      }
      if (!target.sizes.includes(merged.size)) {
        merged.size = target.sizes.includes(size) ? size : target.sizes[0];
      }
      next[index] = merged;
      return next;
    });
  };

  const ctaLabel =
    tier.pieces === 1
      ? `أضيفي إلى السلة — ${formatPrice(tier.price)}`
      : tier.pieces === 2
        ? `أضيفي القطعتين إلى السلة — ${formatPrice(tier.price)}`
        : `أضيفي القطع الثلاث إلى السلة — ${formatPrice(tier.price)}`;

  const addToCart = () => {
    const chosen: { product: Product; color: ColorOption; size: string }[] = [
      { product, color, size },
      ...extraSlots.map((slot) => {
        const p = getProduct(slot.slug) ?? product;
        const c = p.colors.find((x) => x.id === slot.colorId) ?? p.colors[0];
        return { product: p, color: c, size: slot.size };
      }),
    ];
    const prices = splitOffer(tier.price, chosen.length);
    addOffer(
      chosen.map((line, i) => ({
        product: line.product,
        color: line.color.id,
        colorName: line.color.name_ar,
        size: line.size,
        unit_price: prices[i],
      }))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-14 pb-28 md:pb-14">
      <div className="grid md:grid-cols-2 gap-10">
      <ProductCover product={product} className="h-[420px] md:h-[560px] rounded-3xl" />

      <div>
        {product.badge && (
          <span className="inline-block text-xs font-bold text-burgundy-600 bg-burgundy-50 px-3 py-1 rounded-full mb-3">
            {product.badge}
          </span>
        )}
        <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">{product.name_ar}</h1>
        {stats.count > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            <span className="text-camel">{"★".repeat(Math.round(stats.average))}</span>
            <span className="font-bold mx-1">{stats.average}</span>
            <span className="text-gray-500">({stats.count} آراء من الزبونات)</span>
          </p>
        )}
        <p className="mt-3 text-gray-600 leading-relaxed">{product.description}</p>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="text-3xl font-black text-burgundy-600">{formatPrice(tier.price)}</span>
          {tier.save > 0 && (
            <span className="text-gray-400 line-through">{formatPrice(product.price * tier.pieces)}</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">السعر شامل — التوصيل مجاني والدفع عند الاستلام</p>

        <div className="mt-7 space-y-2">
          <p className="text-sm font-bold">اختاري العرض</p>
          {OFFERS.map((offer) => {
            const selected = offer.pieces === tier.pieces;
            return (
              <button
                key={offer.pieces}
                type="button"
                onClick={() => setTier(offer)}
                className={`w-full text-right rounded-2xl border-2 px-4 py-3.5 transition ${
                  selected
                    ? "border-burgundy-500 bg-burgundy-50 shadow-sm"
                    : "border-burgundy-100 bg-white hover:border-burgundy-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{offer.label}</span>
                      {offer.badge && (
                        <span className="text-[10px] font-bold bg-burgundy-500 text-cream px-2 py-0.5 rounded-full">
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    {offer.save > 0 && (
                      <p className="text-xs text-camel mt-1">توفّرين {offer.save} درهم · {offer.per} درهم للقطعة</p>
                    )}
                  </div>
                  <span className="text-lg font-black text-burgundy-600">{formatPrice(offer.price)}</span>
                </div>
              </button>
            );
          })}
        </div>

        {extraCount > 0 && (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-bold">اختاري القطع الأخرى — يمكنكِ تغيير الموديل واللون</p>
            {extraSlots.map((slot, index) => {
              const slotProduct = getProduct(slot.slug) ?? product;
              const slotColor = slotProduct.colors.find((c) => c.id === slot.colorId) ?? slotProduct.colors[0];
              return (
                <div key={index} className="rounded-2xl border border-burgundy-100 bg-white p-4 space-y-3">
                  <p className="text-xs font-bold text-gray-500">القطعة {index + 2}</p>
                  <select
                    className="w-full rounded-xl border border-burgundy-100 bg-cream px-3 py-2 text-sm"
                    value={slot.slug}
                    onChange={(e) => setExtra(index, { slug: e.target.value })}
                  >
                    {CATALOG.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name_ar}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-2">
                    {slotProduct.colors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setExtra(index, { colorId: c.id })}
                        className={`w-8 h-8 rounded-full border-2 ${slotColor.id === c.id ? "border-ink scale-110" : "border-white"} shadow`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name_ar}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {slotProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setExtra(index, { size: s })}
                        className={`min-w-[2.6rem] px-2 py-1.5 rounded-lg border text-xs font-bold ${
                          slot.size === s ? "bg-ink text-cream border-ink" : "bg-cream border-burgundy-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <p className="text-sm font-bold mb-2">اللون: {color.name_ar}</p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-full border-2 ${color.id === c.id ? "border-ink scale-110" : "border-white"} shadow`}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name_ar}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold">المقاس</p>
            <button type="button" onClick={() => setGuide(true)} className="text-sm text-burgundy-600 underline">
              دليل المقاسات
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={`min-w-[3rem] px-3 py-2 rounded-xl border text-sm font-bold ${
                  size === s ? "bg-ink text-cream border-ink" : "bg-white border-burgundy-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={addToCart}
          className="hidden md:block mt-8 w-full bg-burgundy-500 hover:bg-burgundy-600 text-cream font-bold py-4 rounded-xl shadow-md"
        >
          {ctaLabel}
        </button>
        <p className="mt-3 text-xs text-gray-500">سنتصل بك لتأكيد المقاس واللون قبل الشحن.</p>
      </div>
      </div>

      <section className="mt-12 md:mt-16 rounded-3xl border border-burgundy-100 bg-white p-5 md:p-8">
        <h2 className="font-display text-2xl text-ink mb-4">الوصف</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {product.pieces && (
          <ul className="mt-5 text-sm text-gray-600 space-y-1">
            {product.pieces.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        )}

        <ul className="mt-5 space-y-2">
          {product.benefits.map((b) => (
            <li key={b} className="text-sm text-gray-700">✓ {b}</li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-burgundy-100">
          <h3 className="text-base font-bold mb-1">جدول المقاسات</h3>
          <p className="text-xs text-gray-500 mb-4">قياسات القطعة بالسنتيمتر وهي مفروشة. إذا ترددتِ بين مقاسين، اختاري الأكبر.</p>
          <SizeChart sizes={product.sizes} selected={size} />
        </div>
      </section>

      <ReviewList reviews={reviewsFor(product.slug)} />

      <div className="md:hidden fixed inset-x-0 bottom-16 z-40 border-t border-burgundy-100 bg-cream/95 backdrop-blur px-4 py-3 pb-safe">
        <button
          type="button"
          onClick={addToCart}
          className="w-full bg-burgundy-500 hover:bg-burgundy-600 text-cream font-bold py-3.5 rounded-xl shadow-md"
        >
          {ctaLabel}
        </button>
      </div>

      {guide && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 overlay-enter" onClick={() => setGuide(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md slide-up">
            <h2 className="font-bold text-lg mb-4">دليل المقاسات</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-right text-gray-500">
                  <th className="py-2">المقاس</th>
                  <th>الوزن المناسب</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.filter((row) => product.sizes.includes(row.size)).map((row) => (
                  <tr key={row.size} className="border-t">
                    <td className="py-2 font-bold">{row.size}</td>
                    <td>{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-3">إذا ترددتِ بين مقاسين، اختاري الأكبر. نؤكّد المقاس معكِ عبر واتساب.</p>
            <button type="button" onClick={() => setGuide(false)} className="mt-4 w-full py-3 rounded-xl bg-ink text-cream font-bold">
              حسناً
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
