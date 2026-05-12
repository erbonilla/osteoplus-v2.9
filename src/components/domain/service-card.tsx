"use client";

import { Activity, Bone, Brain, HeartPulse, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

const iconMap: Record<string, ReactNode> = {
  Bone: <Bone size={24} strokeWidth={2} />,
  Activity: <Activity size={24} strokeWidth={2} />,
  HeartPulse: <HeartPulse size={24} strokeWidth={2} />,
  Brain: <Brain size={24} strokeWidth={2} />,
  Zap: <Zap size={24} strokeWidth={2} />,
};

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  icon: string;
  selected?: boolean;
  disabled?: boolean;
  durationLabel: string;
  priceLabel: string;
  onSelect: (id: string) => void;
};

export function ServiceCard({
  id,
  title,
  description,
  icon,
  selected,
  disabled,
  durationLabel,
  priceLabel,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-start gap-4 rounded-card border p-4 text-left transition-colors",
        "min-h-12 cursor-pointer",
        "hover:border-border-strong",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        selected
          ? "border-border-brand bg-bg-brand-subtle"
          : "border-border-default bg-surface-card",
        disabled && "pointer-events-none bg-bg-tertiary text-text-tertiary",
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-bg-secondary",
          selected && "bg-brand-primary osteoplus-on-brand",
        )}
        aria-hidden="true"
      >
        {iconMap[icon] ?? <Activity size={24} strokeWidth={2} />}
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-semibold text-text-primary">{title}</span>
        <span className="text-sm text-text-secondary">{description}</span>
        <span className="mt-1 flex flex-wrap gap-2">
          <Badge variant="neutral">{durationLabel}</Badge>
          <Badge variant="brand">{priceLabel}</Badge>
        </span>
      </span>
    </button>
  );
}
