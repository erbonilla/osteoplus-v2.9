import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { LoginPageClient } from "./login-page-client";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });

  return {
    title: `${t("title")} | Osteóplus`,
    description: t("description"),
  };
}

export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginPageClient locale={locale} />;
}
