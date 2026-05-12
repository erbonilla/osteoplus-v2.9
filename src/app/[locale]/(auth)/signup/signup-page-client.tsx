"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AuthHeader } from "@/components/domain/auth/auth-header";
import { AuthShell } from "@/components/domain/auth/auth-shell";
import { SignupForm } from "@/components/domain/auth/signup-form";
import { SocialAuthButtons } from "@/components/domain/auth/social-auth-buttons";
import { Divider } from "@/components/ui/divider";
import type { Locale } from "@/i18n/routing";

type SignupPageClientProps = {
  locale: Locale;
};

export function SignupPageClient({ locale }: SignupPageClientProps) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>();

  const handleSignup = useCallback(async () => {
    setIsLoading(true);
    setServerError(undefined);

    try {
      // TODO: Wire Supabase Auth after provider confirmation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setServerError(t("errors.signupFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const handleSocialAuth = useCallback((_provider: "google" | "apple" | "email") => {
    // TODO: Wire social auth after provider confirmation
  }, []);

  return (
    <AuthShell locale={locale}>
      <AuthHeader title={t("signup.title")} description={t("signup.description")} />

      <SocialAuthButtons onSocialAuth={handleSocialAuth} isLoading={isLoading} />

      <Divider label={t("social.divider")} className="my-6" />

      <SignupForm isLoading={isLoading} serverError={serverError} onSubmit={handleSignup} />

      <p className="mt-6 text-center text-sm text-text-secondary">
        {t("signup.haveAccount")}{" "}
        <Link href={`/${locale}/login`} className="font-medium text-text-link hover:underline">
          {t("signup.signIn")}
        </Link>
      </p>
    </AuthShell>
  );
}
