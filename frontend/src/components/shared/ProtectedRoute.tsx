import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/lib/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "./PageLoader";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
}
