const AboutMission = () => {
  return (
    <section
      id="mission"
      aria-labelledby="about-mission-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-brand"
              />
              The Mission
            </div>

            <h2
              id="about-mission-heading"
              className="mt-5 font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
            >
              Our Mission.
            </h2>

            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-[15px]">
              StudioSpace exists to make the most important part of any great
              production effortless: finding the room.
            </p>
          </div>

          <div className="lg:col-span-3">
            <blockquote className="border-l-2 border-brand pl-6 font-serif text-2xl leading-snug text-ink sm:text-3xl">
              StudioSpace pairs creators with the rooms that make their work
              possible — from daylight cyc walls to sound stages, reserved by the
              hour.
            </blockquote>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Great stories deserve great rooms, and our platform connects
              independent creators with professional studio spaces through
              upfront, all-in pricing, verified profiles, and host support
              behind every booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
