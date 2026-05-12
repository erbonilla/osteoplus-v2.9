"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type ThemeToggleLabels = {
  light: string;
  dark: string;
  system: string;
  aria: string;
};

type ThemeToggleProps = {
  labels: ThemeToggleLabels;
};

const themeOrder = ["system", "light", "dark"] as const;
type ThemeName = (typeof themeOrder)[number];

function isThemeName(value: string | undefined): value is ThemeName {
  return themeOrder.includes(value as ThemeName);
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted && isThemeName(theme) ? theme : "system";
  const nextTheme =
    themeOrder[(themeOrder.indexOf(currentTheme) + 1) % themeOrder.length] ?? "system";
  const Icon = currentTheme === "dark" ? Moon : currentTheme === "light" ? Sun : Monitor;

  return (
    <Button
      aria-label={`${labels.aria}: ${labels[currentTheme]}`}
      onClick={() => setTheme(nextTheme)}
      size="md"
      type="button"
      variant="secondary"
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
      <span>{labels[currentTheme]}</span>
    </Button>
  );
}
