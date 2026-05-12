"use client";

import { useTranslations } from "next-intl";
import { BrandLogo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

type ProfileTopbarProps = {
  locale: Locale;
  userName: string;
  className?: string;
};

export function ProfileTopbar({ locale, userName, className }: ProfileTopbarProps) {
  const t = useTranslations("profile.topbar");
  const tCommon = useTranslations("common");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border-default bg-surface-card px-4 md:px-6",
        className,
      )}
    >
      <a href={`/${locale}`} aria-label={t("homeLink")} className="flex items-center">
        <BrandLogo alt="Osteóplus" className="h-8 w-auto" />
      </a>

      <div className="flex items-center gap-2">
        <ThemeToggle
          labels={{
            light: tCommon("theme.light"),
            dark: tCommon("theme.dark"),
            system: tCommon("theme.system"),
            aria: tCommon("theme.aria"),
          }}
        />
        <LanguageToggle
          currentLocale={locale}
          labels={{
            aria: tCommon("language.aria"),
            es: tCommon("language.es"),
            en: tCommon("language.en"),
          }}
        />
        <Avatar name={userName} size="sm" aria-label={t("avatarAria", { name: userName })} />
      </div>
    </header>
  );
}
