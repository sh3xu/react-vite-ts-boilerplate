import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Configure general application settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="app-name">Application Name</Label>
          <Input id="app-name" defaultValue="Rvite Template" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="app-url">Application URL</Label>
          <Input id="app-url" defaultValue="https://example.com" />
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  );
}
