import { AccountSettings } from "./components/AccountSettings";
import { NotificationSettings } from "./components/NotificationSettings";
import { SecuritySettings } from "./components/SecuritySettings";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <AccountSettings />
      <NotificationSettings />
      <SecuritySettings />
    </div>
  );
}
