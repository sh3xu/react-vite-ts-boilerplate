import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CallToAction() {
  return (
    <Card className="mt-12 text-center">
      <CardHeader>
        <CardTitle>Ready to Get Started?</CardTitle>
        <CardDescription>Start building your next amazing application with this template</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/dashboard">View Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
