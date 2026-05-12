"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const logoPaths = {
  "primary-teal": "/logos/osteoplus-logo-primary-teal.svg",
  "teal-300": "/logos/osteoplus-logo-teal-300.svg",
  white: "/logos/osteoplus-logo-white.svg",
  black: "/logos/osteoplus-logo-black.svg",
  original: "/logos/osteoplus-original-logo.svg",
  favicon: "/logos/favicon.svg",
} as const;

export type LogoVariant = keyof typeof logoPaths;

type BrandLogoProps = {
  variant?: LogoVariant;
  alt: string;
  className?: string;
};

export function BrandLogo({ alt, className, variant = "primary-teal" }: BrandLogoProps) {
  return (
    <Image
      alt={alt}
      className={cn("h-10 w-auto", className)}
      height={98}
      src={logoPaths[variant]}
      width={292}
    />
  );
}
