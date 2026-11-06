import Link from "next/link";
import { Aperture, ArrowRight } from "lucide-react";

const primaryCta =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D9542B] px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-[#E3A867] hover:text-[#191713] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const secondaryCta =
  "inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const AboutHero = () => {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brand"
              />
              StudioSpace / About
            </div>

            <h1
              id="about-hero-heading"
              className="mt-5 font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-ink"
            >
              The Room Behind Every Great Creation.
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
              Great stories are shot somewhere. StudioSpace pairs creators
              with professional studio spaces — photo studios, sound stages, and
              podcast rooms — reserved by the hour, so the right room is always
              part of the plan.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/studios" className={primaryCta}>
                Explore Studios
                <ArrowRight className="size-4" />
              </Link>
              <Link href="#how-it-works" className={secondaryCta}>
                How It Works
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#191713] px-6 py-12 sm:px-10 lg:px-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1920&q=80")',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#12110E] via-[#12110E]/85 to-[#12110E]/40"
              />

              <span
                aria-hidden="true"
                className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#E3A867]/10 blur-3xl"
              />

              <div className="relative flex flex-col items-center text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-[#E3A867]/10 text-[#E3A867]">
                  <Aperture className="size-7" strokeWidth={1.6} />
                </span>

                <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-[#E3A867]">
                  StudioSpace Studios
                </p>

                <h2 className="mt-3 font-serif text-3xl leading-tight text-[#F4EEE4]">
                  Rooms built for the shot.
                </h2>

                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#CFC6B7]">
                  From daylight cyc walls to cinema-ready stages — creative
                  spaces made for the work.
                </p>

                <span className="mt-8 inline-flex h-9 items-center rounded-full border border-white/15 px-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[#CFC6B7]">
                  Reserved by the hour
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
