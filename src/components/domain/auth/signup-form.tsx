"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { type SignupFormValues, signupSchema } from "@/lib/schemas/auth";

type SignupFormProps = {
  isLoading?: boolean;
  serverError?: string;
  onSubmit: (values: SignupFormValues) => Promise<void>;
};

export function SignupForm({ isLoading, serverError, onSubmit }: SignupFormProps) {
  const t = useTranslations("auth");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      healthConsent: false,
      termsAccepted: false,
      marketingOptIn: false,
    },
  });

  async function handleFormSubmit(values: SignupFormValues) {
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        id="signup-fullName"
        label={t("fields.fullName")}
        autoComplete="name"
        error={errors.fullName ? t("errors.fullNameMin") : undefined}
        disabled={isLoading}
        {...register("fullName")}
      />

      <Input
        id="signup-email"
        type="email"
        label={t("fields.email")}
        autoComplete="email"
        error={errors.email ? t("errors.emailInvalid") : undefined}
        disabled={isLoading}
        {...register("email")}
      />

      <Input
        id="signup-phone"
        type="tel"
        label={t("fields.phoneOptional")}
        autoComplete="tel"
        disabled={isLoading}
        {...register("phone")}
      />

      <PasswordInput
        id="signup-password"
        label={t("fields.password")}
        autoCompleteType="new-password"
        showPasswordLabel={t("actions.showPassword")}
        hidePasswordLabel={t("actions.hidePassword")}
        helperText={t("fields.passwordHint")}
        error={errors.password ? t("errors.passwordMin") : undefined}
        disabled={isLoading}
        {...register("password")}
      />

      <PasswordInput
        id="signup-confirmPassword"
        label={t("fields.confirmPassword")}
        autoCompleteType="new-password"
        showPasswordLabel={t("actions.showPassword")}
        hidePasswordLabel={t("actions.hidePassword")}
        error={errors.confirmPassword ? t("errors.passwordMismatch") : undefined}
        disabled={isLoading}
        {...register("confirmPassword")}
      />

      <Divider className="my-2" />

      <Checkbox
        id="signup-healthConsent"
        label={t("privacy.healthConsent")}
        error={errors.healthConsent ? t("errors.healthConsentRequired") : undefined}
        disabled={isLoading}
        {...register("healthConsent")}
      />

      <Checkbox
        id="signup-termsAccepted"
        label={t("privacy.terms")}
        error={errors.termsAccepted ? t("errors.termsRequired") : undefined}
        disabled={isLoading}
        {...register("termsAccepted")}
      />

      <Checkbox
        id="signup-marketingOptIn"
        label={t("privacy.marketing")}
        helperText={t("privacy.marketingHelper")}
        disabled={isLoading}
        {...register("marketingOptIn")}
      />

      <div className="mt-1 flex items-center gap-2 text-sm text-text-tertiary">
        <ShieldCheck size={20} strokeWidth={2} className="shrink-0" />
        <span>{t("privacy.gdpr")}</span>
      </div>

      {serverError && <FormMessage variant="error">{serverError}</FormMessage>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-2 w-full"
        disabled={isLoading}
      >
        {t("signup.submit")}
      </Button>
    </form>
  );
}
