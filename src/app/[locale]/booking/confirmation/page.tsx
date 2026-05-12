import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ConfirmationPageClient } from "@/components/domain/confirmation-page-client";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking.confirmation" });

  return {
    title: t("title"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ConfirmationPageClient locale={locale} />;
}
