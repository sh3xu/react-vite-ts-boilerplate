import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RevenueChart() {
  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 },
    { month: "Jun", revenue: 67000 },
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {revenueData.map((data) => (
            <div key={data.month} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{data.month}</span>
                <span className="font-medium">${data.revenue.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
