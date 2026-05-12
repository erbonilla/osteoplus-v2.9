"use client";

import { Eye, EyeOff } from "lucide-react";
import { type ComponentPropsWithoutRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

type PasswordInputProps = Omit<ComponentPropsWithoutRef<typeof Input>, "type"> & {
  showPasswordLabel: string;
  hidePasswordLabel: string;
  autoCompleteType?: "new-password" | "current-password";
};

export function PasswordInput({
  showPasswordLabel,
  hidePasswordLabel,
  autoCompleteType = "current-password",
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        autoComplete={autoCompleteType}
        className={cn("pr-12", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? hidePasswordLabel : showPasswordLabel}
        className={cn(
          "absolute right-0 top-[calc(1.25rem+6px)] flex min-h-12 min-w-12 items-center justify-center rounded-input bg-transparent text-text-tertiary transition-colors",
          "hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        )}
      >
        {visible ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
      </button>
    </div>
  );
}
