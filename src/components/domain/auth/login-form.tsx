"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { type LoginFormValues, loginSchema } from "@/lib/schemas/auth";

type LoginFormProps = {
  locale: string;
  isLoading?: boolean;
  serverError?: string;
  onSubmit: (values: LoginFormValues) => Promise<void>;
};

export function LoginForm({ locale, isLoading, serverError, onSubmit }: LoginFormProps) {
  const t = useTranslations("auth");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  async function handleFormSubmit(values: LoginFormValues) {
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        id="login-email"
        type="email"
        label={t("fields.email")}
        autoComplete="email"
        error={errors.email ? t("errors.emailInvalid") : undefined}
        disabled={isLoading}
        {...register("email")}
      />

      <div className="flex flex-col gap-1.5">
        <PasswordInput
          id="login-password"
          label={t("fields.password")}
          autoCompleteType="current-password"
          showPasswordLabel={t("actions.showPassword")}
          hidePasswordLabel={t("actions.hidePassword")}
          error={errors.password ? t("errors.passwordRequired") : undefined}
          disabled={isLoading}
          {...register("password")}
        />
        <div className="flex justify-end">
          <Link
            href={`/${locale}/forgot-password`}
            className="text-sm text-text-link transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            {t("login.forgotPassword")}
          </Link>
        </div>
      </div>

      {serverError && <FormMessage variant="error">{serverError}</FormMessage>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-2 w-full"
        disabled={isLoading}
      >
        {isLoading ? t("login.submit") : t("login.submit")}
      </Button>
    </form>
  );
}
