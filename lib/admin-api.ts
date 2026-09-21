const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type OrderStatus =
  | "new"
  | "no_answer"
  | "confirmed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned";

export interface AdminOrder {
  order_id: string;
  created_at: string;
  name: string;
  phone: string;
  ville: string;
  adresse: string;
  source: string;
  notes?: string;
  status: OrderStatus;
  confirmed_by?: string;
  sale_total: number;
  cost_total: number;
  shipping_cost: number;
  items: {
    slug: string;
    name_ar: string;
    color: string;
    color_name?: string;
    size: string;
    qty: number;
    unit_price: number;
    unit_cost?: number;
  }[];
  delivery?: { provider?: string; tracking?: string };
  history?: { at: string; status: string; note?: string }[];
}

export interface AdminStats {
  entered: number;
  confirmed: number;
  delivered: number;
  returned: number;
  cancelled: number;
  no_answer: number;
  shipped: number;
  new: number;
  sale_delivered: number;
  cost_delivered: number;
  shipping_paid: number;
  collected: number;
  margin_net: number;
  currency: string;
}

export interface Overview {
  stats: AdminStats;
  integrations: { sheet: boolean; sendit: boolean; shipping_cost_mad: number };
  status_labels: Record<string, string>;
  orders: AdminOrder[];
}

function headers(token: string): HeadersInit {
  return { "Content-Type": "application/json", "X-Admin-Token": token };
}

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const detail = typeof err?.detail === "string" ? err.detail : "خطأ";
    throw new Error(detail);
  }
  return res.json() as Promise<T>;
}

export async function adminLogin(token: string) {
  return parse<{ ok: boolean }>(
    await fetch(`${BASE}/api/v1/admin/login`, { method: "POST", headers: headers(token) })
  );
}

export async function fetchOverview(token: string) {
  return parse<Overview>(await fetch(`${BASE}/api/v1/admin/overview`, { headers: headers(token) }));
}

export async function patchStatus(token: string, id: string, status: OrderStatus, note = "", confirmedBy = "") {
  return parse<AdminOrder>(
    await fetch(`${BASE}/api/v1/admin/orders/${id}/status`, {
      method: "PATCH",
      headers: headers(token),
      body: JSON.stringify({ status, note, confirmed_by: confirmedBy }),
    })
  );
}

export async function shipOrder(token: string, id: string) {
  return parse<AdminOrder>(
    await fetch(`${BASE}/api/v1/admin/orders/${id}/ship`, { method: "POST", headers: headers(token) })
  );
}

export async function setTracking(token: string, id: string, tracking: string, provider = "manual") {
  return parse<AdminOrder>(
    await fetch(`${BASE}/api/v1/admin/orders/${id}/tracking`, {
      method: "PATCH",
      headers: headers(token),
      body: JSON.stringify({ tracking, provider }),
    })
  );
}

export async function createAdminOrder(
  token: string,
  body: {
    name: string;
    phone: string;
    ville: string;
    adresse: string;
    source: string;
    notes?: string;
    items: { slug: string; color: string; size: string; qty: number; name_ar?: string }[];
  }
) {
  return parse<AdminOrder>(
    await fetch(`${BASE}/api/v1/admin/orders`, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify(body),
    })
  );
}

export async function fetchProducts(token: string) {
  return parse<{ slug: string; name_ar: string; sale_price: number; cost_price: number }[]>(
    await fetch(`${BASE}/api/v1/admin/products`, { headers: headers(token) })
  );
}

export async function saveProduct(
  token: string,
  body: { slug: string; name_ar: string; sale_price: number; cost_price: number }
) {
  return parse(await fetch(`${BASE}/api/v1/admin/products`, { method: "PUT", headers: headers(token), body: JSON.stringify(body) }));
}

export async function rebuildSheet(token: string) {
  return parse<{ ok: boolean; rows: number }>(
    await fetch(`${BASE}/api/v1/admin/sheet/rebuild`, { method: "POST", headers: headers(token) })
  );
}
