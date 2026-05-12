"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type PhoneInputProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "id"> & {
  id: string;
  label: string;
  countryCodeLabel: string;
  helperText?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function PhoneInput({
  id,
  label,
  countryCodeLabel,
  helperText,
  error,
  className,
  ref,
  ...props
}: PhoneInputProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const hasError = Boolean(error);

  const describedBy =
    [hasError ? errorId : undefined, helperText ? helperId : undefined].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="flex">
        <span
          className={cn(
            "flex items-center rounded-l-input border border-r-0 border-border-default bg-bg-secondary px-3 text-sm text-text-secondary",
            hasError && "border-feedback-error",
          )}
          aria-hidden="true"
        >
          {countryCodeLabel}
        </span>
        <input
          ref={ref}
          id={id}
          type="tel"
          inputMode="tel"
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-12 w-full rounded-r-input border border-border-default bg-bg-primary px-3 font-body text-text-primary transition-colors [font-size:1rem] placeholder:text-text-tertiary",
            "focus-visible:border-border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
            "disabled:cursor-not-allowed disabled:bg-bg-tertiary disabled:text-text-tertiary",
            hasError && "border-feedback-error",
            className,
          )}
          {...props}
        />
      </div>
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
