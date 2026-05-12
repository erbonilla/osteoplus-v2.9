"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { MOCK_RECOVERY_DATA } from "@/lib/fixtures/recovery";
import { CurrentProgramCard } from "./current-program-card";
import { ProfileSection } from "./profile-section";
import { RecentSessionList } from "./recent-session-list";
import { RecoveryGoalsCard } from "./recovery-goals-card";
import { RecoverySafetyCallout } from "./recovery-safety-callout";
import { TreatmentPlanCard } from "./treatment-plan-card";

export function RecoverySection() {
  const t = useTranslations("profile.recovery");
  const locale = useLocale();
  const data = MOCK_RECOVERY_DATA;

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label={t("breadcrumb")}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-text-tertiary">
          <li>
            <Link
              href={`/${locale}/profile`}
              className="rounded-sm underline-offset-4 transition-colors hover:text-text-secondary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            >
              {t("breadcrumbParent")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-text-secondary">
            {t("title")}
          </li>
        </ol>
      </nav>

      <ProfileSection id="recovery" title={t("title")} description={t("description")}>
        <RecoveryGoalsCard goals={data.goals} />
        <TreatmentPlanCard plan={data.treatmentPlan} />
        <CurrentProgramCard program={data.activeProgram} />
        <RecentSessionList sessions={data.recentSessions} />
        <RecoverySafetyCallout />
      </ProfileSection>
    </div>
  );
}
