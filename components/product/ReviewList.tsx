import type { Review } from "@/lib/catalog";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-camel" aria-label={`${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n}>{n <= rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  const average = Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;

  return (
    <section className="mt-8 md:mt-10 rounded-3xl border border-burgundy-100 bg-white p-5 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display text-2xl text-ink">آراء الزبونات</h2>
          <p className="text-sm text-gray-500 mt-1">من اشترين هذا الموديل</p>
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <Stars rating={Math.round(average)} />
            <span className="font-bold tabular-nums">{average}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{reviews.length} تقييمات موثّقة</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl border border-burgundy-50 bg-cream/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full bg-burgundy-500 text-cream flex items-center justify-center font-bold"
                  aria-hidden
                >
                  {review.name.slice(0, 1)}
                </div>
                <div>
                  <p className="font-bold text-ink leading-tight">
                    {review.name}، {review.city}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    المقاس {review.size}
                    {review.verified && " · طلب موثّق"}
                  </p>
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>
            <p className="mt-3 text-sm text-gray-700 leading-relaxed">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
