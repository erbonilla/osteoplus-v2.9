import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "profile.personalInfo.errors.firstNameMin")
    .nonempty("profile.personalInfo.errors.firstNameRequired"),
  lastName: z
    .string()
    .min(2, "profile.personalInfo.errors.lastNameMin")
    .nonempty("profile.personalInfo.errors.lastNameRequired"),
  email: z
    .string()
    .nonempty("profile.personalInfo.errors.emailRequired")
    .email("profile.personalInfo.errors.emailInvalid"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-().]{7,20}$/.test(val),
      "profile.personalInfo.errors.phoneInvalid",
    ),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
