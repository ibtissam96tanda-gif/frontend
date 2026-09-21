import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <CheckoutModal />
      <main className="has-mobile-nav min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomNav />
    </>
  );
}
