import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function AdminProfile() {
  const { user } = useAuth();
  const name = user?.name ?? "";
  const email = user?.email ?? "";

  const getInitials = (n: string) =>
    n
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your account details.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar size="lg" className="size-20">
              {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="text-xl">
                {user?.name ? getInitials(user.name) : <UserIcon className="size-8" />}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{user?.name ?? "Admin User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email ?? ""}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your name and email address.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire up to update user mutation
              }}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="admin-profile-name">Full Name</FieldLabel>
                  <Input id="admin-profile-name" value={name} readOnly placeholder="Your name" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="admin-profile-email">Email Address</FieldLabel>
                  <Input id="admin-profile-email" type="email" value={email} readOnly placeholder="your@email.com" />
                </Field>
              </FieldGroup>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
