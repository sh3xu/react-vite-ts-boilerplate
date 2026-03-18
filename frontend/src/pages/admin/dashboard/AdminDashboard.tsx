import { AnalyticsOverview } from "./components/AnalyticsOverview";
import { RecentUsers } from "./components/RecentUsers";
import { RevenueChart } from "./components/RevenueChart";
import { UserMetrics } from "./components/UserMetrics";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your platform</p>
      </div>

      <AnalyticsOverview />
      <UserMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RecentUsers />
      </div>
    </div>
  );
}
