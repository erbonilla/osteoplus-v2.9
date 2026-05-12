import { z } from "zod";

export const bookingStep1Schema = z.object({
  patientType: z.enum(["new", "returning"]),
  visitType: z.enum(["in-person", "video"]),
  serviceId: z.string().min(1),
});

export type BookingStep1Values = z.infer<typeof bookingStep1Schema>;

export const bookingStep2Schema = z.object({
  date: z.string().min(1),
  timeSlotId: z.string().min(1),
});

export type BookingStep2Values = z.infer<typeof bookingStep2Schema>;

export const bookingStep3Schema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z
    .string()
    .min(9)
    .regex(/^[+\d\s()-]+$/),
  email: z.union([z.email(), z.literal("")]),
  notes: z.string().max(500),
  consent: z.boolean().refine((v) => v === true),
});

export type BookingStep3Values = z.infer<typeof bookingStep3Schema>;

export const bookingFullSchema = bookingStep1Schema
  .merge(bookingStep2Schema)
  .merge(bookingStep3Schema);

export type BookingFullValues = z.infer<typeof bookingFullSchema>;
