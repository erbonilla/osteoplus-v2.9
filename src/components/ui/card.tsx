import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  selected?: boolean;
  interactive?: boolean;
  error?: boolean;
};

export function Card({ selected, interactive, error, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border bg-surface-card shadow-card transition-colors",
        interactive && "cursor-pointer hover:border-border-strong",
        selected && "border-border-brand shadow-elevated",
        error && "border-feedback-error",
        !selected && !error && "border-border-default",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = ComponentPropsWithoutRef<"div">;

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("flex flex-col gap-1.5 p-4 pb-0", className)} {...props} />;
}

type CardContentProps = ComponentPropsWithoutRef<"div">;

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-4", className)} {...props} />;
}

type CardFooterProps = ComponentPropsWithoutRef<"div">;

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("flex items-center gap-2 border-t border-border-default p-4", className)}
      {...props}
    />
  );
}
