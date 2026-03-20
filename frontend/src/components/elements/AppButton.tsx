"use client";

import { Loader2Icon } from "lucide-react";
import type * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";

type ButtonVariant = NonNullable<React.ComponentProps<typeof Button>["variant"]>;
type ButtonSize = NonNullable<React.ComponentProps<typeof Button>["size"]>;

export type AppButtonProps = Omit<React.ComponentProps<typeof Button>, "children" | "variant" | "size"> & {
  label?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  intent?: ButtonVariant;
  size?: ButtonSize;
};

export function AppButton({
  label,
  startIcon,
  endIcon,
  loading = false,
  intent = "default",
  size = "default",
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button variant={intent} size={size} disabled={disabled || loading} {...props}>
      {loading ? <Loader2Icon data-icon="inline-start" className="animate-spin" /> : startIcon}
      {label}
      {!loading && endIcon}
    </Button>
  );
}

export { buttonVariants };
