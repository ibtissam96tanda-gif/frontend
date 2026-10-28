import { notFound } from "next/navigation";
import { COLLECTIONS, getCollection, productsByCollection } from "@/lib/catalog";
import ProductCard from "@/components/ui/ProductCard";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const col = getCollection(params.slug);
  return { title: col?.name_ar ?? "مجموعة" };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const col = getCollection(params.slug);
  if (!col) notFound();
  const products = productsByCollection(col.slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl text-center mb-2">{col.name_ar}</h1>
      <p className="text-center text-gray-500 mb-10">{col.tagline}</p>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد قطع في هذه المجموعة بعد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
