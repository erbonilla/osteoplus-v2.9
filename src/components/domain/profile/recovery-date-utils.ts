import { type Locale as DateFnsLocale, format, parseISO } from "date-fns";
import { enGB, es } from "date-fns/locale";

const DATE_LOCALES: Record<string, DateFnsLocale> = {
  es,
  en: enGB,
};

export function formatSessionDate(iso: string, locale: string): string {
  const date = parseISO(iso);
  const dateFnsLocale = DATE_LOCALES[locale] ?? es;
  return format(date, "d MMM yyyy", { locale: dateFnsLocale });
}
