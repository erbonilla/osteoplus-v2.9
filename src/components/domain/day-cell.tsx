"use client";

import { cn } from "@/lib/utils/cn";

type DayCellProps = {
  dateLabel: string;
  dayOfWeek: string;
  selected?: boolean;
  available?: boolean;
  onClick: () => void;
};

export function DayCell({
  dateLabel,
  dayOfWeek,
  selected,
  available = true,
  onClick,
}: DayCellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!available}
      aria-pressed={selected}
      aria-label={`${dayOfWeek} ${dateLabel}`}
      className={cn(
        "flex min-h-16 min-w-14 flex-col items-center justify-center gap-0.5 rounded-card border px-2 py-2 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        selected
          ? "border-border-brand bg-brand-primary osteoplus-on-brand"
          : "border-border-default bg-surface-card hover:border-border-strong",
        !available && "pointer-events-none border-border-default bg-bg-tertiary text-text-tertiary",
      )}
    >
      <span
        className={cn(
          "text-xs font-medium",
          selected ? "osteoplus-on-brand" : "text-text-secondary",
        )}
      >
        {dayOfWeek}
      </span>
      <span
        className={cn(
          "text-sm font-semibold",
          selected ? "osteoplus-on-brand" : "text-text-primary",
        )}
      >
        {dateLabel}
      </span>
    </button>
  );
}
