import Link from "next/link";
import { BRAND } from "@/lib/catalog";

export const metadata = { title: "شكراً لطلبك" };

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { order?: string; total?: string };
}) {
  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("مرحباً، أريد تأكيد طلبي من تاندا")}`;
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <h1 className="font-display text-4xl mb-4">تم استلام طلبك</h1>
      <p className="text-gray-600 leading-relaxed">
        سنتصل بك أو نراسلك على واتساب لتأكيد الاسم، المقاس، اللون، والعنوان قبل الشحن.
        الدفع عند الاستلام.
      </p>
      {searchParams.order && (
        <p className="mt-4 text-sm text-gray-500">رقم الطلب: {searchParams.order}</p>
      )}
      {searchParams.total && (
        <p className="mt-1 font-bold text-burgundy-600">المجموع: {searchParams.total} درهم</p>
      )}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a href={wa} className="bg-burgundy-500 text-cream font-bold px-8 py-3 rounded-full">
          تأكيد عبر واتساب
        </a>
        <Link href="/collections" className="border border-burgundy-200 px-8 py-3 rounded-full font-bold">
          متابعة التسوق
        </Link>
      </div>
    </div>
  );
}
