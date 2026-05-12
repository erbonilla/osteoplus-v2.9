"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enGB, es } from "date-fns/locale";
import { ArrowLeft, Loader2, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { RadioCard } from "@/components/ui/radio-card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Textarea } from "@/components/ui/textarea";
import { CLINIC_ADDRESS, generateWeekDays, practitioners, services } from "@/lib/booking/fixtures";
import type { ServiceBrowseMode, TimeOfDay } from "@/lib/booking/types";
import {
  type BookingStep1Values,
  type BookingStep2Values,
  type BookingStep3Values,
  bookingStep1Schema,
  bookingStep2Schema,
  bookingStep3Schema,
} from "@/lib/schemas/booking";
import { BookingStepper } from "./booking-stepper";
import { BookingSummaryCard } from "./booking-summary-card";
import { CalendarStrip } from "./calendar-strip";
import { PhoneInput } from "./phone-input";
import { ServiceCard } from "./service-card";
import { TimeSlot } from "./time-slot";

type BookingWizardProps = {
  onComplete: (bookingCode: string) => void;
};

export function BookingWizard({ onComplete }: BookingWizardProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const tFixtures = useTranslations("fixtures");
  const locale = useLocale();
  const dateFnsLocale = locale === "es" ? es : enGB;

  const [currentStep, setCurrentStep] = useState(1);
  const [browseMode, setBrowseMode] = useState<ServiceBrowseMode>("specialist");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [weekStart, setWeekStart] = useState(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return monday;
  });

  const weekDays = useMemo(() => generateWeekDays(weekStart), [weekStart]);

  const step1Form = useForm<BookingStep1Values>({
    resolver: zodResolver(bookingStep1Schema),
    mode: "onBlur",
    defaultValues: {
      patientType: undefined,
      visitType: undefined,
      serviceId: undefined,
    },
  });

  const step2Form = useForm<BookingStep2Values>({
    resolver: zodResolver(bookingStep2Schema),
    mode: "onBlur",
    defaultValues: {
      date: undefined,
      timeSlotId: undefined,
    },
  });

  const step3Form = useForm<BookingStep3Values>({
    resolver: zodResolver(bookingStep3Schema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
      consent: false,
    },
  });

  const selectedService = services.find((s) => s.id === step1Form.watch("serviceId"));
  const selectedDate = step2Form.watch("date");
  const selectedDay = weekDays.find((d) => d.date === selectedDate);
  const selectedSlot = selectedDay?.slots.find((s) => s.id === step2Form.watch("timeSlotId"));

  const formatDayOfWeek = useCallback(
    (date: string) => {
      const d = new Date(`${date}T12:00:00`);
      return format(d, "EEE", { locale: dateFnsLocale }).slice(0, 3);
    },
    [dateFnsLocale],
  );

  const formatDateLabel = useCallback((date: string) => {
    const d = new Date(`${date}T12:00:00`);
    return String(d.getDate());
  }, []);

  const handleStep1Next = async () => {
    const valid = await step1Form.trigger(undefined, { shouldFocus: true });
    if (valid) setCurrentStep(2);
  };

  const handleStep2Next = async () => {
    const valid = await step2Form.trigger(undefined, { shouldFocus: true });
    if (valid) setCurrentStep(3);
  };

  const handleStep3Submit = async (_values: BookingStep3Values) => {
    setIsSubmitting(true);
    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const code = `OST-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      onComplete(code);
    } catch {
      step3Form.setError("root", { message: t("errors.generic") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const slotsByTimeOfDay = useMemo(() => {
    if (!selectedDay) return { morning: [], afternoon: [], evening: [] };
    const grouped: Record<TimeOfDay, typeof selectedDay.slots> = {
      morning: [],
      afternoon: [],
      evening: [],
    };
    for (const slot of selectedDay.slots) {
      grouped[slot.timeOfDay].push(slot);
    }
    return grouped;
  }, [selectedDay]);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6">
      <BookingStepper currentStep={currentStep} totalSteps={3} />

      {/* Step 1: Service selection */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading text-xl font-bold text-text-primary">{t("step1.title")}</h1>
            <p className="mt-1 text-sm text-text-secondary">{t("step1.subtitle")}</p>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-text-primary">
              {t("patientType.question")}
            </legend>
            <RadioCard
              id="patient-new"
              name="patientType"
              value="new"
              label={t("patientType.new")}
              selected={step1Form.watch("patientType") === "new"}
              onChange={() => step1Form.setValue("patientType", "new", { shouldValidate: true })}
            />
            <RadioCard
              id="patient-returning"
              name="patientType"
              value="returning"
              label={t("patientType.returning")}
              selected={step1Form.watch("patientType") === "returning"}
              onChange={() =>
                step1Form.setValue("patientType", "returning", { shouldValidate: true })
              }
            />
            {step1Form.formState.errors.patientType && (
              <p className="text-sm text-feedback-error" role="alert">
                {t("errors.patientTypeRequired")}
              </p>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-text-primary">
              {t("visitType.question")}
            </legend>
            <RadioCard
              id="visit-inperson"
              name="visitType"
              value="in-person"
              label={t("visitType.inPerson")}
              selected={step1Form.watch("visitType") === "in-person"}
              onChange={() =>
                step1Form.setValue("visitType", "in-person", { shouldValidate: true })
              }
            />
            <RadioCard
              id="visit-video"
              name="visitType"
              value="video"
              label={t("visitType.video")}
              selected={step1Form.watch("visitType") === "video"}
              onChange={() => step1Form.setValue("visitType", "video", { shouldValidate: true })}
            />
            {step1Form.formState.errors.visitType && (
              <p className="text-sm text-feedback-error" role="alert">
                {t("errors.visitTypeRequired")}
              </p>
            )}
          </fieldset>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-text-primary">{t("service.sectionTitle")}</h2>
            <SegmentedControl
              name="browseMode"
              value={browseMode}
              onChange={(v) => setBrowseMode(v as ServiceBrowseMode)}
              options={[
                { value: "specialist", label: t("service.browseBySpecialist") },
                { value: "symptom", label: t("service.browseBySymptom") },
              ]}
            />
            <div className="flex flex-col gap-2">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={tFixtures(service.titleKey)}
                  description={tFixtures(service.descriptionKey)}
                  icon={service.icon}
                  selected={step1Form.watch("serviceId") === service.id}
                  durationLabel={t("service.duration", { minutes: service.durationMinutes })}
                  priceLabel={t("service.price", { amount: service.priceEur })}
                  onSelect={(id) => step1Form.setValue("serviceId", id, { shouldValidate: true })}
                />
              ))}
            </div>
            {step1Form.formState.errors.serviceId && (
              <p className="text-sm text-feedback-error" role="alert">
                {t("errors.serviceRequired")}
              </p>
            )}
          </div>

          <div className="sticky bottom-0 flex gap-3 border-t border-border-default bg-bg-primary pb-safe pt-4">
            <Button variant="primary" size="lg" className="flex-1" onClick={handleStep1Next}>
              {tCommon("continue")}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            <span>{t("help.phoneLine")}</span>
          </div>
        </div>
      )}

      {/* Step 2: Date and time */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading text-xl font-bold text-text-primary">{t("step2.title")}</h1>
            <p className="mt-1 text-sm text-text-secondary">{t("step2.subtitle")}</p>
          </div>

          {selectedService && (
            <div className="rounded-chip bg-bg-brand-subtle px-3 py-1.5 text-sm font-medium text-brand-primary">
              {tFixtures(selectedService.titleKey)}
            </div>
          )}

          <CalendarStrip
            days={weekDays}
            selectedDate={selectedDate ?? null}
            onSelectDate={(date) => {
              step2Form.setValue("date", date, { shouldValidate: true });
              step2Form.setValue("timeSlotId", "", { shouldValidate: false });
            }}
            onPrevWeek={() => {
              const prev = new Date(weekStart);
              prev.setDate(prev.getDate() - 7);
              setWeekStart(prev);
            }}
            onNextWeek={() => {
              const next = new Date(weekStart);
              next.setDate(next.getDate() + 7);
              setWeekStart(next);
            }}
            formatDayOfWeek={formatDayOfWeek}
            formatDateLabel={formatDateLabel}
          />
          {step2Form.formState.errors.date && (
            <p className="text-sm text-feedback-error" role="alert">
              {t("errors.dateRequired")}
            </p>
          )}

          {selectedDay && selectedDay.slots.length > 0 && (
            <div className="flex flex-col gap-4">
              {(["morning", "afternoon", "evening"] as const).map((period) => {
                const slots = slotsByTimeOfDay[period];
                if (slots.length === 0) return null;
                return (
                  <div key={period} className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-text-secondary">
                      {t(`calendar.${period}`)}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((slot) => (
                        <TimeSlot
                          key={slot.id}
                          id={slot.id}
                          time={slot.time}
                          selected={step2Form.watch("timeSlotId") === slot.id}
                          available={slot.available}
                          onSelect={(id) =>
                            step2Form.setValue("timeSlotId", id, { shouldValidate: true })
                          }
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {selectedDay && selectedDay.slots.length === 0 && (
            <div className="rounded-card border border-border-default bg-bg-secondary p-4 text-center">
              <p className="font-medium text-text-primary">{t("calendar.noSlotsTitle")}</p>
              <p className="mt-1 text-sm text-text-secondary">{t("calendar.noSlotsBody")}</p>
            </div>
          )}

          {step2Form.formState.errors.timeSlotId && (
            <p className="text-sm text-feedback-error" role="alert">
              {t("errors.timeRequired")}
            </p>
          )}

          <div className="sticky bottom-0 flex gap-3 border-t border-border-default bg-bg-primary pb-safe pt-4">
            <Button variant="secondary" size="lg" onClick={() => setCurrentStep(1)}>
              <ArrowLeft size={18} strokeWidth={2} />
              {tCommon("back")}
            </Button>
            <Button variant="primary" size="lg" className="flex-1" onClick={handleStep2Next}>
              {tCommon("continue")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm and details */}
      {currentStep === 3 && (
        <form
          onSubmit={step3Form.handleSubmit(handleStep3Submit)}
          className="flex flex-col gap-6"
          noValidate
        >
          <div>
            <h1 className="font-heading text-xl font-bold text-text-primary">{t("step3.title")}</h1>
            <p className="mt-1 text-sm text-text-secondary">{t("step3.subtitle")}</p>
          </div>

          {selectedService && selectedSlot && selectedDate && (
            <BookingSummaryCard
              serviceName={tFixtures(selectedService.titleKey)}
              practitionerName={practitioners[0]?.name}
              date={format(new Date(`${selectedDate}T12:00:00`), "PPP", { locale: dateFnsLocale })}
              time={selectedSlot.time}
              durationMinutes={selectedService.durationMinutes}
              location={CLINIC_ADDRESS}
              priceEur={selectedService.priceEur}
            />
          )}

          <div className="flex flex-col gap-4">
            <Input
              id="fullName"
              label={t("fields.fullName")}
              error={step3Form.formState.errors.fullName ? t("errors.fullNameRequired") : undefined}
              {...step3Form.register("fullName")}
            />

            <PhoneInput
              id="phone"
              label={t("fields.phone")}
              countryCodeLabel={t("fields.countryCode")}
              helperText={t("fields.phoneHelper")}
              error={step3Form.formState.errors.phone ? t("errors.phoneRequired") : undefined}
              {...step3Form.register("phone")}
            />

            <Input
              id="email"
              label={t("fields.email")}
              type="email"
              error={step3Form.formState.errors.email ? t("errors.emailInvalid") : undefined}
              {...step3Form.register("email")}
            />

            <Textarea
              id="notes"
              label={t("fields.notes")}
              helperText={t("fields.notesHelper")}
              {...step3Form.register("notes")}
            />

            <Checkbox
              id="consent"
              label={t("consent.label")}
              error={step3Form.formState.errors.consent ? t("consent.required") : undefined}
              {...step3Form.register("consent")}
            />
          </div>

          {step3Form.formState.errors.root && (
            <p
              className="rounded-card border border-feedback-error bg-feedback-error-subtle p-3 text-sm text-feedback-error"
              role="alert"
            >
              {step3Form.formState.errors.root.message}
            </p>
          )}

          <div className="sticky bottom-0 flex gap-3 border-t border-border-default bg-bg-primary pb-safe pt-4">
            <Button variant="secondary" size="lg" type="button" onClick={() => setCurrentStep(2)}>
              <ArrowLeft size={18} strokeWidth={2} />
              {tCommon("back")}
            </Button>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} strokeWidth={2} className="animate-spin" />
                  {t("confirming")}
                </>
              ) : (
                t("confirm")
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <Phone size={16} strokeWidth={2} aria-hidden="true" />
            <span>{t("help.phoneLine")}</span>
          </div>
        </form>
      )}
    </div>
  );
}
