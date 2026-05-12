"use client";

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type SwitchProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "id" | "role"> & {
  id: string;
  label: string;
  description?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function Switch({ id, label, description, className, ref, ...props }: SwitchProps) {
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <label htmlFor={id} className="cursor-pointer text-base font-semibold text-text-primary">
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {/* group wrapper to allow group-has-[:checked] on the knob */}
      <span className="group relative mt-0.5 flex shrink-0 items-center">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          aria-describedby={descriptionId}
          aria-checked={props.checked ?? false}
          className="peer sr-only"
          {...props}
        />
        {/* Track — peer sibling of input */}
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-6 w-11 cursor-pointer items-center rounded-chip border-2 border-transparent transition-colors",
            "bg-bg-tertiary",
            "peer-checked:bg-brand-primary",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-focus",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          )}
        >
          {/* Knob — uses group-has to detect checked state from ancestor */}
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-white shadow-sm transition-transform",
              "group-has-[:checked]:translate-x-5",
            )}
          />
        </span>
      </span>
    </div>
  );
}
