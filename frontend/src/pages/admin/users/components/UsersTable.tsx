import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { type Column, DataTable } from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

const allUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active" },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "User", status: "Inactive" },
  { id: "7", name: "Edward Norton", email: "edward@example.com", role: "User", status: "Active" },
  { id: "8", name: "Fiona Apple", email: "fiona@example.com", role: "User", status: "Active" },
  { id: "9", name: "George Lucas", email: "george@example.com", role: "Admin", status: "Active" },
  { id: "10", name: "Helen Keller", email: "helen@example.com", role: "User", status: "Inactive" },
  { id: "11", name: "Ian McKellen", email: "ian@example.com", role: "User", status: "Active" },
  { id: "12", name: "Julia Roberts", email: "julia@example.com", role: "User", status: "Active" },
];

export function UsersTable() {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = (userId: string, userName: string) => {
    console.log(`Deleting user: ${userName} (${userId})`);
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleView = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const openDeleteDialog = (userId: string, userName: string) => {
    setUserToDelete({ id: userId, name: userName });
    setDeleteDialogOpen(true);
  };

  const columns: Column<User>[] = [
    {
      header: "Name",
      accessor: "name",
      cell: (value) => <span className="font-medium">{value as string}</span>,
    },
    {
      header: "Email",
      accessor: "email",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      header: "Role",
      accessor: "role",
      cell: (value) => <span className="px-2 py-1 text-xs rounded bg-muted">{value as string}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => {
        const status = value as "Active" | "Inactive";
        return (
          <span
            className={`px-2 py-1 text-xs rounded ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "",
      accessor: "id",
      className: "w-[50px]",
      cell: (_value, row) => (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleView(row.id)} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log(`Edit user: ${row.name}`);
                }}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  openDeleteDialog(row.id, row.name);
                }}
                variant="destructive"
                className="cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={allUsers}
        columns={columns}
        getRowId={(row) => row.id}
        itemsPerPage={5}
        countLabel={(start, end, total) => `Showing ${start} to ${end} of ${total} users`}
      />
      {userToDelete && (
        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Delete User"
          description={`This will permanently delete ${userToDelete.name} from the system. This action cannot be undone.`}
          onConfirm={() => handleDelete(userToDelete.id, userToDelete.name)}
          confirmText="Delete"
          cancelText="Cancel"
          variant="destructive"
          icon={<Trash2 className="h-4 w-4 text-destructive" />}
          iconClassName="size-12"
        />
      )}
    </>
  );
}
