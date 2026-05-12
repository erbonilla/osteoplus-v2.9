"use client";

import { KeyRound, Mail, Shield, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";
import { ProfileSection } from "./profile-section";

export function PrivacySection() {
  const t = useTranslations("profile.privacy");
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  return (
    <ProfileSection id="privacy" title={t("title")} description={t("description")}>
      {/* Account */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("account.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-text-secondary">{t("account.email")}</p>
              <p className="text-base text-text-primary">ana.garcia@ejemplo.com</p>
            </div>
            <Button variant="outline" size="sm">
              {t("account.changeEmail")}
            </Button>
          </div>
          <Divider />
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-text-secondary">{t("account.password")}</p>
              <p className="text-base text-text-primary">••••••••</p>
            </div>
            <Button variant="outline" size="sm">
              {t("account.changePassword")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("security.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Switch
            id="two-factor"
            label={t("security.twoFactor")}
            description={t("security.twoFactorDescription")}
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
          />
          <Divider />
          <Switch
            id="session-alerts"
            label={t("security.sessionAlerts")}
            description={t("security.sessionAlertsDescription")}
            checked={sessionAlerts}
            onChange={(e) => setSessionAlerts(e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* Data */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("data.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-text-secondary">{t("data.description")}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              {t("data.download")}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-feedback-error border-feedback-error hover:bg-feedback-error-subtle"
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              {t("data.delete")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
