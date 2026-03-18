import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserMetrics() {
  const userStats = [
    { period: "Today", new: 12, active: 234, total: 2543 },
    { period: "This Week", new: 89, active: 1234, total: 2543 },
    { period: "This Month", new: 456, active: 2100, total: 2543 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userStats.map((stat) => (
            <div key={stat.period} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{stat.period}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.new} new, {stat.active} active
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{stat.total}</p>
                <p className="text-xs text-muted-foreground">Total users</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
