"use client";

import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";

type AuthShellProps = {
  children: ReactNode;
  locale: string;
  onClose?: () => void;
};

export function AuthShell({ children, locale, onClose }: AuthShellProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("auth.actions");

  function handleClose() {
    if (onClose) {
      onClose();
      return;
    }
    router.push(`/${locale}`);
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-secondary px-4 py-8">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-[360px] rounded-modal bg-surface-card p-6 shadow-elevated md:max-w-[440px] md:p-8"
      >
        <div className="absolute right-2 top-2">
          <IconButton aria-label={t("close")} onClick={handleClose}>
            <X size={20} strokeWidth={2} />
          </IconButton>
        </div>

        {children}
      </motion.div>
    </div>
  );
}
