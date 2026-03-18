import { useEffect, useRef } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInfinitePosts } from "@/services/posts.service";

export function InfinitePosts() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfinitePosts(10);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  const posts = data?.pages.flatMap((page) => page.data) || [];
  const totalPosts = data?.pages[0]?.pagination.total || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Posts (Infinite Scroll)</CardTitle>
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

              <div ref={loadMoreRef} className="py-4">
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                  </div>
                )}
                {!hasNextPage && posts.length > 0 && (
                  <p className="text-center text-sm text-muted-foreground">All {totalPosts} posts loaded</p>
                )}
              </div>

              {!isFetchingNextPage && hasNextPage && (
                <div className="flex justify-center py-4">
                  <Button onClick={() => fetchNextPage()} variant="outline">
                    Load More
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
