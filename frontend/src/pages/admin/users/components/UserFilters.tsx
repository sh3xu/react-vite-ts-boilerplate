import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function UserFilters() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <Field>
              <FieldLabel htmlFor="search">Search</FieldLabel>
              <Input id="search" placeholder="Search users..." />
            </Field>
          </div>
          <div className="flex-1 min-w-0">
            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Input id="role" placeholder="Filter by role..." />
            </Field>
          </div>
          <div className="flex items-end">
            <Button className="w-full sm:w-auto">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
