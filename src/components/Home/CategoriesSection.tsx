import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    note: "Daylight & cyc walls",
    image:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sound Stages",
    note: "Production-ready floors",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Podcast Rooms",
    note: "Broadcast-grade quiet",
    image:
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Music Suites",
    note: "Write, record, mix",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Art Workshops",
    note: "Make room for making",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
  },
];

const CategoriesSection = () => (
  <section
    id="categories"
    aria-labelledby="categories-heading"
    className="bg-[#F4EEE4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
  >
    <div className="mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-7 border-b border-[#D8CFC0] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-[#D9542B]" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D9542B]">
              Browse the roster / 02
            </p>
          </div>

          <h2
            id="categories-heading"
            className="mt-4 max-w-2xl font-serif text-4xl leading-[0.95] tracking-[-0.02em] text-[#191713] sm:text-5xl lg:text-6xl"
          >
            Browse by Studio <span className="italic">Categories.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6B6357]">
            Every kind of room for every kind of work — find the space that
            fits your next idea.
          </p>
        </div>

        <Link
          href="/studios"
          className="group inline-flex w-fit items-center gap-2 border-b border-[#191713]/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#191713] transition-colors hover:border-[#D9542B] hover:text-[#D9542B]"
        >
          View all studios
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={`/studios?category=${encodeURIComponent(category.name)}`}
            className={`group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[#D8CFC0] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D9542B]/60 hover:shadow-[0_28px_55px_-32px_rgba(25,23,19,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9542B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EEE4] sm:min-h-[340px] sm:p-6 lg:min-h-[400px] ${
              index === categories.length - 1
                ? "sm:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            <div
              aria-hidden="true"
              style={{ backgroundImage: `url("${category.image}")` }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#12100E]/45 via-[#12100E]/10 to-[#12100E]/90"
            />

            <div className="relative z-10 flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F4EEE4]/70">
                  0{index + 1}
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[#F4EEE4] backdrop-blur-md transition-colors group-hover:border-[#D9542B] group-hover:bg-[#D9542B]">
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#E3A867]">
                  {category.note}
                </p>
                <h3 className="mt-2 font-serif text-[1.7rem] leading-[0.95] tracking-[-0.01em] text-[#F4EEE4] transition-colors group-hover:text-[#E3A867] sm:text-[1.85rem]">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
