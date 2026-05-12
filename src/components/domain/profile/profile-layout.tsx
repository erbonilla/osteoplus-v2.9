"use client";

import { Activity, Bell, BookHeart, Clock, Eye, Lock, Star, User, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { parseProfileSectionId } from "@/lib/profile/profile-section-id";
import { cn } from "@/lib/utils/cn";
import type { ProfileSectionId } from "./profile-sidebar";
import { ProfileSidebar } from "./profile-sidebar";
import { ProfileTopbar } from "./profile-topbar";

type ProfileLayoutProps = {
  locale: Locale;
  userName: string;
  initialSection?: ProfileSectionId;
  enableSectionQuerySync?: boolean;
  children: (activeSection: ProfileSectionId) => React.ReactNode;
  className?: string;
};

const navChipClass = (isActive: boolean) =>
  cn(
    "flex shrink-0 min-h-12 items-center gap-1.5 rounded-chip px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
    isActive
      ? "bg-bg-brand-subtle text-brand-primary"
      : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
  );

export function ProfileLayout({
  locale,
  userName,
  initialSection = "personal-info",
  enableSectionQuerySync = true,
  children,
  className,
}: ProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState<ProfileSectionId>(initialSection);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("profile.nav");

  const recoveryHref = `/${locale}/profile/recovery`;

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    if (!enableSectionQuerySync) {
      return;
    }
    const sectionParam = searchParams.get("section");
    if (sectionParam === null) {
      setActiveSection("personal-info");
      return;
    }
    const parsed = parseProfileSectionId(sectionParam);
    if (parsed) {
      setActiveSection(parsed);
    }
  }, [enableSectionQuerySync, searchParams]);

  const handleSectionSelect = useCallback(
    (id: ProfileSectionId) => {
      if (id === "recovery") {
        router.push(recoveryHref);
        return;
      }
      if (enableSectionQuerySync) {
        if (id === "personal-info") {
          router.replace(`/${locale}/profile`, { scroll: false });
        } else {
          router.replace(`/${locale}/profile?section=${id}`, { scroll: false });
        }
        setActiveSection(id);
        return;
      }
      router.push(`/${locale}/profile?section=${id}`);
    },
    [enableSectionQuerySync, locale, recoveryHref, router],
  );

  const allSections: { id: ProfileSectionId; label: string; icon: React.ElementType }[] = [
    { id: "personal-info", label: t("personalInfo"), icon: User },
    { id: "patient-context", label: t("patientContext"), icon: BookHeart },
    { id: "favorites", label: t("favorites"), icon: Star },
    { id: "care-history", label: t("careHistory"), icon: Clock },
    { id: "recovery", label: t("recovery"), icon: Activity },
    { id: "family", label: t("family"), icon: Users },
    { id: "privacy", label: t("privacy"), icon: Lock },
    { id: "notifications", label: t("notifications"), icon: Bell },
    { id: "accessibility", label: t("accessibility"), icon: Eye },
  ];

  return (
    <div className={cn("flex min-h-dvh flex-col bg-bg-primary", className)}>
      <ProfileTopbar locale={locale} userName={userName} />

      <div className="flex flex-1 overflow-hidden">
        <ProfileSidebar
          locale={locale}
          activeSection={activeSection}
          onSectionSelect={handleSectionSelect}
          className="hidden lg:flex"
        />

        <div className="flex flex-1 flex-col overflow-hidden">
          <nav
            aria-label={t("aria")}
            className="flex gap-1 overflow-x-auto border-b border-border-default bg-surface-card px-4 py-2 sm:px-5 lg:hidden"
          >
            {allSections.map(({ id, label, icon: Icon }) =>
              id === "recovery" ? (
                <Link
                  key={id}
                  href={recoveryHref}
                  aria-current={activeSection === id ? "page" : undefined}
                  prefetch={true}
                  scroll={false}
                  className={navChipClass(activeSection === id)}
                >
                  <Icon aria-hidden="true" strokeWidth={2} className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              ) : (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSectionSelect(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={navChipClass(activeSection === id)}
                >
                  <Icon aria-hidden="true" strokeWidth={2} className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              ),
            )}
          </nav>

          <main id="profile-main" tabIndex={-1} className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1100px] px-4 py-6 sm:px-5 md:py-8 lg:px-10">
              {children(activeSection)}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
