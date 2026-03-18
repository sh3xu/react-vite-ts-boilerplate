import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/services/posts.service";

export function RecentActivity() {
  const { data: posts, isLoading, error } = usePosts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <p className="text-sm text-destructive">Error loading posts: {error.message}</p>
        ) : posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-0">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No posts available</p>
        )}
      </CardContent>
    </Card>
  );
}
