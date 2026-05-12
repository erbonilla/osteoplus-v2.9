import { AlertCircle, Pill } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileSection } from "./profile-section";

const MOCK_CONDITIONS = ["Escoliosis leve", "Tensión cervical crónica", "Lumbalgia recurrente"];
const MOCK_MEDICATIONS = ["Ibuprofeno 400mg (ocasional)", "Vitamina D 1000 UI"];
const MOCK_ALLERGIES = ["Látex"];

export function PatientContextSection() {
  const t = useTranslations("profile.patientContext");

  return (
    <ProfileSection id="patient-context" title={t("title")} description={t("description")}>
      {/* Conditions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle
              aria-hidden="true"
              className="h-5 w-5 text-text-tertiary"
              strokeWidth={2}
            />
            <h2 className="text-base font-semibold text-text-primary">{t("conditions.title")}</h2>
          </div>
        </CardHeader>
        <CardContent>
          {MOCK_CONDITIONS.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label={t("conditions.title")}>
              {MOCK_CONDITIONS.map((c) => (
                <li key={c}>
                  <Badge variant="neutral">{c}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-tertiary">{t("conditions.empty")}</p>
          )}
        </CardContent>
      </Card>

      {/* Medications & Allergies */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Pill aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">
              {t("medicationsAllergies.title")}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-text-secondary">
              {t("medicationsAllergies.medications")}
            </p>
            {MOCK_MEDICATIONS.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {MOCK_MEDICATIONS.map((m) => (
                  <li key={m} className="text-base text-text-primary">
                    {m}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-text-tertiary">{t("medicationsAllergies.empty")}</p>
            )}
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-secondary">
              {t("medicationsAllergies.allergies")}
            </p>
            {MOCK_ALLERGIES.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {MOCK_ALLERGIES.map((a) => (
                  <li key={a}>
                    <Badge variant="warning">{a}</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-text-tertiary">{t("medicationsAllergies.empty")}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
