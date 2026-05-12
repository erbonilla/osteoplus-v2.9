import { Phone, ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CLINIC_PHONE = "+34 93 123 45 67";

export function RecoverySafetyCallout() {
  const t = useTranslations("profile.recovery.safety");

  return (
    <Card className="border-feedback-warning bg-feedback-warning-subtle">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <ShieldAlert
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-feedback-warning"
            strokeWidth={2}
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-text-primary">{t("title")}</h2>
            <p className="text-base text-text-secondary">{t("body")}</p>
          </div>
        </div>
        <Button asChild size="md" variant="secondary" className="self-start gap-2">
          <a href={`tel:${CLINIC_PHONE.replace(/\s/g, "")}`}>
            <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            {t("callClinic")}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
