import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ProfilePageClient } from "./profile-page-client";

type ProfilePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });

  return {
    title: `${t("title")} | Osteóplus`,
    robots: { index: false },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProfilePageClient locale={locale} />;
}
