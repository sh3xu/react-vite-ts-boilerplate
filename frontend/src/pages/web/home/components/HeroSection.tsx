import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export function HeroSection() {
  return (
    <div className="text-center space-y-6 mb-12">
      <h1 className="text-4xl font-bold">Welcome to Rvite Template</h1>
      <p className="text-xl text-muted-foreground">A production-ready Rvite template with Web and Admin panels</p>
      <div className="flex gap-4 justify-center">
        <Button asChild>
          <Link to={ROUTES.SHOWCASE}>View Components</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </Button>
      </div>
    </div>
  );
}
