"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

// --- RadioGroup ---

type RadioGroupProps = Omit<ComponentPropsWithoutRef<"fieldset">, "children"> & {
  legend: string;
  hideLegend?: boolean;
  children: React.ReactNode;
  error?: string;
};

export function RadioGroup({
  legend,
  hideLegend = false,
  children,
  error,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)} {...props}>
      <legend className={cn("text-sm font-medium text-text-primary", hideLegend && "sr-only")}>
        {legend}
      </legend>
      <div className="flex flex-col gap-2">{children}</div>
      {error && (
        <p className="text-sm text-feedback-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

// --- RadioItem ---

type RadioItemProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "id"> & {
  id: string;
  label: string;
  description?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function RadioItem({ id, label, description, className, ref, ...props }: RadioItemProps) {
  const descriptionId = description ? `${id}-desc` : undefined;

  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-start gap-3 rounded-input border border-border-default bg-surface-card p-4 transition-colors",
        "hover:border-border-strong",
        "has-[:checked]:border-border-brand has-[:checked]:bg-bg-brand-subtle",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        id={id}
        aria-describedby={descriptionId}
        className={cn(
          "mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-brand-primary",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
          "disabled:cursor-not-allowed",
        )}
        {...props}
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold text-text-primary">{label}</span>
        {description && (
          <span id={descriptionId} className="text-sm text-text-secondary">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
