import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex relative">
        <Sidebar />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <main
          className={cn(
            "flex-1 p-4 sm:p-6 transition-all duration-300 ease-in-out min-w-0",
            sidebarOpen && (sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"),
            !sidebarOpen && "lg:ml-64"
          )}
        >
          <div className="w-full max-w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
