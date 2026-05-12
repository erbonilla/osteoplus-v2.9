import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingPage } from "@/components/domain/booking-page-client";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BookingPage locale={locale} />;
}
