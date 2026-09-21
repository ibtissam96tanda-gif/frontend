export type CollectionSlug = "autumn" | "winter";

export interface Collection {
  slug: CollectionSlug;
  name_ar: string;
  tagline: string;
}

export interface ColorOption {
  id: string;
  name_ar: string;
  hex: string;
}

export interface Product {
  slug: string;
  name_ar: string;
  name_fr: string;
  collections: CollectionSlug[];
  price: number;
  compare_at?: number;
  badge?: string;
  colors: ColorOption[];
  sizes: string[];
  pieces?: string[];
  benefits: string[];
  description: string;
  accent: string;
}

export interface Review {
  id: string;
  slug: string;
  name: string;
  city: string;
  size: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface CartItem {
  key: string;
  slug: string;
  name_ar: string;
  color: string;
  color_name: string;
  size: string;
  qty: number;
  unit_price: number;
}

export interface CheckoutForm {
  name: string;
  phone: string;
  ville: string;
  adresse: string;
}

export const BRAND = {
  name: "TANDA Brand",
  name_ar: "تاندا",
  tagline: "فن الأنوثة العصرية",
  whatsapp: "212783344374",
  whatsapp_display: "0783344374",
  order_phone: "0783344374",
  instagram: "tanda.brand",
};

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export interface SizeRow {
  size: string;
  /** Garment measurements, cm */
  bust: number;
  waist: number;
  hip: number;
  length: number;
  sleeve: number;
  /** Body that this size typically fits */
  body_bust: string;
  body_waist: string;
  body_hip: string;
  weight: string;
}

export const SIZE_GUIDE: SizeRow[] = [
  { size: "S",   bust: 96,  waist: 78,  hip: 102, length: 70, sleeve: 58, body_bust: "82–88",  body_waist: "64–70",  body_hip: "88–94",  weight: "45–55 كغ" },
  { size: "M",   bust: 102, waist: 84,  hip: 108, length: 71, sleeve: 59, body_bust: "88–94",  body_waist: "70–76",  body_hip: "94–100", weight: "50–62 كغ" },
  { size: "L",   bust: 108, waist: 90,  hip: 114, length: 72, sleeve: 60, body_bust: "94–102", body_waist: "76–84",  body_hip: "100–108", weight: "60–72 كغ" },
  { size: "XL",  bust: 116, waist: 98,  hip: 122, length: 73, sleeve: 61, body_bust: "102–110", body_waist: "84–92", body_hip: "108–116", weight: "70–82 كغ" },
  { size: "2XL", bust: 124, waist: 106, hip: 130, length: 74, sleeve: 62, body_bust: "110–118", body_waist: "92–100", body_hip: "116–124", weight: "80–92 كغ" },
  { size: "3XL", bust: 132, waist: 114, hip: 138, length: 75, sleeve: 63, body_bust: "118–128", body_waist: "100–110", body_hip: "124–134", weight: "90–105 كغ" },
];

export const COLLECTIONS: Collection[] = [
  { slug: "autumn", name_ar: "الخريف", tagline: "قريباً — بعد تصوير المجموعة" },
  { slug: "winter", name_ar: "الشتاء", tagline: "قريباً — بعد تصوير المجموعة" },
];

export const OFFERS = [
  { pieces: 1, price: 299, save: 0, label: "قطعة واحدة", per: 299, badge: null as string | null },
  { pieces: 2, price: 499, save: 99, label: "قطعتان", per: 250, badge: "الأكثر طلباً" },
  { pieces: 3, price: 699, save: 198, label: "ثلاث قطع", per: 233, badge: "أفضل سعر" },
] as const;

export type OfferPieces = (typeof OFFERS)[number]["pieces"];

/** Sample product — replace with real photos when ready. */
export const CATALOG: Product[] = [
  {
    slug: "chefchaouen-set",
    name_ar: "طقم شفشاون",
    name_fr: "Ensemble Chefchaouen",
    collections: ["autumn"],
    price: 299,
    compare_at: 399,
    badge: "الأكثر مبيعاً",
    colors: [
      { id: "burgundy", name_ar: "عنابي", hex: "#8B4553" },
      { id: "navy",     name_ar: "كحلي",  hex: "#2B3A67" },
      { id: "camel",    name_ar: "جملي",  hex: "#C4A574" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    pieces: [
      "بلوزة طويلة بأكمام واسعة",
      "بنطلون واسع مرتفع الخصر",
    ],
    benefits: [
      "قماش 240 غرام/م² — غير شفاف",
      "مقاس مغربي، وليس مقاساً آسيوياً — صُنع في الدار البيضاء",
      "الدفع عند الاستلام — مجاناً",
      "استبدال مجاني خلال 7 أيام إذا لم يناسبكِ المقاس",
    ],
    description:
      "طقم مريح وساتر، خيط من قماش ثقيل غير شفاف. القصة واسعة تناسب مختلف الأجسام. مناسب للعمل، والجامعة، والخروج — يناسب كل مناسبة.",
    accent: "#8B4553",
  },
  {
    slug: "oudaya-dress",
    name_ar: "فستان أوداية",
    name_fr: "Robe Oudaya",
    collections: ["autumn"],
    price: 299,
    compare_at: 379,
    colors: [
      { id: "black",   name_ar: "أسود",   hex: "#1A1614" },
      { id: "green",   name_ar: "زيتوني", hex: "#4A5240" },
    ],
    sizes: ["S", "M", "L", "XL"],
    benefits: [
      "فستان طويل بأكمام كاملة",
      "قماش ناعم لا يتجعّد بسهولة",
      "مناسب للعمل والخروج",
      "الدفع عند الاستلام — التوصيل مجاني",
    ],
    description:
      "فستان بسيط وأنيق بخط مستقيم يناسب مختلف القامات. القماش خفيف وساتر بالكامل.",
    accent: "#2B2B2B",
  },
  {
    slug: "rabat-layer",
    name_ar: "تونيك الرباط",
    name_fr: "Tunique Rabat",
    collections: ["autumn"],
    price: 299,
    colors: [
      { id: "cream", name_ar: "كريمي", hex: "#E8DCC8" },
      { id: "burgundy", name_ar: "عنابي", hex: "#8B4553" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    benefits: [
      "تونيك واسع يُلبس فوق أي قطعة",
      "قماش متوسط السماكة، ساتر",
      "يتناسق مع البنطلون والفستان",
    ],
    description: "قطعة أساسية تُكمل أي إطلالة. واسعة، مريحة، وساترة.",
    accent: "#C4A574",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    slug: "chefchaouen-set",
    name: "خديجة",
    city: "مراكش",
    size: "M",
    rating: 5,
    verified: true,
    text: "عندي 1م65 و 62 كيلو، خديت M وجات نيشان 😍 التوب ساتر وما كيبانش منو، والصورة بحال الحقيقة.",
  },
  {
    id: "r2",
    slug: "chefchaouen-set",
    name: "سلمى",
    city: "الدار البيضاء",
    size: "L",
    rating: 5,
    verified: true,
    text: "طلبت جوج: العنابي والكحلي. وصلوني ف يومين والقياس صحيح من اللول. كيناسب الدوام بزاف، ننصح به.",
  },
  {
    id: "r3",
    slug: "chefchaouen-set",
    name: "نورة",
    city: "فاس",
    size: "XL",
    rating: 5,
    verified: true,
    text: "أخيراً ماركة كتكب المقاسات بالسنتيمتر. خديت XL على حسب الجدول وما احتجتش نبدّل. الخياطة زوينة بزاف.",
  },
  {
    id: "r4",
    slug: "chefchaouen-set",
    name: "إيمان",
    city: "طنجة",
    size: "S",
    rating: 4,
    verified: true,
    text: "أنيقة ومريحة. اللون العنابي أجمل فالطبيعة من التصويرة. التوصيل كان سريع والدفع عند الاستلام ساهل.",
  },
  {
    id: "r5",
    slug: "oudaya-dress",
    name: "فاطمة",
    city: "الرباط",
    size: "M",
    rating: 5,
    verified: true,
    text: "الفستان خفيف وساتر. لبّستو للخدمة وجا أنيق بلا ما نتعب. المقاس M مناسب لطولي 1م68.",
  },
  {
    id: "r6",
    slug: "oudaya-dress",
    name: "أسماء",
    city: "أكادير",
    size: "L",
    rating: 5,
    verified: true,
    text: "التوب ما كيتجعّدش من بعد ما نجلس. جاني كيف الصورة بالضبط. غادي نطلب الزيتوني حتى هو إن شاء الله.",
  },
  {
    id: "r7",
    slug: "rabat-layer",
    name: "حفصة",
    city: "وجدة",
    size: "L",
    rating: 5,
    verified: true,
    text: "التونيك واسع ومريح فوق البنطلون. خديت L ونادمة لي تردّدت. الجودة أحسن من الثمن صراحة.",
  },
  {
    id: "r8",
    slug: "rabat-layer",
    name: "ياسمين",
    city: "تطوان",
    size: "M",
    rating: 4,
    verified: true,
    text: "قطعة أساسية، ننصح بها. اللون الكريمي هادئ وكيمشي مع بزاف ديال الحوايج.",
  },
];

export function reviewsFor(slug: string) {
  return REVIEWS.filter((r) => r.slug === slug);
}

export function reviewStats(slug: string) {
  const list = reviewsFor(slug);
  if (list.length === 0) return { count: 0, average: 0 };
  const average = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return { count: list.length, average: Math.round(average * 10) / 10 };
}

export function getProduct(slug: string) {
  return CATALOG.find((p) => p.slug === slug);
}

export function productsByCollection(slug: CollectionSlug) {
  return CATALOG.filter((p) => p.collections.includes(slug));
}

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function formatPrice(amount: number) {
  return `${amount} درهم`;
}
