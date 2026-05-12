import type { ProfileSectionId } from "@/components/domain/profile/profile-sidebar";

const PROFILE_SECTION_IDS = new Set<ProfileSectionId>([
  "personal-info",
  "patient-context",
  "care-history",
  "recovery",
  "family",
  "privacy",
  "notifications",
  "accessibility",
  "favorites",
]);

export function parseProfileSectionId(value: string | undefined): ProfileSectionId | null {
  if (!value) {
    return null;
  }
  return PROFILE_SECTION_IDS.has(value as ProfileSectionId) ? (value as ProfileSectionId) : null;
}
