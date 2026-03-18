import { UserActions } from "./components/UserActions";
import { UserFilters } from "./components/UserFilters";
import { UsersTable } from "./components/UsersTable";

export default function Users() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Users</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage all users in your platform</p>
        </div>
        <UserActions />
      </div>

      <UserFilters />
      <div className="w-full overflow-hidden">
        <UsersTable />
      </div>
    </div>
  );
}
