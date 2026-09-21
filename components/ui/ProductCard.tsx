import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatPrice, reviewStats } from "@/lib/catalog";
import ProductCover from "@/components/ui/ProductCover";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-burgundy-100 hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <ProductCover product={product} className="h-64 sm:h-72" />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-burgundy-500 text-cream text-xs font-bold px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-ink leading-snug group-hover:text-burgundy-600">{product.name_ar}</h3>
        {reviewStats(product.slug).count > 0 && (
          <p className="mt-1 text-xs text-camel">
            {"★".repeat(Math.round(reviewStats(product.slug).average))}
            <span className="text-gray-500 mr-1">({reviewStats(product.slug).count})</span>
          </p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-burgundy-600">{formatPrice(product.price)}</span>
          {product.compare_at && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.compare_at)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
