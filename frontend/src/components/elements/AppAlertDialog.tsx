import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AppAlertDialogProps = {
  trigger: ReactNode;
  title: string;
  description: ReactNode;
  icon?: ReactNode;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm";
};

export function AppAlertDialog({
  trigger,
  title,
  description,
  icon,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "default",
  size = "sm",
}: AppAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {icon && <AlertDialogMedia>{icon}</AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
