import { setRequestLocale } from "next-intl/server";
import { LandingPage } from "@/components/landing/landing-page";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingPage locale={locale} />;
}
