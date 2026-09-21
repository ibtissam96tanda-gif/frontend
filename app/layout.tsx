import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tandabrand.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#8B4553",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TANDA Brand — فن الأنوثة العصرية",
    template: "%s | TANDA Brand",
  },
  description:
    "تاندا براند — علامة مغربية للملابس النسائية. مجموعة الخريف والشتاء قريباً. توصيل مجاني. الدفع عند الاستلام.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "TANDA Brand",
    description: "فن الأنوثة العصرية — علامة مغربية للملابس النسائية",
    siteName: "TANDA Brand",
    url: siteUrl,
    locale: "ar_MA",
    type: "website",
    images: [{ url: "/brand/logo-tanda.jpg", width: 1024, height: 1024, alt: "TANDA Brand" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
