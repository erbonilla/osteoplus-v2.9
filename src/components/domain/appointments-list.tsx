"use client";

import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { Appointment } from "@/lib/booking/types";
import { AppointmentCard } from "./appointment-card";

type AppointmentsListProps = {
  appointments: Appointment[];
  onBookAppointment: () => void;
};

export function AppointmentsList({ appointments, onBookAppointment }: AppointmentsListProps) {
  const t = useTranslations("appointments");
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const upcoming = appointments.filter((a) => a.status === "confirmed" || a.status === "pending");
  const past = appointments.filter((a) => a.status === "completed" || a.status === "cancelled");

  const displayList = tab === "upcoming" ? upcoming : past;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
      <h1 className="font-heading text-xl font-bold text-text-primary">{t("title")}</h1>

      <SegmentedControl
        name="appointmentTabs"
        value={tab}
        onChange={(v) => setTab(v as "upcoming" | "past")}
        options={[
          { value: "upcoming", label: t("tabs.upcoming") },
          { value: "past", label: t("tabs.past") },
        ]}
      />

      {displayList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            <h2 className="font-semibold text-text-primary">{t("empty.title")}</h2>
            <p className="text-sm text-text-secondary">{t("empty.body")}</p>
            <Button variant="primary" className="gap-2" onClick={onBookAppointment}>
              <CalendarPlus size={18} strokeWidth={2} />
              {t("empty.cta")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {displayList.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              serviceName={appointment.serviceName}
              practitionerName={appointment.practitionerName}
              date={appointment.date}
              time={appointment.time}
              durationMinutes={appointment.durationMinutes}
              location={appointment.location}
              status={appointment.status}
              compact={tab === "past"}
            />
          ))}
        </div>
      )}

      <p className="text-center text-sm text-text-tertiary">{t("detail.policy")}</p>
      <p className="text-center text-sm text-text-tertiary">{t("detail.help")}</p>
    </div>
  );
}
