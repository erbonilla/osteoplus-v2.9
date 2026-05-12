import { Phone, UserCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileSection } from "./profile-section";

const MOCK_FAMILY_PROFILES = [
  { id: "f1", name: "Carlos García", relation: "Cónyuge", hasPlan: true },
  { id: "f2", name: "Sofía García", relation: "Hija", hasPlan: false },
];

const MOCK_EMERGENCY_CONTACT = {
  name: "Carlos García López",
  phone: "+34 612 987 654",
  relation: "Cónyuge",
};

export function FamilySection() {
  const t = useTranslations("profile.family");

  return (
    <ProfileSection id="family" title={t("title")} description={t("description")}>
      {/* Linked profiles */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle2
              aria-hidden="true"
              className="h-5 w-5 text-text-tertiary"
              strokeWidth={2}
            />
            <h2 className="text-base font-semibold text-text-primary">{t("profiles.title")}</h2>
          </div>
        </CardHeader>
        <CardContent>
          {MOCK_FAMILY_PROFILES.length > 0 ? (
            <ul className="flex flex-col divide-y divide-border-default">
              {MOCK_FAMILY_PROFILES.map((member, i) => (
                <li
                  key={member.id}
                  className={`flex items-center justify-between gap-3 ${i === 0 ? "pb-3" : "py-3"}`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} size="sm" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-base font-medium text-text-primary">{member.name}</p>
                      <p className="text-sm text-text-secondary">{member.relation}</p>
                    </div>
                  </div>
                  {member.hasPlan && <Badge variant="brand">{t("profiles.hasPlan")}</Badge>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-tertiary">{t("profiles.empty")}</p>
          )}
        </CardContent>
      </Card>

      {/* Emergency contact */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Phone aria-hidden="true" className="h-5 w-5 text-text-tertiary" strokeWidth={2} />
            <h2 className="text-base font-semibold text-text-primary">{t("emergency.title")}</h2>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p className="text-base font-medium text-text-primary">{MOCK_EMERGENCY_CONTACT.name}</p>
          <p className="text-sm text-text-secondary">{MOCK_EMERGENCY_CONTACT.relation}</p>
          <a
            href={`tel:${MOCK_EMERGENCY_CONTACT.phone.replace(/\s/g, "")}`}
            className="mt-1 text-base font-medium text-brand-primary underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
          >
            {MOCK_EMERGENCY_CONTACT.phone}
          </a>
        </CardContent>
      </Card>
    </ProfileSection>
  );
}
