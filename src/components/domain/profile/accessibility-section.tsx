"use client";

import { Eye, Type } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ProfileSection } from "./profile-section";

type TextSize = "default" | "large" | "xlarge";

export function AccessibilitySection() {
  const t = useTranslations("profile.accessibility");
  const [textSize, setTextSize] = useState<TextSize>("default");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <ProfileSection id="accessibility" title={t("title")} description={t("description")}>
      {/* Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Type aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("display.title")}</h2>
          </div>
        </CardHeader>
        <CardContent>
          <RadioGroup legend={t("display.textSize")} hideLegend>
            {(["default", "large", "xlarge"] as TextSize[]).map((size) => (
              <RadioItem
                key={size}
                id={`text-${size}`}
                name="text-size"
                label={t(`display.${size}`)}
                description={t(`display.${size}Description`)}
                value={size}
                checked={textSize === size}
                onChange={() => setTextSize(size)}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Motion & contrast */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">
              {t("motionContrast.title")}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Switch
            id="reduced-motion"
            label={t("motionContrast.reducedMotion")}
            description={t("motionContrast.reducedMotionDescription")}
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
          />
          <Divider />
          <Switch
            id="high-contrast"
            label={t("motionContrast.highContrast")}
            description={t("motionContrast.highContrastDescription")}
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
          />
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
