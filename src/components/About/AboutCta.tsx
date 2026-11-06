import Link from "next/link";
import { ArrowRight } from "lucide-react";

const primaryCta =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D9542B] px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-[#E3A867] hover:text-[#191713] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const AboutCta = () => {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#191713] px-6 py-14 text-center sm:px-12">
          <span
            aria-hidden="true"
            className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#E3A867]/10 blur-3xl"
          />

          <div className="relative flex flex-col items-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#E3A867]">
              StudioSpace / Ready
            </p>

            <h2
              id="about-cta-heading"
              className="mt-4 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-[#F4EEE4] sm:text-4xl lg:text-5xl"
            >
              Ready to find your room?
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CFC6B7]">
              Explore the roster of professional studios waiting for their next
              great creation.
            </p>

            <Link href="/studios" className={`${primaryCta} mt-8`}>
              Explore Studios
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
