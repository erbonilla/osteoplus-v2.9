"use client";

import { Calendar, Clock, MapPin, Stethoscope, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type BookingSummaryCardProps = {
  serviceName: string;
  practitionerName?: string;
  date: string;
  time: string;
  durationMinutes: number;
  location: string;
  priceEur: number;
  className?: string;
};

export function BookingSummaryCard({
  serviceName,
  practitionerName,
  date,
  time,
  durationMinutes,
  location,
  priceEur,
  className,
}: BookingSummaryCardProps) {
  const t = useTranslations("booking.summary");

  const rows = [
    { icon: Stethoscope, label: t("service"), value: serviceName },
    practitionerName ? { icon: User, label: t("practitioner"), value: practitionerName } : null,
    { icon: Calendar, label: t("date"), value: date },
    { icon: Clock, label: t("time"), value: `${time} (${durationMinutes} min)` },
    { icon: MapPin, label: t("location"), value: location },
  ].filter(Boolean);

  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-sm font-semibold text-text-primary">{t("title")}</h3>
      </CardHeader>
      <CardContent>
        <dl className="flex flex-col gap-3">
          {rows.map((row) => {
            if (!row) return null;
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex items-start gap-3">
                <Icon
                  size={18}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-text-tertiary"
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col gap-0.5">
                  <dt className="text-xs text-text-tertiary">{row.label}</dt>
                  <dd className="text-sm font-medium text-text-primary">{row.value}</dd>
                </div>
              </div>
            );
          })}
        </dl>
        <div className="mt-3 flex items-center justify-between border-t border-border-default pt-3">
          <span className="text-sm text-text-secondary">{t("price")}</span>
          <Badge variant="brand">{priceEur} €</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
