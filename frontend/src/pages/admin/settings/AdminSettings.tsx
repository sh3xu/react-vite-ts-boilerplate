import { APISettings } from "./components/APISettings";
import { EmailSettings } from "./components/EmailSettings";
import { GeneralSettings } from "./components/GeneralSettings";
import { SystemSettings } from "./components/SystemSettings";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Manage system-wide settings and configurations</p>
      </div>

      <GeneralSettings />
      <EmailSettings />
      <APISettings />
      <SystemSettings />
    </div>
  );
}
