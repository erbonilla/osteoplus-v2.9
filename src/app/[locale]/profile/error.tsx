"use client";

import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type ProfileErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProfileError({ error: _error, reset }: ProfileErrorProps) {
  const t = useTranslations("profile.error");

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-primary px-4">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <AlertCircle aria-hidden="true" className="h-12 w-12 text-feedback-error" strokeWidth={2} />
        <h1 className="text-xl font-semibold text-text-primary">{t("title")}</h1>
        <p className="text-base text-text-secondary">{t("description")}</p>
        <Button onClick={reset} variant="primary">
          {t("retry")}
        </Button>
      </div>
    </div>
  );
}
