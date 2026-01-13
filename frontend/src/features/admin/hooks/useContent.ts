import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getContents,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
    ContentQueryParams,
} from "../api/content";
import { ExtractFnReturnType, QueryConfig, MutationConfig } from "@/lib/react-query";

// Query Keys
export const contentKeys = {
    all: ["contents"] as const,
    lists: () => [...contentKeys.all, "list"] as const,
    list: (params: ContentQueryParams) => [...contentKeys.lists(), params] as const,
    details: () => [...contentKeys.all, "detail"] as const,
    detail: (id: string) => [...contentKeys.details(), id] as const,
};

// ============== GET CONTENTS (LIST) ==============
type GetContentsQueryFnType = typeof getContents;

export const useContents = (
    params?: ContentQueryParams,
    config?: QueryConfig<GetContentsQueryFnType>
) => {
    return useQuery<ExtractFnReturnType<GetContentsQueryFnType>>({
        queryKey: contentKeys.list(params || {}),
        queryFn: () => getContents(params),
        ...config,
    });
};

// ============== GET CONTENT BY ID ==============
type GetContentByIdQueryFnType = typeof getContentById;

export const useContent = (
    id: string,
    config?: QueryConfig<GetContentByIdQueryFnType>
) => {
    return useQuery<ExtractFnReturnType<GetContentByIdQueryFnType>>({
        queryKey: contentKeys.detail(id),
        queryFn: () => getContentById(id),
        enabled: !!id,
        ...config,
    });
};

// ============== CREATE CONTENT ==============
type CreateContentMutationFnType = typeof createContent;

export const useCreateContent = (
    config?: MutationConfig<CreateContentMutationFnType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createContent,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
            toast.success(data.message || "Content created successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to create content");
        },
        ...config,
    });
};

// ============== UPDATE CONTENT ==============
type UpdateContentMutationFnType = typeof updateContent;

export const useUpdateContent = (
    config?: MutationConfig<UpdateContentMutationFnType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateContent,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: contentKeys.detail(variables.id) });
            toast.success(data.message || "Content updated successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to update content");
        },
        ...config,
    });
};

// ============== DELETE CONTENT ==============
type DeleteContentMutationFnType = typeof deleteContent;

export const useDeleteContent = (
    config?: MutationConfig<DeleteContentMutationFnType>
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteContent,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: contentKeys.lists() });
            toast.success(data.message || "Content deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete content");
        },
        ...config,
    });
};
