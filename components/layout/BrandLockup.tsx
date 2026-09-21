import Link from "next/link";

interface BrandLockupProps {
  href?: string;
  inverted?: boolean;
  size?: "sm" | "md";
}

export default function BrandLockup({ href = "/", inverted = false, size = "sm" }: BrandLockupProps) {
  const text = size === "md" ? "text-[1.65rem]" : "text-[1.05rem] sm:text-[1.2rem]";
  const mark = size === "md" ? "h-10 w-auto" : "h-8 sm:h-9 w-auto";
  const color = inverted ? "text-cream" : "text-burgundy-700";
  const hanger = inverted ? "brightness-0 invert" : "";

  const inner = (
    <span dir="ltr" className={`inline-flex items-center ${color}`}>
      <span className={`font-brand ${text} font-semibold tracking-[0.18em] uppercase leading-none`}>TANDA</span>
      <img
        src="/brand/logo-hanger.png"
        alt=""
        className={`block ${mark} ml-0.5 mr-2.5 ${hanger}`}
      />
      <span className={`font-brand ${text} font-semibold tracking-[0.18em] uppercase leading-none`}>BRAND</span>
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="shrink-0 inline-flex items-center" aria-label="TANDA BRAND">
      {inner}
    </Link>
  );
}
