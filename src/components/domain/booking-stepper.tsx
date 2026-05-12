"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type BookingStepperProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function BookingStepper({ currentStep, totalSteps, className }: BookingStepperProps) {
  const t = useTranslations("common");

  return (
    <nav
      aria-label={t("step", { current: currentStep, total: totalSteps })}
      className={cn("flex items-center gap-2", className)}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                isCompleted && "bg-brand-primary osteoplus-on-brand",
                isCurrent && "border-2 border-brand-primary text-brand-primary",
                !isCompleted && !isCurrent && "border border-border-default text-text-tertiary",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isCompleted ? <Check size={16} strokeWidth={2.5} /> : step}
            </div>
            {step < totalSteps && (
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors",
                  isCompleted ? "bg-brand-primary" : "bg-border-default",
                )}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
