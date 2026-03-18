import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserActions() {
  return (
    <Button className="w-full sm:w-auto">
      <Plus className="mr-2 h-4 w-4" />
      <span className="hidden sm:inline">Add User</span>
      <span className="sm:hidden">Add</span>
    </Button>
  );
}
