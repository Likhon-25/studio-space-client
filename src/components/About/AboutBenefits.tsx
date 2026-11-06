import { BadgeCheck, CalendarCheck, Headset, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Upfront, All-In Pricing",
    description:
      "Pick your shoot hours and book with upfront, all-in pricing. No calls, no back-and-forth.",
    icon: CalendarCheck,
  },
  {
    title: "Liability Protection",
    description:
      "Every booking is covered end to end — clear terms, secure deposits, and damage protection in writing.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description:
      "Hosts and creators are identity-checked before first contact, so both sides book with confidence.",
    icon: BadgeCheck,
  },
  {
    title: "24/7 Host Support",
    description:
      "Questions at midnight or a no-show at 6 AM? Support and the host network are on call around the clock.",
    icon: Headset,
  },
];

const AboutBenefits = () => {
  return (
    <section
      aria-labelledby="about-benefits-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-brand"
            />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
              Why StudioSpace
            </p>
          </div>

          <h2
            id="about-benefits-heading"
            className="mt-3 font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            Why Choose <span className="italic">StudioSpace.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Everything about the booking experience is built around one idea —
            protecting the creative work before, during, and after the shoot.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_24px_48px_-30px_rgba(25,23,19,0.45)]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-elevated text-brand transition-colors group-hover:bg-brand group-hover:text-[#FBF8F2]">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>

                <h3 className="mt-5 font-serif text-lg leading-tight text-ink sm:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutBenefits;
