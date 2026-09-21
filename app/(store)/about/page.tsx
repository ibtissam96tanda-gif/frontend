export const metadata = { title: "من نحن" };

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-16 leading-relaxed">
      <h1 className="font-display text-4xl mb-6">من نحن</h1>
      <p className="text-lg text-gray-700 mb-4">
        <strong>تاندا</strong> علامة مغربية للملابس النسائية. مجموعة الخريف والشتاء قيد التحضير والتصوير.
      </p>
      <p className="text-gray-700 mb-4">
        القطع ستُعرض هنا بعد التصوير. المقاسات تصل إلى 3XL، والطلب يُؤكَّد عبر واتساب قبل الشحن
        حتى يصلك المقاس واللون الصحيح.
      </p>
      <p className="text-gray-700">نخدم جميع مدن المغرب، والدفع عند الاستلام.</p>
    </article>
  );
}
