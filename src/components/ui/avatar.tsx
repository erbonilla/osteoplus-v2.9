import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  name: string;
  src?: string;
  size?: AvatarSize;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-xl",
};

const sizePx: Record<AvatarSize, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

export function Avatar({ name, src, size = "md", className, ...props }: AvatarProps) {
  const initials = getInitials(name);
  const sizeClass = sizeClasses[size];
  const px = sizePx[size];

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        "bg-brand-primary osteoplus-on-brand",
        sizeClass,
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          width={px}
          height={px}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
}
