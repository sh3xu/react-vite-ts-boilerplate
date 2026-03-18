import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { WebLayout } from "@/components/layout/WebLayout";

import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import {
  AdminDashboard,
  AdminSettings,
  Analytics,
  APISettingsPage,
  EmailSettingsPage,
  GeneralSettingsPage,
  SystemSettingsPage,
  Template,
  Users,
} from "@/pages/admin";
import { ForgotPassword, Login, OtpVerify, Register, ResetPassword } from "@/pages/auth";
import { NotFound, Unauthorized } from "@/pages/shared";
import { Dashboard, Home, Profile, Settings } from "@/pages/web";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verify/:token" element={<OtpVerify />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Web Panel Routes */}
          <Route
            path="/"
            element={
              <WebLayout>
                <Home />
              </WebLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <WebLayout>
                  <Dashboard />
                </WebLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <WebLayout>
                  <Profile />
                </WebLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <WebLayout>
                  <Settings />
                </WebLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Panel Routes - No auth required for demo */}
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <Users.Users />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <AdminLayout>
                <Users.UserDetails />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings/general"
            element={
              <AdminLayout>
                <GeneralSettingsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings/system"
            element={
              <AdminLayout>
                <SystemSettingsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings/email"
            element={
              <AdminLayout>
                <EmailSettingsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/settings/api"
            element={
              <AdminLayout>
                <APISettingsPage />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/template/:id"
            element={
              <AdminLayout>
                <Template.TemplateDetail />
              </AdminLayout>
            }
          />

          {/* Shared Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
