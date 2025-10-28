import { TopNav, BottomNav, DashboardSidebar } from "@/components/blocks";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <TopNav />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 pb-20 pt-8">
        <DashboardSidebar />
        <div className="flex-1 space-y-6">{children}</div>
      </div>
      <BottomNav />
    </div>
  );
}
