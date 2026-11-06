import {
  CalendarCheck,
  Clapperboard,
  Clock3,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Browse verified studios by category, daylight, and gear — shortlist the rooms that fit the brief.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Pick your date and block the hours you need. Pricing updates live as you extend the session.",
    icon: Clock3,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Send a booking request in one tap with upfront, all-in pricing. No calls, no back-and-forth.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Arrive and roll. The host keeps the room ready and stays on call for the whole session.",
    icon: Clapperboard,
  },
];

const AboutHowItWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="about-how-it-works-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
          <div>
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brand"
              />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
                How the platform works
              </p>
            </div>

            <h2
              id="about-how-it-works-heading"
              className="mt-3 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
            >
              Book in Four Simple{" "}
              <span className="italic">Steps.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              From first browse to final wrap — the whole booking flow takes
              minutes, not phone calls.
            </p>
          </div>
        </div>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <li
                key={step.number}
                className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_24px_48px_-30px_rgba(25,23,19,0.45)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-elevated text-brand">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-serif text-3xl leading-none text-ink/10 transition-colors group-hover:text-brand/20"
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-lg leading-tight text-ink sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default AboutHowItWorks;
