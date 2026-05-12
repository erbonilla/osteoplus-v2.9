"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type TextareaProps = Omit<ComponentPropsWithoutRef<"textarea">, "id"> & {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export function Textarea({
  id,
  label,
  helperText,
  error,
  className,
  ref,
  ...props
}: TextareaProps) {
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
      <textarea
        ref={ref}
        id={id}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        rows={3}
        className={cn(
          "w-full resize-y rounded-input border border-border-default bg-bg-primary px-3 py-2.5 font-body text-text-primary transition-colors [font-size:1rem] placeholder:text-text-tertiary",
          "focus-visible:border-border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "disabled:cursor-not-allowed disabled:bg-bg-tertiary disabled:text-text-tertiary",
          hasError && "border-feedback-error",
          className,
        )}
        {...props}
      />
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
