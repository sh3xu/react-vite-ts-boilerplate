import { Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Maintenance() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6" />
            <CardTitle>Under Maintenance</CardTitle>
          </div>
          <CardDescription>We're performing scheduled maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">We'll be back shortly. Thank you for your patience.</p>
        </CardContent>
      </Card>
    </div>
  );
}
