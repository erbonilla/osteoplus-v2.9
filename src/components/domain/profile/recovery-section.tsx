"use client";

import { useTranslations } from "next-intl";
import { MOCK_RECOVERY_DATA } from "@/lib/fixtures/recovery";
import { CurrentProgramCard } from "./current-program-card";
import { ProfileSection } from "./profile-section";
import { RecentSessionList } from "./recent-session-list";
import { RecoveryGoalsCard } from "./recovery-goals-card";
import { RecoverySafetyCallout } from "./recovery-safety-callout";
import { TreatmentPlanCard } from "./treatment-plan-card";

export function RecoverySection() {
  const t = useTranslations("profile.recovery");
  const data = MOCK_RECOVERY_DATA;

  return (
    <ProfileSection id="recovery" title={t("title")} description={t("description")}>
      <RecoveryGoalsCard goals={data.goals} />
      <TreatmentPlanCard plan={data.treatmentPlan} />
      <CurrentProgramCard program={data.activeProgram} />
      <RecentSessionList sessions={data.recentSessions} />
      <RecoverySafetyCallout />
    </ProfileSection>
  );
}
