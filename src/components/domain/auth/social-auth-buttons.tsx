"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type SocialProvider = "google" | "apple" | "email";

type SocialAuthButtonsProps = {
  onSocialAuth?: (provider: SocialProvider) => void;
  isLoading?: boolean;
};

export function SocialAuthButtons({ onSocialAuth, isLoading }: SocialAuthButtonsProps) {
  const t = useTranslations("auth.social");

  const providers: { key: SocialProvider; label: string }[] = [
    { key: "google", label: t("google") },
    { key: "apple", label: t("apple") },
    { key: "email", label: t("email") },
  ];

  return (
    <div className="flex flex-col gap-3">
      {providers.map(({ key, label }) => (
        <Button
          key={key}
          type="button"
          variant="secondary"
          className="w-full"
          disabled={isLoading}
          onClick={() => onSocialAuth?.(key)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
