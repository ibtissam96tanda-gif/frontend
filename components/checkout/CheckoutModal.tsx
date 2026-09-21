"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { submitCheckout, validateMoroccanPhone } from "@/lib/api";
import { BRAND, formatPrice } from "@/lib/catalog";

const MOROCCAN_CITIES = [
  "الدار البيضاء", "الرباط", "فاس", "مراكش", "أكادير", "طنجة", "مكناس",
  "وجدة", "القنيطرة", "تطوان", "سلا", "الجديدة", "خريبكة", "بني ملال",
  "الحسيمة", "الناظور", "تازة", "الرشيدية", "ورزازات", "العيون",
  "الداخلة", "سيدي قاسم", "برشيد", "سطات", "قلعة السراغنة",
  "إنزكان", "تيزنيت", "طاطا", "زاكورة", "أصيلة", "مدينة أخرى",
];

interface FormState {
  name: string;
  phone: string;
  ville: string;
  adresse: string;
}

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, total, clearCart } = useCartStore();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: "", phone: "", ville: "", adresse: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState("");

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const e: Partial<FormState> = {};
    if (form.name.trim().length < 2) e.name = "الاسم مطلوب";
    if (!validateMoroccanPhone(form.phone)) e.phone = "أدخلي رقم هاتف مغربي صحيح";
    if (form.ville.trim().length < 2) e.ville = "اختاري المدينة";
    if (form.adresse.trim().length < 5) e.adresse = "أدخلي العنوان";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await submitCheckout({
        ...form,
        items: items.map((i) => ({
          slug: i.slug,
          name_ar: i.name_ar,
          color: i.color,
          color_name: i.color_name,
          size: i.size,
          qty: i.qty,
        })),
      });
      clearCart();
      closeCheckout();
      router.push(`/thank-you?order=${result.order_id}&total=${result.total}`);
    } catch (err: unknown) {
      const error = err as Error & { status?: number };
      if (error.status === 403) {
        setBlocked(error.message || "عذراً، لا يمكن إتمام الطلب");
        return;
      }
      const lines = items
        .map((i) => `• ${i.name_ar} — ${i.color_name} / ${i.size} × ${i.qty}`)
        .join("\n");
      const msg = encodeURIComponent(
        `طلب جديد من تاندا\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالمدينة: ${form.ville}\nالعنوان: ${form.adresse}\n\n${lines}\n\nالمجموع: ${total()} درهم\nالدفع عند الاستلام`
      );
      const amount = total();
      window.open(`https://wa.me/${BRAND.whatsapp}?text=${msg}`, "_blank");
      clearCart();
      closeCheckout();
      router.push(`/thank-you?total=${amount}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[90] overlay-enter" onClick={closeCheckout} />
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl slide-up overflow-hidden">
          <div className="bg-burgundy-600 text-cream px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">أكملي طلبك</h2>
              <p className="text-burgundy-100 text-sm">الدفع عند الاستلام · توصيل مجاني</p>
            </div>
            <button type="button" onClick={closeCheckout} className="text-burgundy-100">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <Field label="الاسم الكامل *" value={form.name} error={errors.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="رقم الهاتف *" value={form.phone} error={errors.phone} dir="ltr" placeholder="0612345678" onChange={(v) => setForm({ ...form, phone: v })} />
            <div>
              <label className="block text-sm font-semibold mb-1">المدينة *</label>
              <select
                value={form.ville}
                onChange={(e) => setForm({ ...form, ville: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 text-sm ${errors.ville ? "border-red-400" : "border-gray-300"}`}
              >
                <option value="">اختاري مدينتك</option>
                {MOROCCAN_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.ville && <p className="text-red-500 text-xs mt-1">{errors.ville}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">العنوان *</label>
              <textarea
                value={form.adresse}
                onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                rows={2}
                placeholder="الحي، الشارع، رقم المنزل..."
                className={`w-full border rounded-xl px-4 py-3 text-sm resize-none ${errors.adresse ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.adresse && <p className="text-red-500 text-xs mt-1">{errors.adresse}</p>}
            </div>
            <div className="bg-cream rounded-xl p-4 flex justify-between">
              <span>المجموع</span>
              <span className="font-black text-burgundy-600">{formatPrice(total())}</span>
            </div>
            {blocked && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 text-sm font-semibold">{blocked}</p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-burgundy-500 underline text-sm mt-2 inline-block"
                >
                  تواصلي معنا عبر واتساب
                </a>
              </div>
            )}
            <button
              type="submit"
              disabled={loading || items.length === 0 || !!blocked}
              className="w-full bg-burgundy-500 hover:bg-burgundy-600 disabled:bg-gray-300 text-cream font-bold py-4 rounded-xl"
            >
              {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
            </button>
            <p className="text-center text-xs text-gray-400">سنتصل بك لتأكيد المقاس واللون قبل الشحن</p>
          </form>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  dir = "rtl",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className={`w-full border rounded-xl px-4 py-3 text-sm ${error ? "border-red-400 bg-red-50" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
