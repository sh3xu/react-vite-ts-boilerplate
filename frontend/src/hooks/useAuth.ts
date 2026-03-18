import { useCurrentUser, useLogout } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const { setUser, setToken } = useAuthStore();

  const isAuthenticated = !!user && !!localStorage.getItem("auth_token");

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        useAuthStore.getState().logout();
      },
    });
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout: handleLogout,
    setUser,
    setToken,
  };
}
