"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { personalInfoSchema } from "@/lib/schemas/profile";
import { ProfileSection } from "./profile-section";

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

const MOCK_USER: PersonalInfoFormValues = {
  firstName: "Ana",
  lastName: "García López",
  email: "ana.garcia@ejemplo.com",
  phone: "+34 612 345 678",
};

export function PersonalInfoSection() {
  const t = useTranslations("profile.personalInfo");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: MOCK_USER,
  });

  async function onSubmit(_data: PersonalInfoFormValues) {
    await new Promise((r) => setTimeout(r, 800));
    reset(_data);
  }

  const fullName = `${MOCK_USER.firstName} ${MOCK_USER.lastName}`;

  return (
    <ProfileSection id="personal-info" title={t("title")} description={t("description")}>
      {/* Avatar card */}
      <Card>
        <CardContent className="flex items-center gap-4">
          <Avatar name={fullName} size="lg" />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-text-primary">{fullName}</p>
            <p className="text-sm text-text-secondary">{MOCK_USER.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="firstName"
                label={t("fields.firstName")}
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <Input
                id="lastName"
                label={t("fields.lastName")}
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>
            <Input
              id="email"
              label={t("fields.email")}
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="phone"
              label={t("fields.phone")}
              type="tel"
              autoComplete="tel"
              helperText={t("fields.phoneHelper")}
              error={errors.phone?.message}
              {...register("phone")}
            />
          </CardContent>
          <CardFooter className="justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => reset()}
              disabled={!isDirty || isSubmitting}
            >
              {t("actions.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={!isDirty || isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? t("actions.saving") : t("actions.save")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </ProfileSection>
  );
}
