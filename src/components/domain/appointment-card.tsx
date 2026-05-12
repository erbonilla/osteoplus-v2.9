"use client";

import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AppointmentStatus } from "@/lib/booking/types";
import { cn } from "@/lib/utils/cn";

const statusVariant: Record<AppointmentStatus, "success" | "warning" | "error" | "neutral"> = {
  confirmed: "success",
  pending: "warning",
  cancelled: "error",
  completed: "neutral",
};

type AppointmentCardProps = {
  serviceName: string;
  practitionerName: string;
  date: string;
  time: string;
  durationMinutes: number;
  location: string;
  status: AppointmentStatus;
  compact?: boolean;
  onViewDetails?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  className?: string;
};

export function AppointmentCard({
  serviceName,
  practitionerName,
  date,
  time,
  durationMinutes,
  location,
  status,
  compact,
  onViewDetails,
  onReschedule,
  onCancel,
  className,
}: AppointmentCardProps) {
  const t = useTranslations("appointments");

  const isActive = status === "confirmed" || status === "pending";

  return (
    <Card className={cn(isActive && "border-border-brand", className)}>
      <CardContent className={cn(compact ? "p-3" : "p-4")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-text-primary">{serviceName}</span>
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <User size={14} strokeWidth={2} aria-hidden="true" />
              <span>{practitionerName}</span>
            </div>
          </div>
          <Badge variant={statusVariant[status]}>{t(`status.${status}`)}</Badge>
        </div>

        <div className={cn("mt-3 flex flex-col gap-1.5", compact && "mt-2")}>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Calendar size={14} strokeWidth={2} aria-hidden="true" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Clock size={14} strokeWidth={2} aria-hidden="true" />
            <span>
              {time} ({durationMinutes} min)
            </span>
          </div>
          {!compact && (
            <div className="flex items-center gap-1.5 text-sm text-text-secondary">
              <MapPin size={14} strokeWidth={2} aria-hidden="true" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {!compact && isActive && (
          <div className="mt-4 flex flex-wrap gap-2">
            {onViewDetails && (
              <Button variant="secondary" size="sm" onClick={onViewDetails}>
                {t("card.viewDetails")}
              </Button>
            )}
            {onReschedule && (
              <Button variant="outline" size="sm" onClick={onReschedule}>
                {t("card.reschedule")}
              </Button>
            )}
            {onCancel && (
              <Button variant="ghost" size="sm" onClick={onCancel}>
                {t("card.cancel")}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
