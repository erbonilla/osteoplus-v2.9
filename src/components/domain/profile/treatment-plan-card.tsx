import { TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TreatmentPlanSummary } from "@/lib/schemas/profile-recovery";

type TreatmentPlanCardProps = {
  plan: TreatmentPlanSummary | null;
};

export function TreatmentPlanCard({ plan }: TreatmentPlanCardProps) {
  const t = useTranslations("profile.recovery.treatmentPlan");

  if (!plan) {
    return (
      <Card>
        <CardContent>
          <p className="text-base text-text-secondary">{t("empty")}</p>
        </CardContent>
      </Card>
    );
  }

  const percentage = Math.round((plan.adherenceCompleted / plan.adherenceTotal) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
          <h2 className="text-base font-semibold text-text-primary">{t("title")}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Adherence */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-text-secondary">{t("adherence")}</span>
            <span className="text-sm font-semibold text-text-primary">{percentage}%</span>
          </div>
          <Progress
            value={plan.adherenceCompleted}
            max={plan.adherenceTotal}
            label={t("completed", {
              completed: plan.adherenceCompleted,
              total: plan.adherenceTotal,
            })}
          />
          <p className="text-sm text-text-tertiary">
            {t("completed", {
              completed: plan.adherenceCompleted,
              total: plan.adherenceTotal,
            })}
          </p>
        </div>

        {/* Next milestone */}
        <div className="flex flex-col gap-1 rounded-input border border-border-default bg-bg-secondary p-3">
          <span className="text-sm font-medium text-text-secondary">{t("nextMilestone")}</span>
          <p className="text-base font-semibold text-text-primary">{plan.nextMilestone}</p>
          <p className="text-sm text-text-tertiary">{plan.nextMilestoneEta}</p>
        </div>
      </CardContent>
    </Card>
  );
}
