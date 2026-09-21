"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  adminLogin,
  createAdminOrder,
  fetchOverview,
  fetchProducts,
  patchStatus,
  rebuildSheet,
  saveProduct,
  setTracking,
  shipOrder,
  type AdminOrder,
  type AdminStats,
  type OrderStatus,
  type Overview,
} from "@/lib/admin-api";
import { BRAND } from "@/lib/catalog";

const TOKEN_KEY = "tanda_admin_token";

const STATUS_FLOW: { id: OrderStatus; label: string }[] = [
  { id: "new", label: "جديدة" },
  { id: "no_answer", label: "ماجاوبتش" },
  { id: "confirmed", label: "مؤكدة" },
  { id: "cancelled", label: "ملغاة" },
  { id: "shipped", label: "مرسلة" },
  { id: "delivered", label: "موصلة" },
  { id: "returned", label: "مرتجعة" },
];

type Tab = "orders" | "products" | "connect";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Overview | null>(null);
  const [tab, setTab] = useState<Tab>("orders");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const refresh = useCallback(
    async (t: string) => {
      const overview = await fetchOverview(t);
      setData(overview);
    },
    []
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (!saved) return;
    setToken(saved);
    refresh(saved).catch(() => {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken("");
    });
  }, [refresh]);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminLogin(input.trim());
      sessionStorage.setItem(TOKEN_KEY, input.trim());
      setToken(input.trim());
      await refresh(input.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الدخول");
    } finally {
      setLoading(false);
    }
  }

  if (!token || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={login} className="bg-white border border-burgundy-100 rounded-2xl p-8 w-full max-w-md space-y-4">
          <p className="text-burgundy-500 text-xs tracking-[0.25em] uppercase">TANDA · ADMIN</p>
          <h1 className="font-display text-3xl">إدارة الطلبات</h1>
          <p className="text-sm text-gray-500">أدخلي الرمز من ملف backend .env — ADMIN_TOKEN</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-burgundy-100 rounded-xl px-4 py-3"
            placeholder="رمز الإدارة"
          />
          {error && <p className="text-sm text-burgundy-700">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-burgundy-500 text-cream font-bold py-3 rounded-xl">
            {loading ? "..." : "دخول"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <AdminShell
      data={data}
      token={token}
      tab={tab}
      setTab={setTab}
      filter={filter}
      setFilter={setFilter}
      openId={openId}
      setOpenId={setOpenId}
      onRefresh={() => refresh(token)}
      onLogout={() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setData(null);
      }}
    />
  );
}

