import { cn } from "@/lib/utils/cn";

const variantStyles = {
  brand: "bg-bg-brand-subtle text-brand-primary border-border-brand",
  neutral: "bg-bg-secondary text-text-secondary border-border-default",
  success: "bg-feedback-success-subtle text-feedback-success border-feedback-success/30",
  warning: "bg-feedback-warning-subtle text-feedback-warning border-feedback-warning/30",
  error: "bg-feedback-error-subtle text-feedback-error border-feedback-error/30",
} as const;

type BadgeProps = {
  variant?: keyof typeof variantStyles;
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
