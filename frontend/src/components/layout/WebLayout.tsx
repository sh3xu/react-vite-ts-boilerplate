import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface WebLayoutProps {
  children?: ReactNode;
}

export function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
