import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { parseProfileSectionId } from "@/lib/profile/profile-section-id";
import { ProfilePageClient } from "./profile-page-client";

type ProfilePageProps = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ section?: string }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "profile" });

  return {
    title: `${t("title")} | Osteóplus`,
    robots: { index: false },
  };
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const initialSection = parseProfileSectionId(sp.section) ?? "personal-info";

  return (
    <ProfilePageClient enableSectionQuerySync initialSection={initialSection} locale={locale} />
  );
}
