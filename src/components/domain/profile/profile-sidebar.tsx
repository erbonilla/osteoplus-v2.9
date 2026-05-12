"use client";

import { Activity, Bell, BookHeart, Clock, Eye, Lock, Star, User, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils/cn";
import { ProfileSideNavItem } from "./profile-side-nav-item";

export type ProfileSectionId =
  | "personal-info"
  | "patient-context"
  | "care-history"
  | "recovery"
  | "family"
  | "privacy"
  | "notifications"
  | "accessibility"
  | "favorites";

type ProfileSidebarProps = {
  activeSection: ProfileSectionId;
  onSectionChange: (id: ProfileSectionId) => void;
  className?: string;
};

export function ProfileSidebar({ activeSection, onSectionChange, className }: ProfileSidebarProps) {
  const t = useTranslations("profile.nav");

  const group1 = [
    { id: "personal-info" as const, label: t("personalInfo"), icon: User },
    { id: "patient-context" as const, label: t("patientContext"), icon: BookHeart },
    { id: "favorites" as const, label: t("favorites"), icon: Star },
  ];

  const group2 = [
    { id: "care-history" as const, label: t("careHistory"), icon: Clock },
    { id: "recovery" as const, label: t("recovery"), icon: Activity },
    { id: "family" as const, label: t("family"), icon: Users },
    { id: "privacy" as const, label: t("privacy"), icon: Lock },
    { id: "notifications" as const, label: t("notifications"), icon: Bell },
    { id: "accessibility" as const, label: t("accessibility"), icon: Eye },
  ];

  return (
    <nav
      aria-label={t("aria")}
      className={cn(
        "flex w-64 shrink-0 flex-col gap-1 overflow-y-auto border-r border-border-default bg-surface-card px-2 py-4",
        className,
      )}
    >
      {/* Group 1 */}
      <div className="flex flex-col gap-0.5">
        {group1.map((item) => (
          <ProfileSideNavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.id}
            onClick={(id) => onSectionChange(id as ProfileSectionId)}
          />
        ))}
      </div>

      <Divider className="my-2" />

      {/* Group 2 */}
      <div className="flex flex-col gap-0.5">
        {group2.map((item) => (
          <ProfileSideNavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.id}
            onClick={(id) => onSectionChange(id as ProfileSectionId)}
          />
        ))}
      </div>
    </nav>
  );
}
