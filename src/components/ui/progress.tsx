import { cn } from "@/lib/utils/cn";

const variantStyles = {
  brand: "bg-brand-primary",
  success: "bg-feedback-success",
  warning: "bg-feedback-warning",
  accent: "bg-accent-default",
} as const;

type ProgressProps = {
  value: number;
  max?: number;
  label: string;
  variant?: keyof typeof variantStyles;
  className?: string;
};

export function Progress({ value, max = 100, label, variant = "brand", className }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("h-2 w-full overflow-hidden rounded-chip bg-bg-tertiary", className)}
    >
      <div
        className={cn("h-full rounded-chip transition-all", variantStyles[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
