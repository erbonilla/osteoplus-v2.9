import { BrandLogo } from "@/components/brand/logo";

type AuthHeaderProps = {
  title: string;
  description: string;
  logoAlt?: string;
};

export function AuthHeader({ title, description, logoAlt = "Osteóplus" }: AuthHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <BrandLogo alt={logoAlt} className="mb-6 h-10 w-auto" />
      <h1 className="font-heading text-2xl font-bold text-text-primary">{title}</h1>
      <p className="mt-2 text-base text-text-secondary">{description}</p>
    </div>
  );
}
