import { notFound } from "next/navigation";
import { COLLECTIONS, getCollection } from "@/lib/catalog";
import ComingSoon from "@/components/ui/ComingSoon";

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ComingSoon title={col.name_ar} />
    </div>
  );
}
