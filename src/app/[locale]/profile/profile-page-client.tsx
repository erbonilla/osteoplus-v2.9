"use client";

import { AccessibilitySection } from "@/components/domain/profile/accessibility-section";
import { CareHistorySection } from "@/components/domain/profile/care-history-section";
import { FamilySection } from "@/components/domain/profile/family-section";
import { FavoritesSection } from "@/components/domain/profile/favorites-section";
import { NotificationsSection } from "@/components/domain/profile/notifications-section";
import { PatientContextSection } from "@/components/domain/profile/patient-context-section";
import { PersonalInfoSection } from "@/components/domain/profile/personal-info-section";
import { PrivacySection } from "@/components/domain/profile/privacy-section";
import { ProfileLayout } from "@/components/domain/profile/profile-layout";
import type { ProfileSectionId } from "@/components/domain/profile/profile-sidebar";
import { RecoverySection } from "@/components/domain/profile/recovery-section";
import type { Locale } from "@/i18n/routing";

type ProfilePageClientProps = {
  locale: Locale;
  initialSection?: ProfileSectionId;
  enableSectionQuerySync?: boolean;
};

export function ProfilePageClient({
  locale,
  initialSection = "personal-info",
  enableSectionQuerySync = true,
}: ProfilePageClientProps) {
  return (
    <ProfileLayout
      locale={locale}
      userName="Ana García"
      enableSectionQuerySync={enableSectionQuerySync}
      initialSection={initialSection}
    >
      {(activeSection: ProfileSectionId) => {
        switch (activeSection) {
          case "personal-info":
            return <PersonalInfoSection />;
          case "patient-context":
            return <PatientContextSection />;
          case "care-history":
            return <CareHistorySection />;
          case "recovery":
            return <RecoverySection />;
          case "family":
            return <FamilySection />;
          case "privacy":
            return <PrivacySection />;
          case "notifications":
            return <NotificationsSection />;
          case "accessibility":
            return <AccessibilitySection />;
          case "favorites":
            return <FavoritesSection />;
          default:
            return <PersonalInfoSection />;
        }
      }}
    </ProfileLayout>
  );
}
