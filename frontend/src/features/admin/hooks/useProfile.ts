import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../api/profile";
import { ExtractFnReturnType, QueryConfig, MutationConfig } from "@/lib/react-query";

// Query Keys
export const profileKeys = {
    all: ["profile"] as const,
    detail: () => [...profileKeys.all, "detail"] as const,
};

// ============== GET PROFILE ==============
type GetProfileQueryFnType = typeof getProfile;

export const useProfile = (
    config?: QueryConfig<GetProfileQueryFnType>
) => {
    return useQuery<ExtractFnReturnType<GetProfileQueryFnType>>({
        queryKey: profileKeys.detail(),
        queryFn: getProfile,
        ...config,
    });
};

// ============== UPDATE PROFILE ==============
type UpdateProfileMutationFnType = typeof updateProfile;

export const useUpdateProfile = (
    config?: MutationConfig<UpdateProfileMutationFnType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
            // Also invalidate auth user data
            queryClient.invalidateQueries({ queryKey: ["authenticated-user"] });
            toast.success(data.message || "Profile updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update profile");
        },
        ...config,
    });
};

// ============== CHANGE PASSWORD ==============
type ChangePasswordMutationFnType = typeof changePassword;

export const useChangePassword = (
    config?: MutationConfig<ChangePasswordMutationFnType>
) => {
    return useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data.message || "Password changed successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to change password");
        },
        ...config,
    });
};
