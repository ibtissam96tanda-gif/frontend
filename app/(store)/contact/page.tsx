import { BRAND } from "@/lib/catalog";

export const metadata = { title: "تواصل معنا" };

export default function ContactPage() {
  const wa = `https://wa.me/${BRAND.whatsapp}`;
  const ig = `https://instagram.com/${BRAND.instagram}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-3xl sm:text-4xl mb-10">تواصل معنا</h1>
      <div className="space-y-5 text-gray-700">
        <p>
          <strong className="block text-burgundy-700 mb-1">واتساب</strong>
          <a href={wa} className="ltr inline-block hover:text-burgundy-500" dir="ltr">
            {BRAND.whatsapp_display}
          </a>
        </p>
        <p>
          <strong className="block text-burgundy-700 mb-1">إنستغرام</strong>
          <a href={ig} target="_blank" rel="noopener noreferrer" className="ltr inline-block hover:text-burgundy-500" dir="ltr">
            @{BRAND.instagram}
          </a>
        </p>
      </div>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-10 bg-burgundy-500 text-cream font-bold px-8 py-3 rounded-full"
      >
        راسلينا على واتساب
      </a>
    </div>
  );
}
