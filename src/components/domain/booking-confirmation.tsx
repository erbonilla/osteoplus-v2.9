"use client";

import { CalendarPlus, CheckCircle, MapPin, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { BookingConfirmationData } from "@/lib/booking/types";
import { BookingSummaryCard } from "./booking-summary-card";

type BookingConfirmationProps = {
  data: BookingConfirmationData;
  onReturnHome: () => void;
  onBookAnother: () => void;
};

export function BookingConfirmation({
  data,
  onReturnHome,
  onBookAnother,
}: BookingConfirmationProps) {
  const t = useTranslations("booking.confirmation");
  const tHelp = useTranslations("booking.help");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-4 py-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-feedback-success-subtle">
          <CheckCircle size={32} strokeWidth={2} className="text-feedback-success" />
        </span>
        <h1 className="font-heading text-2xl font-bold text-text-primary">{t("title")}</h1>
        <p className="text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="flex items-center gap-2 rounded-chip bg-bg-secondary px-4 py-2">
        <span className="text-sm text-text-tertiary">{t("bookingCode")}</span>
        <span className="font-data text-sm font-semibold text-text-primary">
          {data.bookingCode}
        </span>
      </div>

      <BookingSummaryCard
        serviceName={data.serviceName}
        practitionerName={data.practitionerName}
        date={data.date}
        time={data.time}
        durationMinutes={data.durationMinutes}
        location={data.location}
        priceEur={data.priceEur}
        className="w-full"
      />

      <p className="text-center text-sm text-text-secondary">{t("paymentNote")}</p>

      <div className="flex w-full flex-col gap-3">
        <Button variant="secondary" size="lg" className="w-full gap-2">
          <CalendarPlus size={18} strokeWidth={2} />
          {t("actions.addToCalendar")}
        </Button>
        <Button variant="secondary" size="lg" className="w-full gap-2">
          <MapPin size={18} strokeWidth={2} />
          {t("actions.getDirections")}
        </Button>
        <Button variant="primary" size="lg" className="w-full gap-2" onClick={onBookAnother}>
          <RotateCcw size={18} strokeWidth={2} />
          {t("actions.bookAnother")}
        </Button>
        <Button variant="ghost" size="lg" className="w-full" onClick={onReturnHome}>
          {t("actions.returnHome")}
        </Button>
      </div>

      <p className="text-center text-sm text-text-tertiary">{t("help")}</p>
      <p className="text-center text-sm text-text-tertiary">{tHelp("phoneLine")}</p>
    </div>
  );
}
