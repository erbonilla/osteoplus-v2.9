"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ProfileSideNavItemProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  disabled?: boolean;
  onClick: (id: string) => void;
};

export function ProfileSideNavItem({
  id,
  label,
  icon: Icon,
  isActive,
  disabled = false,
  onClick,
}: ProfileSideNavItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      disabled={disabled}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-input px-3 py-2.5 text-left text-base font-medium transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        isActive
          ? "bg-bg-brand-subtle text-brand-primary"
          : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
        disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-text-secondary",
      )}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={2}
        className={cn("h-5 w-5 shrink-0", isActive ? "text-brand-primary" : "text-text-tertiary")}
      />
      <span>{label}</span>
    </button>
  );
}
