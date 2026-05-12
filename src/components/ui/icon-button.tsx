"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type IconButtonProps = Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  "aria-label": string;
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

export function IconButton({ className, type = "button", ref, ...props }: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center rounded-button bg-transparent text-text-primary transition-colors",
        "hover:bg-bg-secondary active:bg-bg-tertiary",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-text-tertiary",
        className,
      )}
      {...props}
    />
  );
}
