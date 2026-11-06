import { BadgeCheck, Headset, Lock, ShieldCheck } from "lucide-react";

const guarantees = [
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
    title: "Equipment Safety",
    description:
      "Studios list inspected gear with safeguards in place — locked storage, session logs, and house rules.",
    icon: Lock,
  },
  {
    title: "24/7 Host Support",
    description:
      "Questions at midnight or a no-show at 6 AM? Support and the host network are on call around the clock.",
    icon: Headset,
  },
];

const HostGuarantee = () => (
  <section
    id="host-guarantee"
    aria-labelledby="host-guarantee-heading"
    className="bg-canvas px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16"
  >
    <div className="mx-auto max-w-[1280px]">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#191713] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <span
          aria-hidden="true"
          className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#E3A867]/10 blur-3xl"
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-[#E3A867]" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E3A867]">
              Host guarantee / 05
            </p>
          </div>

          <h2
            id="host-guarantee-heading"
            className="mt-3 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-[#F4EEE4] sm:text-4xl lg:text-5xl"
          >
            Guarantees Built For{" "}
            <span className="italic text-[#E3A867]">Creators.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#CFC6B7]">
            Booking a stranger&apos;s room shouldn&apos;t feel like a risk.
            Four assurances stand behind every session on StudioSpace.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {guarantees.map((guarantee) => {
              const Icon = guarantee.icon;

              return (
                <div
                  key={guarantee.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#E3A867]/10 text-[#E3A867]">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-5 font-serif text-lg leading-tight text-[#F4EEE4] sm:text-xl">
                    {guarantee.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#CFC6B7]">
                    {guarantee.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
            <ShieldCheck className="size-4 shrink-0 text-[#E3A867]" />
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#CFC6B7]">
              Every booking backed end to end — from request to wrap.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HostGuarantee;
