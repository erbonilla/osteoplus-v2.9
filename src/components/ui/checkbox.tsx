"use client";

import { Check } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "id"> & {
  id: string;
  label: string | ReactNode;
  helperText?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function Checkbox({
  id,
  label,
  helperText,
  error,
  className,
  ref,
  ...props
}: CheckboxProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);

  const describedBy =
    [hasError ? errorId : undefined, helperText ? helperId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn("flex min-h-12 cursor-pointer items-center gap-3", className)}
      >
        <span className="relative flex shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-[4px] border border-border-default bg-bg-primary transition-colors",
              "peer-checked:border-brand-primary peer-checked:bg-brand-primary",
              "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus",
              "peer-disabled:cursor-not-allowed peer-disabled:bg-bg-tertiary peer-disabled:border-border-default",
              "[&>svg]:scale-0 [&>svg]:transition-transform peer-checked:[&>svg]:scale-100",
              hasError && "border-feedback-error",
            )}
            aria-hidden="true"
          >
            <Check size={14} strokeWidth={3} className="text-text-inverse" />
          </span>
        </span>
        <span className="text-sm text-text-primary">{label}</span>
      </label>

      {hasError && (
        <p id={errorId} className="text-sm text-feedback-error" role="alert">
          {error}
        </p>
      )}
      {helperText && !hasError && (
        <p id={helperId} className="text-sm text-text-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
}
