import { CalendarDays, ClipboardList } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileSection } from "./profile-section";

const MOCK_SESSIONS = [
  {
    id: "1",
    date: "8 may 2026",
    type: "Osteopatía",
    therapist: "Dra. Martínez",
    status: "Completada",
  },
  {
    id: "2",
    date: "24 abr 2026",
    type: "Fisioterapia",
    therapist: "Dr. Ruiz",
    status: "Completada",
  },
  {
    id: "3",
    date: "10 abr 2026",
    type: "Osteopatía",
    therapist: "Dra. Martínez",
    status: "Completada",
  },
];

const MOCK_PLANS = [
  { id: "p1", name: "Plan de rehabilitación lumbar", sessions: 12, completed: 8 },
  { id: "p2", name: "Protocolo cervical", sessions: 6, completed: 6 },
];

export function CareHistorySection() {
  const t = useTranslations("profile.careHistory");

  return (
    <ProfileSection id="care-history" title={t("title")} description={t("description")}>
      {/* Recent sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarDays
              aria-hidden="true"
              className="h-5 w-5 text-text-tertiary"
              strokeWidth={2}
            />
            <h2 className="text-base font-semibold text-text-primary">{t("sessions.title")}</h2>
          </div>
        </CardHeader>
        <CardContent>
          {MOCK_SESSIONS.length > 0 ? (
            <ul className="flex flex-col divide-y divide-border-default">
              {MOCK_SESSIONS.map((s, i) => (
                <li key={s.id} className={i === 0 ? "pb-3" : "py-3"}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-base font-medium text-text-primary">{s.type}</p>
                      <p className="text-sm text-text-secondary">{s.therapist}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-sm text-text-tertiary">{s.date}</p>
                      <Badge variant="success">{s.status}</Badge>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-tertiary">{t("sessions.empty")}</p>
          )}
        </CardContent>
      </Card>

      {/* Prescribed plans */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList
              aria-hidden="true"
              className="h-5 w-5 text-text-tertiary"
              strokeWidth={2}
            />
            <h2 className="text-base font-semibold text-text-primary">{t("plans.title")}</h2>
          </div>
        </CardHeader>
        <CardContent>
          {MOCK_PLANS.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {MOCK_PLANS.map((plan) => {
                const percent = Math.round((plan.completed / plan.sessions) * 100);
                return (
                  <li key={plan.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-base font-medium text-text-primary">{plan.name}</p>
                      <p className="shrink-0 text-sm text-text-tertiary">
                        {plan.completed}/{plan.sessions}
                      </p>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={plan.name}
                      className="h-2 w-full overflow-hidden rounded-chip bg-bg-tertiary"
                    >
                      <div
                        className="h-full rounded-chip bg-brand-primary transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-text-tertiary">{t("plans.empty")}</p>
          )}
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
