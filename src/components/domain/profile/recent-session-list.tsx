"use client";

import { Clock, History } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { RecentRehabSession, RecentRehabSessionStatus } from "@/lib/schemas/profile-recovery";
import { formatSessionDate } from "./recovery-date-utils";

type RecentSessionListProps = {
  sessions: RecentRehabSession[];
};

const STATUS_BADGE_VARIANT: Record<RecentRehabSessionStatus, "success" | "warning" | "neutral"> = {
  completed: "success",
  paused: "warning",
  skipped: "neutral",
};

export function RecentSessionList({ sessions }: RecentSessionListProps) {
  const t = useTranslations("profile.recovery.recentSessions");
  const locale = useLocale();

  if (sessions.length === 0) {
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
          <History aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
          <h2 className="text-base font-semibold text-text-primary">{t("title")}</h2>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border-default">
          {sessions.map((session) => (
            <li key={session.id} className="flex flex-col gap-2 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <p className="text-base font-medium text-text-primary">{session.programTitle}</p>
                  <p className="text-sm text-text-tertiary">
                    {formatSessionDate(session.date, locale)}
                  </p>
                </div>
                <Badge variant={STATUS_BADGE_VARIANT[session.status]}>
                  {t(`status.${session.status}`)}
                </Badge>
              </div>

              {session.status === "completed" && (
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                  {session.durationMinutes != null && (
                    <span className="flex items-center gap-1">
                      <Clock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                      {t("duration", { minutes: session.durationMinutes })}
                    </span>
                  )}
                  {session.painBefore != null && (
                    <span>
                      {t("painBefore")}: {session.painBefore}/10
                    </span>
                  )}
                  {session.painAfter != null && (
                    <span>
                      {t("painAfter")}: {session.painAfter}/10
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
