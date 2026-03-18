import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export function ProfileHeader() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-6">
          {user?.avatar && <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full" />}
          <div>
            <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
            <p className="text-muted-foreground">{user?.email || "No email"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
