import { Dumbbell, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { ActiveProgramSummary } from "@/lib/schemas/profile-recovery";

type CurrentProgramCardProps = {
  program: ActiveProgramSummary | null;
};

export function CurrentProgramCard({ program }: CurrentProgramCardProps) {
  const t = useTranslations("profile.recovery.activeProgram");

  if (!program) {
    return (
      <Card>
        <CardContent>
          <p className="text-base text-text-secondary">{t("empty")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Dumbbell aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
          <h2 className="text-base font-semibold text-text-primary">{t("title")}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-text-primary">{program.title}</p>
          <p className="text-sm text-text-secondary">
            {t("prescribedBy", { name: program.practitionerName })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
          <span>{t("exercises", { count: program.exerciseCount })}</span>
          <span aria-hidden="true" className="text-text-tertiary">
            ·
          </span>
          <span>{t("duration", { minutes: program.durationMinutes })}</span>
          <span aria-hidden="true" className="text-text-tertiary">
            ·
          </span>
          <span>{t("day", { label: program.currentDayLabel })}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button size="md" variant="primary" className="gap-2">
          <Play aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          {t("startSession")}
        </Button>
        <Button size="md" variant="secondary">
          {t("viewProgram")}
        </Button>
      </CardFooter>
    </Card>
  );
}
