import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

type ProfileRouteLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ProfileRouteLayout({ children, params }: ProfileRouteLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <>{children}</>;
}
