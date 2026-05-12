"use client";

import { Activity, Bell, BookHeart, Clock, Eye, Lock, Star, User, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { ProfileSectionId } from "./profile-sidebar";
import { ProfileSidebar } from "./profile-sidebar";
import { ProfileTopbar } from "./profile-topbar";

type ProfileLayoutProps = {
  locale: import("@/i18n/routing").Locale;
  userName: string;
  initialSection?: ProfileSectionId;
  children: (
    activeSection: ProfileSectionId,
    onSectionChange: (id: ProfileSectionId) => void,
  ) => React.ReactNode;
  className?: string;
};

export function ProfileLayout({
  locale,
  userName,
  initialSection = "personal-info",
  children,
  className,
}: ProfileLayoutProps) {
  const [activeSection, setActiveSection] = useState<ProfileSectionId>(initialSection);
  const t = useTranslations("profile.nav");

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
        {/* Sidebar — visible only on lg+ */}
        <ProfileSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          className="hidden lg:flex"
        />

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Mobile horizontal nav — visible below lg */}
          <nav
            aria-label={t("aria")}
            className="flex gap-1 overflow-x-auto border-b border-border-default bg-surface-card px-4 py-2 lg:hidden"
          >
            {allSections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                aria-current={activeSection === id ? "page" : undefined}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-chip px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                  activeSection === id
                    ? "bg-bg-brand-subtle text-brand-primary"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
                )}
              >
                <Icon aria-hidden="true" strokeWidth={2} className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <main id="profile-main" tabIndex={-1} className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-4 py-6 md:px-6 md:py-8">
              {children(activeSection, setActiveSection)}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
