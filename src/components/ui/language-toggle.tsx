"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/routing";

type LanguageToggleLabels = {
  aria: string;
  es: string;
  en: string;
};

type LanguageToggleProps = {
  currentLocale: Locale;
  labels: LanguageToggleLabels;
};

export function LanguageToggle({ currentLocale, labels }: LanguageToggleProps) {
  const pathname = usePathname();

  const esHref = pathname.replace(/^\/(es|en)(?=\/|$)/, "/es") || "/es";
  const enHref = pathname.replace(/^\/(es|en)(?=\/|$)/, "/en") || "/en";

  const segmentBase =
    "inline-flex min-h-10 min-w-10 items-center justify-center px-3 font-semibold text-sm leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus";

  const activeClass = "bg-brand-primary text-text-on-brand rounded-chip";
  const inactiveClass =
    "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-chip";

  return (
    <fieldset
      aria-label={labels.aria}
      className="inline-flex items-center gap-0.5 rounded-chip border border-border-default bg-surface-card p-0.5"
    >
      <Link
        aria-current={currentLocale === "es" ? "true" : undefined}
        aria-label={labels.es}
        className={`${segmentBase} ${currentLocale === "es" ? activeClass : inactiveClass}`}
        href={esHref}
      >
        ES
      </Link>
      <Link
        aria-current={currentLocale === "en" ? "true" : undefined}
        aria-label={labels.en}
        className={`${segmentBase} ${currentLocale === "en" ? activeClass : inactiveClass}`}
        href={enHref}
      >
        EN
      </Link>
    </fieldset>
  );
}
