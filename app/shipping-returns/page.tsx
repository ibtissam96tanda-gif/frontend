export const metadata = { title: "الشحن والإرجاع" };

export default function ShippingPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 leading-relaxed space-y-4">
      <h1 className="font-display text-4xl mb-6">الشحن والإرجاع</h1>
      <p>التوصيل مجاني لجميع مدن المغرب خلال 24 إلى 72 ساعة بعد تأكيد الطلب.</p>
      <p>الدفع عند الاستلام. نؤكد كل طلب عبر واتساب أو اتصال، بما في ذلك المقاس واللون.</p>
      <p>يمكنكِ الإرجاع أو الاستبدال خلال 7 أيام من الاستلام إذا كانت القطعة غير مستعملة وفي تغليفها الأصلي.</p>
    </article>
  );
}
