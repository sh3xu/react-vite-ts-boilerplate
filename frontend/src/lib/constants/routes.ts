export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFY: "/otp-verify",
  RESET_PASSWORD: "/reset-password/:token",

  SHOWCASE: "/showcase",

  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_DETAILS: "/admin/users/:id",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_SETTINGS_GENERAL: "/admin/settings/general",
  ADMIN_SETTINGS_SYSTEM: "/admin/settings/system",
  ADMIN_SETTINGS_EMAIL: "/admin/settings/email",
  ADMIN_SETTINGS_API: "/admin/settings/api",
  ADMIN_TEMPLATE_DETAIL: "/admin/template/:id",
  ADMIN_PROFILE: "/admin/profile",

  UNAUTHORIZED: "/unauthorized",
} as const;
