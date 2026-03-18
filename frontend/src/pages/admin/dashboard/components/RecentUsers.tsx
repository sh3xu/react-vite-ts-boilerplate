import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentUsers() {
  const users = [
    { name: "John Doe", email: "john@example.com", joined: "2 hours ago" },
    { name: "Jane Smith", email: "jane@example.com", joined: "5 hours ago" },
    { name: "Bob Johnson", email: "bob@example.com", joined: "1 day ago" },
    { name: "Alice Williams", email: "alice@example.com", joined: "2 days ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.email} className="flex items-center gap-4 border-b pb-4 last:border-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <p className="text-xs text-muted-foreground">{user.joined}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
