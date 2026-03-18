import { useState } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type PostsQueryParams, usePostsPaginated } from "@/services/posts.service";

export default function Posts() {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<PostsQueryParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading, error } = usePostsPaginated(params);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-destructive">Error loading posts: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  const posts = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No posts available</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={page === pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Showing {(page - 1) * pagination.limit + 1} to {Math.min(page * pagination.limit, pagination.total)} of{" "}
                {pagination.total} posts
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
