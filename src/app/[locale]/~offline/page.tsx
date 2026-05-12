import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type OfflinePageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function OfflinePage({ params }: OfflinePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("offline");

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-16 text-text-primary">
      <section className="mx-auto flex max-w-2xl flex-col gap-6 rounded-hero border border-border-default bg-surface-card p-6">
        <p className="text-sm font-semibold text-brand-primary">{t("eyebrow")}</p>
        <h1 className="font-heading text-3xl font-bold leading-tight">{t("title")}</h1>
        <p className="text-lg leading-relaxed text-text-secondary">{t("body")}</p>
        <Button asChild size="lg">
          <a href={`/${locale}`}>{t("cta")}</a>
        </Button>
      </section>
    </main>
  );
}
