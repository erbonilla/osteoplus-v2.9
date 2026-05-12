"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type TimeSlotProps = {
  id: string;
  time: string;
  selected?: boolean;
  available?: boolean;
  onSelect: (id: string) => void;
};

export function TimeSlot({ id, time, selected, available = true, onSelect }: TimeSlotProps) {
  const t = useTranslations("booking.calendar");

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      disabled={!available}
      aria-pressed={selected}
      aria-label={available ? time : `${time} — ${t("fullyBooked")}`}
      className={cn(
        "flex min-h-12 min-w-[4.5rem] items-center justify-center rounded-button border px-3 text-sm font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        selected
          ? "border-border-brand bg-brand-primary osteoplus-on-brand"
          : "border-border-default bg-surface-card hover:border-border-strong",
        !available && "pointer-events-none border-border-default bg-bg-tertiary text-text-tertiary",
      )}
    >
      {available ? (
        time
      ) : (
        <span className="flex flex-col items-center">
          <span>{time}</span>
          <span className="text-xs">{t("fullyBooked")}</span>
        </span>
      )}
    </button>
  );
}
