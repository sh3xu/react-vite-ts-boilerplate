import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function APISettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>Manage API keys and endpoints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input id="api-key" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-secret">API Secret</Label>
          <Input id="api-secret" type="password" placeholder="••••••••" />
        </div>
        <Button>Save API Settings</Button>
      </CardContent>
    </Card>
  );
}
