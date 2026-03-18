import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/services/posts.service";

export function StatsCards() {
  const { data: posts, isLoading } = usePosts();

  const stats = [
    {
      label: "Total Posts",
      value: isLoading ? "..." : (posts?.length || 0).toString(),
      icon: ShoppingCart,
      loading: isLoading,
    },
    {
      label: "Status",
      value: "Active",
      icon: TrendingUp,
    },
    {
      label: "Users",
      value: "1,234",
      icon: Users,
    },
    {
      label: "Revenue",
      value: "$12,345",
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {stat.loading ? <LoadingSpinner size="sm" /> : <div className="text-2xl font-bold">{stat.value}</div>}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
