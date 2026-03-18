import { SystemSettings } from "./components/SystemSettings";

export default function SystemSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Manage system-wide configurations</p>
      </div>
      <SystemSettings />
    </div>
  );
}
