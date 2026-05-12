"use client";

import { CalendarPlus, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Appointment } from "@/lib/booking/types";
import { AppointmentCard } from "./appointment-card";

type ProfileAppointmentsSectionProps = {
  nextAppointment: Appointment | null;
  onBookAppointment: () => void;
  onViewAllAppointments: () => void;
  onCallClinic?: () => void;
};

export function ProfileAppointmentsSection({
  nextAppointment,
  onBookAppointment,
  onViewAllAppointments,
  onCallClinic,
}: ProfileAppointmentsSectionProps) {
  const tProfile = useTranslations("profile.nextAppointment");
  const tQuick = useTranslations("appointments.quickActions");

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-text-primary">{tProfile("title")}</h2>

      {nextAppointment ? (
        <AppointmentCard
          serviceName={nextAppointment.serviceName}
          practitionerName={nextAppointment.practitionerName}
          date={nextAppointment.date}
          time={nextAppointment.time}
          durationMinutes={nextAppointment.durationMinutes}
          location={nextAppointment.location}
          status={nextAppointment.status}
          onViewDetails={onViewAllAppointments}
        />
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-text-secondary">{tProfile("empty")}</p>
            <Button variant="primary" onClick={onBookAppointment}>
              {tProfile("bookCta")}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-text-secondary">{tQuick("title")}</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" className="gap-2" onClick={onBookAppointment}>
            <CalendarPlus size={16} strokeWidth={2} />
            {tQuick("bookNew")}
          </Button>
          <Button variant="secondary" size="sm" className="gap-2" onClick={onCallClinic}>
            <Phone size={16} strokeWidth={2} />
            {tQuick("callClinic")}
          </Button>
          <Button variant="secondary" size="sm" className="gap-2">
            <MapPin size={16} strokeWidth={2} />
            {tQuick("getDirections")}
          </Button>
        </div>
      </div>
    </div>
  );
}
