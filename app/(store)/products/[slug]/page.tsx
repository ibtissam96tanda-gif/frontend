import { notFound } from "next/navigation";
import { CATALOG, getProduct } from "@/lib/catalog";
import ProductView from "@/components/product/ProductView";

export const dynamicParams = true;

export function generateStaticParams() {
  return CATALOG.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return { title: product?.name_ar ?? "منتج" };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
