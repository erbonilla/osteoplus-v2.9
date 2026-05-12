"use client";

import { Mail } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";

export type NewsletterLabels = {
  title: string;
  body: string;
  label: string;
  placeholder: string;
  cta: string;
  helper: string;
  success: string;
  invalid: string;
};

type NewsletterFormProps = {
  labels: NewsletterLabels;
};

export function NewsletterForm({ labels }: NewsletterFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <form
      className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-[18px] bg-bg-brand-solid px-4 py-10 text-text-on-brand-zone shadow-brand sm:px-8"
      id="booking"
      noValidate={false}
      onSubmit={handleSubmit}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-chip bg-bg-brand-solid-hover text-text-on-brand-zone">
        <Mail aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      </span>
      <h2 className="mt-4 text-center font-body font-bold text-3xl leading-tight">
        {labels.title}
      </h2>
      <p className="mt-3 max-w-xl text-center text-[0.9375rem] leading-relaxed">{labels.body}</p>
      <div className="mt-7 w-full max-w-2xl">
        <label className="font-medium text-sm" htmlFor={inputId}>
          {labels.label}
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            aria-describedby={`${inputId}-helper ${inputId}-status`}
            className="min-h-12 rounded-button border border-transparent bg-bg-primary px-4 text-text-primary text-base outline-none transition-shadow placeholder:text-text-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
            id={inputId}
            inputMode="email"
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            placeholder={labels.placeholder}
            required
            type="email"
            value={email}
          />
          <Button className="min-h-12" size="md" type="submit" variant="secondary">
            {labels.cta}
          </Button>
        </div>
        <p className="mt-3 text-xs leading-relaxed" id={`${inputId}-helper`}>
          {labels.helper}
        </p>
        <p aria-live="polite" className="mt-2 min-h-5 text-sm" id={`${inputId}-status`}>
          {status === "success" ? labels.success : status === "error" ? labels.invalid : ""}
        </p>
      </div>
    </form>
  );
}
