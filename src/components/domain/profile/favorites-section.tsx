import type { LucideIcon } from "lucide-react";
import { ChevronRight, Dumbbell, FileText, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { ProfileSection } from "./profile-section";

const MOCK_EXERCISES = [
  { id: "e1", name: "Estiramiento cervical lateral", duration: "5 min" },
  { id: "e2", name: "Fortalecimiento de core — nivel básico", duration: "15 min" },
  { id: "e3", name: "Movilización torácica en decúbito", duration: "8 min" },
];

const MOCK_PROVIDERS = [
  { id: "p1", name: "Dra. Laura Martínez", specialty: "Osteopatía" },
  { id: "p2", name: "Dr. Jordi Ruiz", specialty: "Fisioterapia" },
];

const MOCK_ARTICLES = [
  { id: "a1", title: "Cómo mejorar tu postura al trabajar desde casa", readTime: "4 min" },
  { id: "a2", title: "Técnicas de respiración para el dolor crónico", readTime: "6 min" },
];

type FavoriteItemProps = {
  icon: LucideIcon;
  primary: string;
  secondary: string;
  isLast: boolean;
};

function FavoriteItem({ icon: Icon, primary, secondary, isLast }: FavoriteItemProps) {
  return (
    <>
      <div className="flex items-center gap-3 py-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-bg-brand-subtle">
          <Icon aria-hidden="true" className="h-5 w-5 text-brand-primary" strokeWidth={2} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="truncate text-base font-medium text-text-primary">{primary}</p>
          <p className="text-sm text-text-secondary">{secondary}</p>
        </div>
        <ChevronRight
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-text-tertiary"
          strokeWidth={2}
        />
      </div>
      {!isLast && <Divider />}
    </>
  );
}

export function FavoritesSection() {
  const t = useTranslations("profile.favorites");

  return (
    <ProfileSection id="favorites" title={t("title")} description={t("description")}>
      {/* Exercises */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Dumbbell aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("exercises.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="py-0 pb-1">
          {MOCK_EXERCISES.length > 0 ? (
            MOCK_EXERCISES.map((ex, i) => (
              <FavoriteItem
                key={ex.id}
                icon={Dumbbell}
                primary={ex.name}
                secondary={ex.duration}
                isLast={i === MOCK_EXERCISES.length - 1}
              />
            ))
          ) : (
            <p className="py-3 text-sm text-text-tertiary">{t("exercises.empty")}</p>
          )}
        </CardContent>
      </Card>

      {/* Providers */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Stethoscope
              aria-hidden="true"
              className="h-5 w-5 text-text-tertiary"
              strokeWidth={2}
            />
            <h2 className="text-base font-semibold text-text-primary">{t("providers.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="py-0 pb-1">
          {MOCK_PROVIDERS.length > 0 ? (
            MOCK_PROVIDERS.map((p, i) => (
              <FavoriteItem
                key={p.id}
                icon={Stethoscope}
                primary={p.name}
                secondary={p.specialty}
                isLast={i === MOCK_PROVIDERS.length - 1}
              />
            ))
          ) : (
            <p className="py-3 text-sm text-text-tertiary">{t("providers.empty")}</p>
          )}
        </CardContent>
      </Card>

      {/* Articles */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("articles.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="py-0 pb-1">
          {MOCK_ARTICLES.length > 0 ? (
            MOCK_ARTICLES.map((a, i) => (
              <FavoriteItem
                key={a.id}
                icon={FileText}
                primary={a.title}
                secondary={a.readTime}
                isLast={i === MOCK_ARTICLES.length - 1}
              />
            ))
          ) : (
            <p className="py-3 text-sm text-text-tertiary">{t("articles.empty")}</p>
          )}
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
