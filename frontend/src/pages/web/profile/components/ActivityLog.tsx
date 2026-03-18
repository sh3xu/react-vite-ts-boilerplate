import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityLog() {
  const activities = [
    { id: "1", action: "Logged in", time: "2 hours ago" },
    { id: "2", action: "Updated profile", time: "1 day ago" },
    { id: "3", action: "Changed password", time: "3 days ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
