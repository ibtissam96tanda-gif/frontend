import type { Product } from "@/lib/catalog";

export default function ProductCover({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(160deg, ${product.accent} 0%, #1A1614 78%)` }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #F7F0EB 0, transparent 45%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="font-display text-cream/90 text-3xl sm:text-4xl italic">TANDA</span>
        <span className="mt-2 text-cream/80 text-sm font-medium leading-snug">{product.name_ar}</span>
      </div>
    </div>
  );
}
