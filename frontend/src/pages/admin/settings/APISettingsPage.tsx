import { APISettings } from "./components/APISettings";

export default function APISettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">API Settings</h1>
        <p className="text-muted-foreground">Manage API keys and integrations</p>
      </div>
      <APISettings />
    </div>
  );
}
