import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BrandLogo } from "@/components/brand/logo";
import {
  LandingHeader,
  type LandingHeaderLabels,
  type LandingNavItem,
} from "@/components/landing/landing-header";
import { MotionSection } from "@/components/landing/motion-section";
import { NewsletterForm, type NewsletterLabels } from "@/components/landing/newsletter-form";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type LandingPageProps = {
  locale: Locale;
};

type ServiceItem = {
  title: string;
  body: string;
  imageAlt: string;
  icon: "osteopathy" | "physiotherapy" | "rehabilitation";
};

type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
  imageAlt: string;
};

type StatItem = {
  value: string;
  label: string;
  icon: "experience" | "patients" | "accessibility";
};

type FooterColumn = {
  title: string;
  links: string[];
};

const serviceIcons = {
  osteopathy: Stethoscope,
  physiotherapy: Sparkles,
  rehabilitation: ShieldCheck,
} as const;

const statIcons = {
  accessibility: Award,
  experience: Clock,
  patients: Users,
} as const;

const socialLinks = [
  { href: "https://www.linkedin.com", icon: "/images/team/linkedin.svg", key: "linkedin" },
  { href: "https://www.instagram.com", icon: "/images/team/instagram.svg", key: "instagram" },
  { href: "https://www.facebook.com", icon: "/images/team/facebook.svg", key: "facebook" },
] as const;
const fiveStars = ["star-1", "star-2", "star-3", "star-4", "star-5"] as const;
const testimonialDots = ["dot-1", "dot-2", "dot-3", "dot-4", "dot-5"] as const;

export async function LandingPage({ locale }: LandingPageProps) {
  const t = await getTranslations("landing");
  const headerLabels = t.raw("header") as LandingHeaderLabels;
  const navItems = t.raw("header.navItems") as LandingNavItem[];
  const services = t.raw("services.items") as ServiceItem[];
  const team = t.raw("team.items") as TeamMember[];
  const testimonials = t.raw("testimonials.items") as Testimonial[];
  const stats = t.raw("about.stats") as StatItem[];
  const footerColumns = t.raw("footer.columns") as FooterColumn[];
  const newsletterLabels = t.raw("subscribe") as NewsletterLabels;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary" id="top">
      <LandingHeader labels={headerLabels} locale={locale} navItems={navItems} />
      <Hero bookingHref={`/${locale}/booking`} />
      <Services services={services} />
      <Team labels={t.raw("team.socialLabels") as Record<string, string>} members={team} />
      <Testimonials items={testimonials} />
      <About stats={stats} />
      <Subscribe labels={newsletterLabels} />
      <Footer columns={footerColumns} labels={t.raw("footer") as FooterLabels} />
    </main>
  );
}

async function Hero({ bookingHref }: { bookingHref: string }) {
  const t = await getTranslations("landing.hero");

  return (
    <section className="overflow-hidden bg-bg-brand-solid text-text-on-brand-zone">
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-5 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,30rem)] lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-chip px-3 py-1 font-bold text-xs tracking-[0.12em] uppercase">
            <span className="h-1.5 w-1.5 rounded-chip bg-border-focus" />
            {t("eyebrow")}
          </p>
          <h1 className="mt-6 max-w-2xl font-body font-bold text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {t("titleStart")}{" "}
            <span className="font-heading font-bold italic">{t("titleEmphasisOne")}</span>
            <br />
            {t("titleMiddle")}{" "}
            <span className="font-heading font-bold italic">{t("titleEmphasisTwo")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-on-brand-zone/90">
            {t("body")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="bg-bg-primary text-text-primary hover:bg-bg-secondary"
              size="lg"
              variant="secondary"
            >
              <Link href={bookingHref}>
                <CalendarDays aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                {t("primaryCta")}
              </Link>
            </Button>
            <Button
              asChild
              className="border-text-on-brand-zone text-text-on-brand-zone hover:bg-surface-card/10"
              size="lg"
              variant="outline"
            >
              <a href="#services">
                {t("secondaryCta")}
                <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
              </a>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute inset-x-8 bottom-0 h-24 rounded-chip bg-bg-brand-solid-hover blur-2xl" />
          <Image
            alt={t("imageAlt")}
            className="relative mx-auto h-auto w-full object-contain"
            height={844}
            priority
            src="/images/hero/hero-photo.png"
            width={633}
          />
        </div>
      </div>
    </section>
  );
}