function AdminShell({
  data,
  token,
  tab,
  setTab,
  filter,
  setFilter,
  openId,
  setOpenId,
  onRefresh,
  onLogout,
}: {
  data: Overview;
  token: string;
  tab: Tab;
  setTab: (t: Tab) => void;
  filter: OrderStatus | "all";
  setFilter: (s: OrderStatus | "all") => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  onRefresh: () => Promise<void> | void;
  onLogout: () => void;
}) {
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  const orders = useMemo(() => {
    if (filter === "all") return data.orders;
    return data.orders.filter((o) => o.status === filter);
  }, [data.orders, filter]);

  async function run(label: string, fn: () => Promise<unknown>) {
    setBusy(label);
    setMsg("");
    try {
      await fn();
      await onRefresh();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "خطأ");
    } finally {
      setBusy("");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-burgundy-500 text-xs tracking-[0.25em] uppercase">TANDA OPS</p>
          <h1 className="font-display text-4xl">لوحة الطلبات</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onRefresh()} className="border border-burgundy-200 px-4 py-2 rounded-xl text-sm font-bold">
            تحديث
          </button>
          <button onClick={onLogout} className="text-sm text-gray-500 px-4 py-2">
            خروج
          </button>
        </div>
      </header>

      <Stats stats={data.stats} />

      <div className="flex gap-2 flex-wrap">
        {(
          [
            ["orders", "الطلبات"],
            ["products", "ثمن الشراء / البيع"],
            ["connect", "Sheet و Sendit"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-full text-sm font-bold ${tab === id ? "bg-burgundy-500 text-cream" : "bg-white border border-burgundy-100"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {msg && <p className="text-sm text-burgundy-700 bg-burgundy-50 rounded-xl px-4 py-2">{msg}</p>}

      {tab === "orders" && (
        <OrdersPanel
          orders={orders}
          filter={filter}
          setFilter={setFilter}
          openId={openId}
          setOpenId={setOpenId}
          busy={busy}
          token={token}
          sendit={data.integrations.sendit}
          run={run}
        />
      )}
      {tab === "products" && <ProductsPanel token={token} run={run} />}
      {tab === "connect" && (
        <ConnectPanel
          sheet={data.integrations.sheet}
          sendit={data.integrations.sendit}
          shippingCost={data.integrations.shipping_cost_mad}
          busy={busy}
          onRebuild={() => run("sheet", () => rebuildSheet(token))}
        />
      )}
    </div>
  );
}

function Stats({ stats }: { stats: AdminStats }) {
  const cards = [
    ["دخلات", stats.entered],
    ["تأكدو", stats.confirmed],
    ["توصّلو", stats.delivered],
    ["رجعو", stats.returned],
    ["بيع موصل", `${stats.sale_delivered} د`],
    ["شراء موصل", `${stats.cost_delivered} د`],
    ["توصيل مدفوع", `${stats.shipping_paid} د`],
    ["الربح", `${stats.margin_net} د`],
  ] as const;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map(([label, value]) => (
        <div key={label} className="bg-white border border-burgundy-100 rounded-2xl p-4">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-burgundy-700 mt-1">{value}</p>
        </div>
      ))}
    </div>
  );
}

function OrdersPanel({
  orders,
  filter,
  setFilter,
  openId,
  setOpenId,
  busy,
  token,
  sendit,
  run,
}: {
  orders: AdminOrder[];
  filter: OrderStatus | "all";
  setFilter: (s: OrderStatus | "all") => void;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  busy: string;
  token: string;
  sendit: boolean;
  run: (label: string, fn: () => Promise<unknown>) => void;
}) {
  const [wa, setWa] = useState({
    name: "",
    phone: "",
    ville: "",
    adresse: "",
    slug: "",
    size: "L",
    color: "",
    qty: 1,
    source: "whatsapp",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-xs font-bold ${filter === "all" ? "bg-ink text-cream" : "bg-white border"}`}
        >
          الكل
        </button>
        {STATUS_FLOW.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold ${filter === s.id ? "bg-ink text-cream" : "bg-white border"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <form
        className="bg-white border border-burgundy-100 rounded-2xl p-4 grid md:grid-cols-4 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          run("create", () =>
            createAdminOrder(token, {
              name: wa.name,
              phone: wa.phone,
              ville: wa.ville,
              adresse: wa.adresse,
              source: wa.source,
              items: [{ slug: wa.slug, color: wa.color, size: wa.size, qty: Number(wa.qty) || 1 }],
            })
          );
        }}
      >
        <p className="md:col-span-4 text-sm font-bold">طلب من واتساب / إنستغرام</p>
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="الاسم" value={wa.name} onChange={(e) => setWa({ ...wa, name: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="الهاتف" value={wa.phone} onChange={(e) => setWa({ ...wa, phone: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="المدينة" value={wa.ville} onChange={(e) => setWa({ ...wa, ville: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="العنوان" value={wa.adresse} onChange={(e) => setWa({ ...wa, adresse: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="slug المنتج" value={wa.slug} onChange={(e) => setWa({ ...wa, slug: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="المقاس" value={wa.size} onChange={(e) => setWa({ ...wa, size: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="اللون" value={wa.color} onChange={(e) => setWa({ ...wa, color: e.target.value })} />
        <button className="bg-burgundy-500 text-cream rounded-xl font-bold text-sm">إضافة</button>
      </form>

      <div className="space-y-2">
        {orders.length === 0 && <p className="text-gray-500 text-sm">ما كاين حتى طلب.</p>}
        {orders.map((order) => (
          <OrderCard
            key={order.order_id}
            order={order}
            open={openId === order.order_id}
            onToggle={() => setOpenId(openId === order.order_id ? null : order.order_id)}
            busy={busy}
            sendit={sendit}
            run={run}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}

function OrderCard({
  order,
  open,
  onToggle,
  busy,
  sendit,
  run,
  token,
}: {
  order: AdminOrder;
  open: boolean;
  onToggle: () => void;
  busy: string;
  sendit: boolean;
  run: (label: string, fn: () => Promise<unknown>) => void;
  token: string;
}) {
  const [tracking, setLocalTracking] = useState(order.delivery?.tracking || "");
  const label = STATUS_FLOW.find((s) => s.id === order.status)?.label || order.status;
  const items = (order.items || []).map((i) => `${i.name_ar} ${i.size}/${i.color_name || i.color} ×${i.qty}`).join(" · ");
  const waHref = `https://wa.me/${order.phone.replace("+", "")}?text=${encodeURIComponent(`سلام ${order.name}، أنا من تاندا. طلبك ${items} بـ ${order.sale_total} درهم، نأكدوه؟`)}`;

  return (
    <article className="bg-white border border-burgundy-100 rounded-2xl">
      <button type="button" onClick={onToggle} className="w-full text-right p-4">
        <div className="flex flex-wrap justify-between gap-2">
          <span className="font-bold">{order.name}</span>
          <span className="text-burgundy-700 font-bold">{order.sale_total} د</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {label} · {order.ville} · {order.phone} · شراء {order.cost_total} د
        </p>
        <p className="text-xs text-gray-400 mt-1">{items}</p>
      </button>
      {open && (
        <div className="border-t border-burgundy-50 p-4 space-y-3 text-sm">
          <p>
            {order.adresse} · المصدر: {order.source} · {order.created_at?.slice(0, 16).replace("T", " ")}
          </p>
          <p>
            بيع {order.sale_total} · شراء {order.cost_total} · توصيل {order.shipping_cost} · تتبع{" "}
            {order.delivery?.tracking || "—"}
          </p>
          <a href={waHref} target="_blank" className="inline-block text-burgundy-700 font-bold">
            واتساب {BRAND.whatsapp_display}
          </a>
          <div className="flex flex-wrap gap-2">
            {STATUS_FLOW.filter((s) => s.id !== "shipped").map((s) => (
              <button
                key={s.id}
                disabled={!!busy}
                onClick={() => run(s.id, () => patchStatus(token, order.order_id, s.id, "", "admin"))}
                className="px-3 py-1 rounded-full border text-xs font-bold"
              >
                {s.label}
              </button>
            ))}
            <button
              disabled={!!busy || order.status !== "confirmed"}
              onClick={() => run("ship", () => shipOrder(token, order.order_id))}
              className="px-3 py-1 rounded-full bg-burgundy-500 text-cream text-xs font-bold disabled:opacity-40"
            >
              {sendit ? "أرسل لـ Sendit" : "علّم مرسلة"}
            </button>
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-xl px-3 py-2"
              placeholder="رقم التتبع يدوياً"
              value={tracking}
              onChange={(e) => setLocalTracking(e.target.value)}
            />
            <button
              className="border rounded-xl px-3 font-bold"
              onClick={() => run("track", () => setTracking(token, order.order_id, tracking))}
            >
              حفظ
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function ProductsPanel({
  token,
  run,
}: {
  token: string;
  run: (label: string, fn: () => Promise<unknown>) => void;
}) {
  const [rows, setRows] = useState<{ slug: string; name_ar: string; sale_price: number; cost_price: number }[]>([]);
  const [form, setForm] = useState({ slug: "", name_ar: "", sale_price: 429, cost_price: 160 });

  useEffect(() => {
    fetchProducts(token).then(setRows).catch(() => setRows([]));
  }, [token]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        كل منتج خاصو ثمن البيع وثمن الشراء. الحسابات ديال الربح كايجيو من هنا، ماشي من الزبون.
      </p>
      <form
        className="bg-white border rounded-2xl p-4 grid md:grid-cols-5 gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          run("product", async () => {
            await saveProduct(token, {
              slug: form.slug,
              name_ar: form.name_ar,
              sale_price: Number(form.sale_price),
              cost_price: Number(form.cost_price),
            });
            setRows(await fetchProducts(token));
          });
        }}
      >
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" placeholder="الاسم" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} />
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" placeholder="بيع" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: Number(e.target.value) })} />
        <input className="border rounded-xl px-3 py-2 text-sm" type="number" placeholder="شراء" value={form.cost_price} onChange={(e) => setForm({ ...form, cost_price: Number(e.target.value) })} />
        <button className="bg-burgundy-500 text-cream rounded-xl font-bold text-sm">حفظ المنتج</button>
      </form>
      {rows.map((p) => (
        <div key={p.slug} className="bg-white border rounded-2xl px-4 py-3 flex justify-between text-sm">
          <span>
            {p.name_ar} <span className="text-gray-400">({p.slug})</span>
          </span>
          <span>
            بيع {p.sale_price} · شراء {p.cost_price} · هامش {p.sale_price - p.cost_price}
          </span>
        </div>
      ))}
    </div>
  );
}

function ConnectPanel({
  sheet,
  sendit,
  shippingCost,
  busy,
  onRebuild,
}: {
  sheet: boolean;
  sendit: boolean;
  shippingCost: number;
  busy: string;
  onRebuild: () => void;
}) {
  return (
    <div className="bg-white border border-burgundy-100 rounded-2xl p-6 space-y-4 text-sm leading-relaxed">
      <p>
        Google Sheet: {sheet ? "مربوط" : "مازال. حطي GOOGLE_SHEET_ID وملف service account فـ backend/.env وشاركي الsheet مع الإيميل ديال الحساب."}
      </p>
      <p>
        Sendit: {sendit ? "مربوط" : "مازال. حطي SENDIT_PUBLIC_KEY و SENDIT_SECRET_KEY من app.sendit.ma"}
      </p>
      <p>تكلفة التوصيل المحتسبة فكل إرسال: {shippingCost} درهم (SHIPPING_COST_MAD).</p>
      <p>الويب هوك للناقل: POST /api/v1/shipping/webhook — code أو tracking + status + reference.</p>
      <button disabled={!!busy || !sheet} onClick={onRebuild} className="bg-burgundy-500 text-cream px-5 py-2 rounded-xl font-bold disabled:opacity-40">
        أعد تعبئة Google Sheet
      </button>
    </div>
  );
}
