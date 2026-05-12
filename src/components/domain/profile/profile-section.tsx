import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ProfileSectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function ProfileSection({
  id,
  title,
  description,
  children,
  className,
}: ProfileSectionProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1">
        <h1 id={`${id}-heading`} className="text-2xl font-semibold text-text-primary">
          {title}
        </h1>
        {description && <p className="text-base text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  );
}
