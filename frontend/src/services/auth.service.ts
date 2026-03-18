import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { LoginCredentials, RegisterData, User } from "@/types/user.types";

type AuthTokens = {
  access: { token: string; expires: string };
  refresh: { token: string; expires: string };
};

type AuthResponse = {
  user: User;
  tokens: AuthTokens;
  message?: string;
};

type ForgotPasswordResponse = {
  success: true;
  data: {
    resetToken: string;
    emailToken: string;
    message?: string;
  };
};

const authApi = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<AuthResponse>("/v1/auth/login", credentials);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await apiClient.post<AuthResponse>("/v1/auth/register", userData);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await apiClient.get<{ data: User }>("/v1/auth/me");
    return data;
  },

  logout: async (refreshToken: string) => {
    await apiClient.post("/v1/auth/logout", { refreshToken });
  },

  forgotPassword: async (email: string) => {
    const { data } = await apiClient.post<ForgotPasswordResponse>("/v1/auth/forgot-password", { email });
    return data;
  },

  verifyOtp: async (params: { token: string; otp: string }) => {
    const { data } = await apiClient.post<{ success: true; message: string }>(`/v1/auth/verify-otp/${params.token}`, {
      otp: params.otp,
    });
    return data;
  },

  resendOtp: async (emailToken: string) => {
    const { data } = await apiClient.post<{ success: true; data: string; message?: string }>("/v1/auth/resend-otp", {
      emailToken,
    });
    return data;
  },

  resetPassword: async (params: { token: string; password: string }) => {
    const { data } = await apiClient.post<{ success: true; message: string }>(
      `/v1/auth/reset-password/${params.token}`,
      { password: params.password }
    );
    return data;
  },
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.tokens.access.token);
      localStorage.setItem("auth_refresh_token", data.tokens.refresh.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.tokens.access.token);
      localStorage.setItem("auth_refresh_token", data.tokens.refresh.token);
      queryClient.setQueryData(["user"], data.user);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await authApi.getCurrentUser();
      return res.data;
    },
    enabled: !!localStorage.getItem("auth_token"),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => authApi.logout(localStorage.getItem("auth_refresh_token") || ""),
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_refresh_token");
      queryClient.clear();
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (params: { token: string; otp: string }) => authApi.verifyOtp(params),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (emailToken: string) => authApi.resendOtp(emailToken),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (params: { token: string; password: string }) => authApi.resetPassword(params),
  });
};
