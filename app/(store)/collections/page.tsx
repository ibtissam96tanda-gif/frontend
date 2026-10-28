import { CATALOG } from "@/lib/catalog";
import ProductCard from "@/components/ui/ProductCard";

export const metadata = { title: "جميع المنتجات" };

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl text-center mb-2">جميع المنتجات</h1>
      <p className="text-center text-gray-500 mb-10">اختاري القطعة وأكملي الطلب</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATALOG.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
