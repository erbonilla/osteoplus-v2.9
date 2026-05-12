"use client";

import { useRouter } from "next/navigation";
import { sampleAppointments } from "@/lib/booking/fixtures";
import { AppointmentsList } from "./appointments-list";

type AppointmentsPageClientProps = {
  locale: string;
};

export function AppointmentsPageClient({ locale }: AppointmentsPageClientProps) {
  const router = useRouter();

  return (
    <AppointmentsList
      appointments={sampleAppointments}
      onBookAppointment={() => router.push(`/${locale}/booking`)}
    />
  );
}
