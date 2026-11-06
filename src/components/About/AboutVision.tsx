const AboutVision = () => {
  const commitments = [
    "Every creator deserves a room that feels made for their story.",
    "Professional studios should be as easy to book as renting gear.",
    "Great work should never wait on availability.",
  ];

  return (
    <section
      aria-labelledby="about-vision-heading"
      className="bg-canvas px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#191713] px-6 py-12 sm:px-10 lg:px-14">
          <span
            aria-hidden="true"
            className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#E3A867]/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#E3A867]"
              />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E3A867]">
                The Vision
              </p>
            </div>

            <h2
              id="about-vision-heading"
              className="mt-3 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-[#F4EEE4] sm:text-4xl lg:text-5xl"
            >
              Our Vision for <span className="italic text-[#E3A867]">Creators.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CFC6B7]">
              StudioSpace is building a future where great ideas are never
              held back by logistics — where the only ceiling on a creative
              project is the one the creator has.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {commitments.map((commitment) => (
                <li
                  key={commitment}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <span
                    aria-hidden="true"
                    className="block font-serif text-lg leading-snug text-[#F4EEE4]"
                  >
                    {commitment}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
