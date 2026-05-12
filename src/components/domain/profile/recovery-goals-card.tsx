import { Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RecoveryGoal, RecoveryGoalStatus } from "@/lib/schemas/profile-recovery";

type RecoveryGoalsCardProps = {
  goals: RecoveryGoal[];
};

const STATUS_BADGE_VARIANT: Record<
  RecoveryGoalStatus,
  "brand" | "neutral" | "success" | "warning"
> = {
  onTrack: "brand",
  pending: "neutral",
  needsReview: "warning",
  complete: "success",
};

export function RecoveryGoalsCard({ goals }: RecoveryGoalsCardProps) {
  const t = useTranslations("profile.recovery");

  if (goals.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-base text-text-secondary">{t("goals.empty")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
          <h2 className="text-base font-semibold text-text-primary">{t("goals.title")}</h2>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-4">
          {goals.map((goal) => (
            <li key={goal.id} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base text-text-primary">{goal.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant={STATUS_BADGE_VARIANT[goal.status]}>
                    {t(`goalStatus.${goal.status}`)}
                  </Badge>
                  <span className="shrink-0 text-sm font-medium text-text-secondary">
                    {goal.progress}%
                  </span>
                </div>
              </div>
              <Progress
                value={goal.progress}
                label={goal.title}
                variant={goal.status === "complete" ? "success" : "brand"}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
