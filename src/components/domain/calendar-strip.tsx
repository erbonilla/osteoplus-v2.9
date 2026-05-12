"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { IconButton } from "@/components/ui/icon-button";
import type { DayData } from "@/lib/booking/types";
import { DayCell } from "./day-cell";

type CalendarStripProps = {
  days: DayData[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  formatDayOfWeek: (date: string) => string;
  formatDateLabel: (date: string) => string;
  className?: string;
};

export function CalendarStrip({
  days,
  selectedDate,
  onSelectDate,
  onPrevWeek,
  onNextWeek,
  formatDayOfWeek,
  formatDateLabel,
  className,
}: CalendarStripProps) {
  const t = useTranslations("booking.calendar");

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2">
        <IconButton aria-label={t("viewFullMonth")} onClick={onPrevWeek}>
          <ChevronLeft size={20} strokeWidth={2} />
        </IconButton>
        <div className="flex flex-1 gap-1.5 overflow-x-auto px-1 py-1">
          {days.map((day) => (
            <DayCell
              key={day.date}
              dateLabel={formatDateLabel(day.date)}
              dayOfWeek={formatDayOfWeek(day.date)}
              selected={day.date === selectedDate}
              available={day.available}
              onClick={() => onSelectDate(day.date)}
            />
          ))}
        </div>
        <IconButton aria-label={t("viewFullMonth")} onClick={onNextWeek}>
          <ChevronRight size={20} strokeWidth={2} />
        </IconButton>
      </div>
    </div>
  );
}
