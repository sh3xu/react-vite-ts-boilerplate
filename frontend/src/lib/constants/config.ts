export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "Rvite Template",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",
} as const;
