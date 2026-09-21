export const metadata = { title: "إدارة تاندا" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream">{children}</div>;
}
