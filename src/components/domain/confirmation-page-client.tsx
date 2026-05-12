"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CLINIC_ADDRESS, sampleConfirmation } from "@/lib/booking/fixtures";
import { BookingConfirmation } from "./booking-confirmation";

type ConfirmationPageClientProps = {
  locale: string;
};

function ConfirmationContent({ locale }: ConfirmationPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingCode = searchParams.get("code") ?? sampleConfirmation.bookingCode;

  const data = {
    ...sampleConfirmation,
    bookingCode,
    location: CLINIC_ADDRESS,
  };

  return (
    <BookingConfirmation
      data={data}
      onReturnHome={() => router.push(`/${locale}`)}
      onBookAnother={() => router.push(`/${locale}/booking`)}
    />
  );
}

export function ConfirmationPageClient({ locale }: ConfirmationPageClientProps) {
  return (
    <Suspense>
      <ConfirmationContent locale={locale} />
    </Suspense>
  );
}