async function Services({ services }: { services: ServiceItem[] }) {
  const t = await getTranslations("landing.services");

  return (
    <MotionSection className="bg-bg-tertiary px-4 py-16 sm:px-5 md:py-20 lg:px-8" id="services">
      <SectionHeader align="center" eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];

          return (
            <article
              className="rounded-modal border border-transparent p-7 transition-colors hover:border-border-brand"
              key={service.title}
            >
              <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-chip border border-border-brand text-border-brand">
                <Icon aria-hidden="true" className="h-9 w-9" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-body font-bold text-xl leading-snug">{service.title}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-secondary">
                {service.body}
              </p>
            </article>
          );
        })}
      </div>
    </MotionSection>
  );
}

async function Team({
  labels,
  members,
}: {
  labels: Record<string, string>;
  members: TeamMember[];
}) {
  const t = await getTranslations("landing.team");

  return (
    <MotionSection
      className="bg-bg-brand-solid px-4 py-16 text-text-on-brand-zone sm:px-5 md:py-20 lg:px-8"
      id="team"
    >
      <SectionHeader
        align="center"
        body={t("body")}
        eyebrow={t("eyebrow")}
        onBrand
        title={t("title")}
      />
      <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
            key={member.name}
          >
            <Image
              alt={member.imageAlt}
              className="h-52 w-52 rounded-chip object-cover shadow-[0_8px_12px_rgb(0_0_0_/_0.18)]"
              height={254}
              src={member.image}
              width={203}
            />
            <h3 className="mt-5 font-medium text-base">{member.name}</h3>
            <p className="mt-1 text-sm">{member.role}</p>
            <div className="mt-3 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  aria-label={`${labels[social.key] ?? social.key}: ${member.name}`}
                  className="flex h-12 w-12 items-center justify-center rounded-chip border border-text-on-brand-zone transition-colors hover:bg-surface-card/10"
                  href={social.href}
                  key={social.key}
                >
                  <Image alt="" aria-hidden="true" height={18} src={social.icon} width={18} />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}

async function Testimonials({ items }: { items: Testimonial[] }) {
  const t = await getTranslations("landing.testimonials");
  const first = items[0];

  return (
    <MotionSection
      className="overflow-hidden bg-bg-tertiary px-4 py-16 sm:px-5 md:py-20 lg:px-8"
      id="testimonials"
    >
      <SectionHeader align="center" body={t("body")} eyebrow={t("eyebrow")} title={t("title")} />
      {first ? (
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-6">
          <SliderButton label={t("previous")} direction="previous" />
          <article className="rounded-modal bg-bg-brand-solid px-5 py-10 text-center text-text-on-brand-zone shadow-card sm:px-14">
            <Quote
              aria-hidden="true"
              className="mx-auto h-10 w-10 text-border-focus"
              strokeWidth={2}
            />
            <span className="sr-only">{t("rating")}</span>
            <div aria-hidden="true" className="mt-5 flex justify-center gap-1 text-accent-default">
              {fiveStars.map((star) => (
                <Star
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                  key={star}
                  strokeWidth={2}
                />
              ))}
            </div>
            <blockquote className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
              {first.quote}
            </blockquote>
            <Image
              alt={first.imageAlt}
              className="mx-auto mt-6 h-[4.25rem] w-[4.25rem] rounded-chip border-2 border-border-default object-cover"
              height={67}
              src="/images/testimonials/pilar.png"
              width={67}
            />
            <p className="mt-4 font-semibold">{first.name}</p>
            <p className="mt-1 text-sm">{first.meta}</p>
          </article>
          <SliderButton label={t("next")} direction="next" />
        </div>
      ) : null}
      <div className="mt-7 flex justify-center gap-2" aria-hidden="true">
        {testimonialDots.map((dot, index) => (
          <span
            className={
              index === 0
                ? "h-3 w-3 rounded-chip bg-bg-brand-solid"
                : "h-2.5 w-2.5 rounded-chip bg-bg-brand-solid"
            }
            key={dot}
          />
        ))}
      </div>
    </MotionSection>
  );
}

function SliderButton({ direction, label }: { direction: "previous" | "next"; label: string }) {
  const Icon = direction === "previous" ? ArrowLeft : ArrowRight;

  return (
    <button
      aria-label={label}
      className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-chip bg-bg-brand-solid text-text-on-brand-zone shadow-card transition-colors hover:bg-bg-brand-solid-hover"
      type="button"
    >
      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

async function About({ stats }: { stats: StatItem[] }) {
  const t = await getTranslations("landing.about");

  return (
    <MotionSection
      className="bg-bg-brand-solid px-4 py-16 text-text-on-brand-zone sm:px-5 md:py-20 lg:px-8"
      id="about"
    >
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
        <Image
          alt={t("imageAlt")}
          className="min-h-72 w-full rounded-[20px] border border-border-default object-cover shadow-[0_24px_60px_rgb(0_0_0_/_0.3)]"
          height={720}
          src="/images/about/clinic.png"
          width={1080}
        />
        <div>
          <p className="font-bold text-xs tracking-[0.14em] uppercase text-text-on-brand-zone">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-body font-bold text-4xl leading-tight md:text-[2.75rem]">
            {t("titleStart")} <span className="font-heading italic">{t("titleEmphasis")}</span>
          </h2>
          <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed">{t("body")}</p>
          <div className="mt-7 h-px bg-bg-primary/70" />
          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = statIcons[stat.icon];

              return (
                <div key={stat.label}>
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                  <p className="mt-3 font-bold text-3xl leading-tight">{stat.value}</p>
                  <p className="mt-1 text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function Subscribe({ labels }: { labels: NewsletterLabels }) {
  return (
    <section className="bg-bg-tertiary px-4 py-16 sm:px-5 md:py-20 lg:px-8" id="subscribe">
      <NewsletterForm labels={labels} />
    </section>
  );
}

type FooterLabels = {
  logoAlt: string;
  description: string;
  copyright: string;
  legalLinks: string[];
  socialLabels: Record<string, string>;
  contact: {
    address: string[];
    phone: string;
    mobile: string;
    email: string;
    hours: string[];
  };
  columns: FooterColumn[];
};

function Footer({ columns, labels }: { columns: FooterColumn[]; labels: FooterLabels }) {
  return (
    <footer className="bg-surface-footer text-text-on-brand-zone" id="contact">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo alt={labels.logoAlt} className="h-8" variant="white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">{labels.description}</p>
          <div className="mt-5 flex gap-2">
            {socialLinks.map((social) => (
              <a
                aria-label={labels.socialLabels[social.key] ?? social.key}
                className="flex h-12 w-12 items-center justify-center rounded-chip border border-text-on-brand-zone transition-colors hover:bg-surface-card/10"
                href={social.href}
                key={social.key}
              >
                <Image alt="" aria-hidden="true" height={18} src={social.icon} width={18} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-bold text-xs tracking-[0.14em] uppercase">{column.title}</h2>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    className="inline-flex min-h-12 items-center text-sm hover:underline"
                    href="#services"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <FooterContact labels={labels} />
      <div className="border-border-default border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs sm:px-5 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{labels.copyright}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {labels.legalLinks.map((link) => (
              <a className="min-h-12 hover:underline" href="#contact" key={link}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({ labels }: { labels: FooterLabels }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 lg:px-8">
      <div className="grid gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
        <ContactItem icon="map" lines={labels.contact.address} />
        <ContactItem
          href={`tel:${labels.contact.phone.replaceAll(" ", "")}`}
          icon="phone"
          lines={[labels.contact.phone]}
        />
        <ContactItem
          href={`tel:${labels.contact.mobile.replaceAll(" ", "")}`}
          icon="phone"
          lines={[labels.contact.mobile]}
        />
        <ContactItem
          href={`mailto:${labels.contact.email}`}
          icon="mail"
          lines={[labels.contact.email, ...labels.contact.hours]}
        />
      </div>
    </div>
  );
}

function ContactItem({
  href,
  icon,
  lines,
}: {
  href?: string;
  icon: "mail" | "map" | "phone";
  lines: string[];
}) {
  const Icon = icon === "map" ? MapPin : icon === "mail" ? Mail : Phone;
  const content = (
    <>
      <Icon aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" strokeWidth={2} />
      <span className="grid gap-1">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </>
  );

  if (href) {
    return (
      <a className="flex min-h-12 gap-3 hover:underline" href={href}>
        {content}
      </a>
    );
  }

  return <div className="flex min-h-12 gap-3">{content}</div>;
}

function SectionHeader({
  align,
  body,
  eyebrow,
  onBrand,
  title,
}: {
  align: "center" | "left";
  body: string;
  eyebrow: string;
  onBrand?: boolean;
  title: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        className={
          onBrand
            ? "font-bold text-xs tracking-[0.14em] uppercase text-text-on-brand-zone"
            : "font-bold text-xs tracking-[0.14em] uppercase text-brand-primary"
        }
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-body font-bold text-3xl leading-tight md:text-[2.5rem]">{title}</h2>
      <p
        className={
          onBrand
            ? "mt-4 text-[0.9375rem] leading-relaxed"
            : "mt-4 text-[0.9375rem] leading-relaxed text-text-secondary"
        }
      >
        {body}
      </p>
    </div>
  );
}
