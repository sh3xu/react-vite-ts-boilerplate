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
import type { ButtonProps } from "@/components/ui/button";

interface ConfirmDialogProps {
  trigger?: ReactNode;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  size?: "default" | "sm";
  icon?: ReactNode;
  iconClassName?: string;
  confirmVariant?: ButtonProps["variant"];
  cancelVariant?: ButtonProps["variant"];
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
  size = "default",
  icon,
  iconClassName,
  confirmVariant,
  cancelVariant,
  disabled = false,
  open,
  onOpenChange,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const defaultConfirmVariant = variant === "destructive" ? "destructive" : "default";
  const defaultCancelVariant = variant === "destructive" ? "outline" : "outline";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <AlertDialogTrigger asChild disabled={disabled}>
          {trigger}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {icon && <AlertDialogMedia className={iconClassName}>{icon}</AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={cancelVariant || defaultCancelVariant} onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction variant={confirmVariant || defaultConfirmVariant} onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
