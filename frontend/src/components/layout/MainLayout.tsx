import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={cn("flex-1 p-6 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-0")}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
