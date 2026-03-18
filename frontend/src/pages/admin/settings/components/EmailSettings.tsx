import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>Configure email service settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="smtp-host">SMTP Host</Label>
          <Input id="smtp-host" placeholder="smtp.example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="smtp-port">SMTP Port</Label>
          <Input id="smtp-port" type="number" placeholder="587" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="from-email">From Email</Label>
          <Input id="from-email" type="email" placeholder="noreply@example.com" />
        </div>
        <Button>Save Email Settings</Button>
      </CardContent>
    </Card>
  );
}
