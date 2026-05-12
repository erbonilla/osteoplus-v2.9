import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ProfilePageClient } from "../profile-page-client";

type ProfileRecoveryPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ProfileRecoveryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile.recovery" });

  return {
    title: `${t("title")} | Osteóplus`,
    robots: { index: false },
  };
}

export default async function ProfileRecoveryPage({ params }: ProfileRecoveryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProfilePageClient enableSectionQuerySync={false} initialSection="recovery" locale={locale} />
  );
}
