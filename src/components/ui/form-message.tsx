import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

const variantStyles = {
  helper: "text-text-tertiary",
  error: "text-feedback-error",
  success: "text-feedback-success",
} as const;

type FormMessageProps = {
  variant: keyof typeof variantStyles;
  children: ReactNode;
  id?: string;
  className?: string;
};

export function FormMessage({ variant, children, id, className }: FormMessageProps) {
  return (
    <p
      id={id}
      className={cn("text-sm", variantStyles[variant], className)}
      {...(variant === "error" ? { role: "alert" } : {})}
    >
      {children}
    </p>
  );
}
