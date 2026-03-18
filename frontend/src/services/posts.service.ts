import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface PaginatedPostsResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PostsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const postsApi = {
  getPosts: async () => {
    const { data } = await apiClient.get<Post[]>("/posts");
    return data;
  },

  getPostsPaginated: async (params: PostsQueryParams = {}) => {
    const { page = 1, limit = 10, sortBy, sortOrder = "desc" } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(sortBy && { sortBy, sortOrder }),
    });
    const { data } = await apiClient.get<PaginatedPostsResponse>(`/posts?${queryParams.toString()}`);
    return data;
  },

  getPost: async (id: string) => {
    const { data } = await apiClient.get<Post>(`/posts/${id}`);
    return data;
  },

  createPost: async (post: Omit<Post, "id" | "createdAt">) => {
    const { data } = await apiClient.post<Post>("/posts", post);
    return data;
  },

  updatePost: async ({ id, ...post }: Partial<Post> & { id: string }) => {
    const { data } = await apiClient.put<Post>(`/posts/${id}`, post);
    return data;
  },

  deletePost: async (id: string) => {
    await apiClient.delete(`/posts/${id}`);
  },
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
  });
};

export const usePostsPaginated = (params: PostsQueryParams = {}) => {
  const { page = 1, limit = 10, sortBy, sortOrder } = params;
  return useQuery({
    queryKey: ["posts", "paginated", { page, limit, sortBy, sortOrder }],
    queryFn: () => postsApi.getPostsPaginated(params),
  });
};

export const useInfinitePosts = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite", { limit }],
    queryFn: ({ pageParam = 1 }) => postsApi.getPostsPaginated({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      return pagination.page < pagination.totalPages ? pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", data.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
