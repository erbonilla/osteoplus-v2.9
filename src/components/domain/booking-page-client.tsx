"use client";

import { useRouter } from "next/navigation";
import { BookingWizard } from "./booking-wizard";

type BookingPageProps = {
  locale: string;
};

export function BookingPage({ locale }: BookingPageProps) {
  const router = useRouter();

  const handleComplete = (bookingCode: string) => {
    const params = new URLSearchParams({ code: bookingCode });
    router.push(`/${locale}/booking/confirmation?${params.toString()}`);
  };

  return <BookingWizard onComplete={handleComplete} />;
}
