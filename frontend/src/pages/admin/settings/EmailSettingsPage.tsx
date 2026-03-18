import { EmailSettings } from "./components/EmailSettings";

export default function EmailSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Email Settings</h1>
        <p className="text-muted-foreground">Configure email service and templates</p>
      </div>
      <EmailSettings />
    </div>
  );
}
