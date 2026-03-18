import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsOverview() {
  const metrics = [
    { label: "Total Revenue", value: "$125,430", change: "+12.5%", icon: DollarSign },
    { label: "Active Users", value: "2,543", change: "+8.2%", icon: Users },
    { label: "Growth Rate", value: "24.3%", change: "+2.1%", icon: TrendingUp },
    { label: "Activity", value: "1,234", change: "+15.3%", icon: Activity },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
