import { SiteFooter, TopNav } from "@/components/blocks";

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-surface text-ink">
    <TopNav />
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 md:pt-12">
      {children}
    </main>
    <SiteFooter />
  </div>
);
