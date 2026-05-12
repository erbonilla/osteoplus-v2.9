"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ProfileSection } from "./profile-section";

type Frequency = "immediately" | "daily" | "weekly";

export function NotificationsSection() {
  const t = useTranslations("profile.notifications");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [reminders, setReminders] = useState(true);

  return (
    <ProfileSection id="notifications" title={t("title")} description={t("description")}>
      {/* Channels */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("channels.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Switch
            id="notif-email"
            label={t("channels.email")}
            description={t("channels.emailDescription")}
            checked={emailEnabled}
            onChange={(e) => setEmailEnabled(e.target.checked)}
          />
          <Divider />
          <Switch
            id="notif-sms"
            label={t("channels.sms")}
            description={t("channels.smsDescription")}
            checked={smsEnabled}
            onChange={(e) => setSmsEnabled(e.target.checked)}
          />
          <Divider />
          <Switch
            id="notif-push"
            label={t("channels.push")}
            description={t("channels.pushDescription")}
            checked={pushEnabled}
            onChange={(e) => setPushEnabled(e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* Frequency */}
      <Card>
        <CardContent className="flex flex-col gap-4 pt-4">
          <RadioGroup legend={t("frequency.title")}>
            {(["immediately", "daily", "weekly"] as Frequency[]).map((f) => (
              <RadioItem
                key={f}
                id={`freq-${f}`}
                name="frequency"
                label={t(`frequency.${f}`)}
                description={t(`frequency.${f}Description`)}
                value={f}
                checked={frequency === f}
                onChange={() => setFrequency(f)}
              />
            ))}
          </RadioGroup>

          <Divider />

          <Switch
            id="notif-reminders"
            label={t("reminders.label")}
            description={t("reminders.description")}
            checked={reminders}
            onChange={(e) => setReminders(e.target.checked)}
          />
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
