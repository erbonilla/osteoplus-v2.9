"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type RadioCardProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "id" | "children"> & {
  id: string;
  name: string;
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  ref?: React.Ref<HTMLInputElement>;
};

export function RadioCard({
  id,
  name,
  value,
  label,
  description,
  icon,
  selected,
  className,
  disabled,
  ref,
  ...props
}: RadioCardProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-12 cursor-pointer items-center gap-3 rounded-card border p-4 transition-colors",
        "hover:border-border-strong",
        "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-border-focus",
        selected
          ? "border-border-brand bg-bg-brand-subtle"
          : "border-border-default bg-surface-card",
        disabled && "pointer-events-none cursor-not-allowed bg-bg-tertiary text-text-tertiary",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={selected}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      {icon && (
        <span
          className={cn("shrink-0 text-text-secondary", selected && "text-brand-primary")}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold text-text-primary">{label}</span>
        {description && <span className="text-sm text-text-secondary">{description}</span>}
      </span>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-brand-primary" : "border-border-default",
        )}
        aria-hidden="true"
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />}
      </span>
    </label>
  );
}
