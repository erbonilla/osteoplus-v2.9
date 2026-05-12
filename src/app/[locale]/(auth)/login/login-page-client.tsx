"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AuthHeader } from "@/components/domain/auth/auth-header";
import { AuthShell } from "@/components/domain/auth/auth-shell";
import { LoginForm } from "@/components/domain/auth/login-form";
import { SocialAuthButtons } from "@/components/domain/auth/social-auth-buttons";
import { Divider } from "@/components/ui/divider";
import type { Locale } from "@/i18n/routing";

type LoginPageClientProps = {
  locale: Locale;
};

export function LoginPageClient({ locale }: LoginPageClientProps) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    setServerError(undefined);

    try {
      // TODO: Wire Supabase Auth after provider confirmation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setServerError(t("errors.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleSocialAuth = useCallback((_provider: "google" | "apple" | "email") => {
    // TODO: Wire social auth after provider confirmation
  }, []);

  return (
    <AuthShell locale={locale}>
      <AuthHeader title={t("login.title")} description={t("login.description")} />

      <SocialAuthButtons onSocialAuth={handleSocialAuth} isLoading={isLoading} />

      <Divider label={t("social.divider")} className="my-6" />

      <LoginForm
        locale={locale}
        isLoading={isLoading}
        serverError={serverError}
        onSubmit={handleLogin}
      />

      <p className="mt-6 text-center text-sm text-text-secondary">
        {t("login.noAccount")}{" "}
        <Link href={`/${locale}/signup`} className="font-medium text-text-link hover:underline">
          {t("login.createAccount")}
        </Link>
      </p>
    </AuthShell>
  );
}
