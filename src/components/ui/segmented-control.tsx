"use client";

import { cn } from "@/lib/utils/cn";

type SegmentedControlOption = {
  value: string;
  label: string;
};

type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
};

export function SegmentedControl({
  options,
  value,
  onChange,
  name,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={cn(
        "inline-flex w-full rounded-button border border-border-default bg-bg-secondary p-1",
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex min-h-10 flex-1 cursor-pointer items-center justify-center rounded-button px-3 text-sm font-medium transition-colors",
              "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-border-focus",
              isSelected
                ? "bg-surface-card text-text-primary shadow-card"
                : "text-text-secondary hover:text-text-primary",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
