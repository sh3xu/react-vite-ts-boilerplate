import { ActivityLog } from "./components/ActivityLog";
import { ProfileForm } from "./components/ProfileForm";
import { ProfileHeader } from "./components/ProfileHeader";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <ProfileHeader />
      <ProfileForm />
      <ActivityLog />
    </div>
  );
}
