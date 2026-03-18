import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>System-wide configuration options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
          <input type="checkbox" id="maintenance-mode" className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="debug-mode">Debug Mode</Label>
          <input type="checkbox" id="debug-mode" className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-backup">Auto Backup</Label>
          <input type="checkbox" id="auto-backup" className="h-4 w-4" defaultChecked />
        </div>
        <Button>Save System Settings</Button>
      </CardContent>
    </Card>
  );
}
