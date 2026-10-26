import { Suspense } from "react";
import { MobileNav, MobileNavList } from "@/components/layout/MobileNav";
import { PlayerBar } from "@/components/layout/PlayerBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

/** Main application shell: sidebar, top bar, content and persistent player. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
        <PlayerBar />
        <Suspense fallback={<MobileNavList pathname={null} />}>
          <MobileNav />
        </Suspense>
      </div>
    </div>
  );
}
