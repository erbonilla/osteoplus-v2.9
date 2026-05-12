"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";

export type LandingNavItem = {
  href: string;
  label: string;
};

export type LandingHeaderLabels = {
  homeAria: string;
  logoAlt: string;
  navAria: string;
  menuOpen: string;
  menuClose: string;
  login: string;
  signUp: string;
  themeAria: string;
  themeSystem: string;
  themeLight: string;
  themeDark: string;
  languageAria: string;
  languageEs: string;
  languageEn: string;
};

type LandingHeaderProps = {
  locale: Locale;
  labels: LandingHeaderLabels;
  navItems: LandingNavItem[];
};

export function LandingHeader({ labels, locale, navItems }: LandingHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-border-default border-b bg-bg-secondary/95 shadow-[0_1px_0_rgb(29_94_90_/_0.08)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 lg:px-8">
        <Link
          aria-label={labels.homeAria}
          className="inline-flex min-h-12 items-center"
          href={`/${locale}`}
          onClick={closeMenu}
        >
          <Image
            alt={labels.logoAlt}
            className="h-auto w-24 dark:hidden sm:w-[128px]"
            height={40}
            src="/logos/osteoplus-original-logo.svg"
            width={128}
          />
          <Image
            alt={labels.logoAlt}
            className="hidden h-auto w-24 dark:block sm:w-[128px]"
            height={40}
            src="/logos/osteoplus-logo-teal-300.svg"
            width={128}
          />
        </Link>

        <nav aria-label={labels.navAria} className="hidden items-center gap-7 lg:flex">
          {navItems.map((item, index) => (
            <a
              className={cn(
                "relative inline-flex min-h-12 items-center font-medium text-[0.9375rem] text-text-primary transition-colors hover:text-brand-primary",
                index === 0 &&
                  "after:absolute after:right-0 after:bottom-2 after:left-0 after:h-0.5 after:rounded-chip after:bg-brand-primary",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageToggle
            currentLocale={locale}
            labels={{
              aria: labels.languageAria,
              en: labels.languageEn,
              es: labels.languageEs,
            }}
          />
          <ThemeToggle
            labels={{
              aria: labels.themeAria,
              dark: labels.themeDark,
              light: labels.themeLight,
              system: labels.themeSystem,
            }}
          />
          <Button asChild size="md" variant="secondary">
            <Link href={`/${locale}/login`}>{labels.login}</Link>
          </Button>
          <Button asChild size="md">
            <Link href={`/${locale}/signup`}>{labels.signUp}</Link>
          </Button>
        </div>

        <Button
          aria-expanded={isOpen}
          aria-label={isOpen ? labels.menuClose : labels.menuOpen}
          className="lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          size="icon"
          type="button"
          variant="secondary"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "border-border-default border-t bg-bg-secondary px-4 pb-5 shadow-elevated lg:hidden",
          isOpen ? "block" : "hidden",
        )}
      >
        <nav aria-label={labels.navAria} className="mx-auto flex max-w-7xl flex-col gap-2 py-4">
          {navItems.map((item) => (
            <a
              className="inline-flex min-h-12 items-center rounded-button px-3 font-semibold text-text-primary transition-colors hover:bg-bg-tertiary"
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2">
          <LanguageToggle
            currentLocale={locale}
            labels={{
              aria: labels.languageAria,
              en: labels.languageEn,
              es: labels.languageEs,
            }}
          />
          <ThemeToggle
            labels={{
              aria: labels.themeAria,
              dark: labels.themeDark,
              light: labels.themeLight,
              system: labels.themeSystem,
            }}
          />
          <Button asChild size="md" variant="secondary">
            <Link href={`/${locale}/login`}>{labels.login}</Link>
          </Button>
          <Button asChild size="md">
            <Link href={`/${locale}/signup`}>{labels.signUp}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
