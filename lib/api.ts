const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function validateMoroccanPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-.]/g, "");
  return /^(\+?212|0)(6|7)\d{8}$/.test(cleaned) || /^(6|7)\d{8}$/.test(cleaned);
}

export async function submitCheckout(body: {
  name: string;
  phone: string;
  ville: string;
  adresse: string;
  items: { slug: string; name_ar?: string; color: string; color_name?: string; size: string; qty: number }[];
}) {
  const res = await fetch(`${BASE}/api/v1/orders/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = typeof err?.detail === "string" ? err.detail : "خطأ في الطلب";
    const error = new Error(detail) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }
  return res.json() as Promise<{ order_id: string; total: number }>;
}
