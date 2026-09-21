export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl mb-3">الصفحة غير موجودة</h1>
      <p className="text-gray-500 mb-6">هذه الصفحة غير متوفرة في متجر تاندا.</p>
      <a href="/" className="bg-burgundy-500 text-cream font-bold px-8 py-3 rounded-full">
        العودة للرئيسية
      </a>
    </div>
  );
}
