"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type ProfileAuthEntryProps = {
  locale: string;
};

export function ProfileAuthEntry({ locale }: ProfileAuthEntryProps) {
  const t = useTranslations("profile.entry");

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-bold text-text-primary">{t("title")}</h2>
        <p className="text-base text-text-secondary">{t("description")}</p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
          <Link href={`/${locale}/login`}>{t("signIn")}</Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
          <Link href={`/${locale}/signup`}>{t("createAccount")}</Link>
        </Button>
      </div>

      <p className="text-sm text-text-tertiary">{t("phoneHelp")}</p>
    </div>
  );
}
