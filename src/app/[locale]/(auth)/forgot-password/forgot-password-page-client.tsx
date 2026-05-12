"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthHeader } from "@/components/domain/auth/auth-header";
import { AuthShell } from "@/components/domain/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n/routing";
import { type ForgotPasswordFormValues, forgotPasswordSchema } from "@/lib/schemas/auth";

type ForgotPasswordPageClientProps = {
  locale: Locale;
};

export function ForgotPasswordPageClient({ locale }: ForgotPasswordPageClientProps) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(async (_values: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      // TODO: Wire Supabase Auth password reset
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isSuccess) {
    return (
      <AuthShell locale={locale}>
        <AuthHeader
          title={t("forgotPassword.successTitle")}
          description={t("forgotPassword.successDescription")}
        />

        <div className="mt-6">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/${locale}/login`}>{t("forgotPassword.backToLogin")}</Link>
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell locale={locale}>
      <AuthHeader title={t("forgotPassword.title")} description={t("forgotPassword.description")} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          id="forgot-email"
          label={t("fields.email")}
          type="email"
          autoComplete="email"
          error={errors.email?.message ? t("errors.emailInvalid") : undefined}
          {...register("email")}
        />

        {errors.root?.message && (
          <FormMessage variant="error" id="forgot-error">
            {errors.root.message}
          </FormMessage>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? "..." : t("forgotPassword.submit")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        <Link href={`/${locale}/login`} className="font-medium text-text-link hover:underline">
          {t("forgotPassword.backToLogin")}
        </Link>
      </p>
    </AuthShell>
  );
}
