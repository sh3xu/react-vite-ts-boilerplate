import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import type { Toast } from "react-hot-toast";
import { Toaster as HotToaster, toast as hotToast } from "react-hot-toast";
import { cn } from "@/lib/utils";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "loading";
}

function CustomToast({
  t,
  title,
  description,
  variant,
}: {
  t: Toast;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "loading";
}) {
  const isSuccess = variant === "success";
  const isError = variant === "error";
  const isLoading = variant === "loading";

  const getIcon = () => {
    if (isSuccess) {
      return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
    }
    if (isError) {
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
    if (isLoading) {
      return <Loader2 className="h-5 w-5 animate-spin text-foreground" />;
    }
    return null;
  };

  return (
    <div
      className={cn(
        "max-w-md w-full shadow-lg rounded-lg pointer-events-auto flex ring-1 transition-all duration-300 relative bg-background text-foreground ring-border",
        t.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      <div className="flex-1 w-0 p-4 pr-10">
        <div className="flex items-start">
          {getIcon() && <div className="shrink-0 mr-3 mt-0.5">{getIcon()}</div>}
          <div className={cn("flex-1", !getIcon() && "ml-3")}>
            {title && <p className="text-sm font-medium">{title}</p>}
            {description && <p className={cn("text-sm", title ? "mt-1 opacity-90" : "")}>{description}</p>}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => hotToast.dismiss(t.id)}
        className="absolute top-2 right-2 rounded-md p-1 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-opacity"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  return {
    toast: (props: ToastProps) => {
      const { title, description, variant } = props;

      hotToast.custom((t) => <CustomToast t={t} title={title} description={description} variant={variant} />, {
        duration: 4000,
      });
    },
  };
}

export function Toaster() {
  return <HotToaster position="bottom-right" />;
}
