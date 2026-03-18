import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";

export function TermsCheckbox() {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <input type="checkbox" id="terms" className="h-4 w-4" />
      <Label htmlFor="terms" className="text-muted-foreground">
        I agree to the{" "}
        <Link to="/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="underline">
          Privacy Policy
        </Link>
      </Label>
    </div>
  );
}
