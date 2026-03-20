import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/lib/constants/routes";

export function CallToAction() {
  return (
    <Card className="mt-12 text-center">
      <CardHeader>
        <CardTitle>Ready to Get Started?</CardTitle>
        <CardDescription>Explore all available UI components or sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to={ROUTES.SHOWCASE}>View Components</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={ROUTES.LOGIN}>Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
