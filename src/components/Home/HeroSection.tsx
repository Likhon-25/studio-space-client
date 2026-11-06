"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const slides = [
  {
    eyebrow: "Photo Studio · Arts District, LA",
    title: "Chase the light.",
    accent: "Book the room.",
    description:
      "Sun-drenched cyc walls, seamless backdrops, and a production-ready floor — reserved by the hour, built for the shot.",
    studio: "Daylight Cyc Studio",
    location: "Arts District, Los Angeles",
    rate: "$85",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Sound Stage · Greenpoint, NYC",
    title: "Big stories need",
    accent: "a bigger stage.",
    description:
      "Acoustically treated stages with cinema-ready rigs and room for the whole crew. Your next scene starts here.",
    studio: "Stage 09 — Greenpoint",
    location: "Greenpoint, Brooklyn",
    rate: "$140",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Podcast Suite · Soho, London",
    title: "A quiet room for",
    accent: "loud ideas.",
    description:
      "Broadcast-grade mics, warm acoustics, and a room that disappears the moment the record button turns red.",
    studio: "The Quiet Room",
    location: "Soho, London",
    rate: "$60",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1920&q=80",
  },
];

const ctaBase =
  "inline-flex h-12 items-center justify-center rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors";

const HeroSection = () => {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const goToSlide = (index: number) => setActive(index);
  const nextSlide = () =>
    setActive((current) => (current + 1) % slides.length);
  const previousSlide = () =>
    setActive((current) => (current - 1 + slides.length) % slides.length);

  return (
    <section
      aria-label="Featured studio spaces"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-[#12100E]"
    >
      {slides.map((item, index) => (
        <div
          key={item.image}
          aria-hidden="true"
          style={{ backgroundImage: `url("${item.image}")` }}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
            active === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#12100E] via-[#12100E]/85 to-[#12100E]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-[#12100E]/30" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1280px] flex-col px-4 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:px-8">
        <div className="flex flex-1 items-end py-16 lg:py-20">
          <div className="flex w-full items-end justify-between gap-12">
            <div
              key={active}
              aria-live="polite"
              className="max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#E3A867]">
                <span className="h-px w-8 bg-[#D9542B]" />
                {slide.eyebrow}
              </div>

              <h1 className="font-serif text-[clamp(2.85rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-[#F4EEE4]">
                {slide.title}{" "}
                <em className="text-[#E3A867]">{slide.accent}</em>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#CFC6B7] sm:text-[15px]">
                {slide.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/studios"
                  className={`${ctaBase} bg-[#D9542B] text-[#FBF8F2] hover:bg-[#E3A867] hover:text-[#191713]`}
                >
                  Explore Studios
                </Link>
                <Link
                  href="/dashboard/add-new-studio"
                  className={`${ctaBase} border border-white/30 text-[#F4EEE4] hover:border-[#F4EEE4] hover:bg-[#F4EEE4] hover:text-[#191713]`}
                >
                  Host Your Space
                </Link>
              </div>
            </div>

            <aside
              key={`card-${active}`}
              className="hidden w-64 shrink-0 animate-in fade-in duration-700 xl:block"
            >
              <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-md">
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#E3A867]">
                  Featured space
                </p>
                <h2 className="mt-3 font-serif text-2xl leading-tight text-[#F4EEE4]">
                  {slide.studio}
                </h2>
                <p className="mt-1 text-xs text-[#CFC6B7]">{slide.location}</p>

                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                  <p className="text-[#F4EEE4]">
                    <span className="font-serif text-xl">{slide.rate}</span>
                    <span className="ml-1 text-xs text-[#CFC6B7]">/ hr</span>
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[#E3A867]">
                    <Star className="size-3.5 fill-current" />
                    {slide.rating}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/15 py-5">
          <div className="flex items-center gap-5">
            {slides.map((item, index) => (
              <button
                key={item.studio}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
                className="group flex items-center gap-2.5"
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                    active === index
                      ? "text-[#E3A867]"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`h-px transition-all duration-300 ${
                    active === index
                      ? "w-10 bg-[#D9542B]"
                      : "w-5 bg-white/25 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:block">
              Explore the spaces
            </span>
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/25 text-[#F4EEE4] transition-colors hover:border-[#F4EEE4] hover:bg-[#F4EEE4] hover:text-[#191713]"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-white/25 text-[#F4EEE4] transition-colors hover:border-[#F4EEE4] hover:bg-[#F4EEE4] hover:text-[#191713]"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
