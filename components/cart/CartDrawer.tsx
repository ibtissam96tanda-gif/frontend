"use client";

import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/catalog";

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, openCheckout, removeItem, setQty, total } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[80] overlay-enter" onClick={closeCart} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[90] shadow-2xl flex flex-col slide-up">
        <div className="flex items-center justify-between p-5 border-b border-burgundy-100">
          <h2 className="text-lg font-bold">سلتك</h2>
          <button type="button" onClick={closeCart} className="p-1" aria-label="إغلاق السلة">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <p className="font-medium text-ink">السلة فارغة</p>
              <p className="text-sm mt-1">أضيفي قطعة لتبدئي طلبك</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="flex gap-4 p-4 bg-white rounded-xl border border-burgundy-50">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-snug">{item.name_ar}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.color_name} · {item.size}
                  </p>
                  <p className="text-burgundy-600 font-bold mt-1">{formatPrice(item.unit_price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button type="button" className="w-7 h-7 rounded-full border" onClick={() => setQty(item.key, item.qty - 1)}>−</button>
                    <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                    <button type="button" className="w-7 h-7 rounded-full border" onClick={() => setQty(item.key, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button type="button" onClick={() => removeItem(item.key)} className="text-gray-400 hover:text-red-500 self-start">
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-burgundy-100 bg-white">
            <div className="flex justify-between items-center mb-1">
              <span>المجموع</span>
              <span className="text-2xl font-black text-burgundy-600">{formatPrice(total())}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">التوصيل مجاني · الدفع عند الاستلام</p>
            {total() < 600 && (
              <p className="text-xs text-camel mb-3">تبقّى لكِ {formatPrice(600 - total())} لتحصلي على هدية</p>
            )}
            {total() >= 600 && (
              <p className="text-xs text-burgundy-600 mb-3">ستُضاف الهدية إلى طردكِ</p>
            )}
            <button
              type="button"
              onClick={openCheckout}
              className="w-full bg-burgundy-500 hover:bg-burgundy-600 text-cream font-bold py-4 rounded-xl"
            >
              إتمام الطلب — الدفع عند الاستلام
            </button>
          </div>
        )}
      </div>
    </>
  );
}
