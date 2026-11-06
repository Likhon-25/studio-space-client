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
    className="bg-canvas px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
  >
    <div className="mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-brand" />
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
              Browse the roster / 02
            </p>
          </div>

          <h2
            id="categories-heading"
            className="mt-3 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
          >
            Browse by Studio <span className="italic">Categories.</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Every kind of room for every kind of work — find the space that
            fits your next idea.
          </p>
        </div>

        <Link
          href="/studios"
          className="group inline-flex w-fit items-center gap-2 border-b border-ink/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-brand hover:text-brand"
        >
          View all studios
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/studios?category=${encodeURIComponent(category.name)}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_24px_48px_-30px_rgba(25,23,19,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-panel sm:aspect-[16/10]">
              <div
                aria-hidden="true"
                style={{ backgroundImage: `url("${category.image}")` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 items-center justify-between gap-2 p-3 sm:p-4">
              <div className="min-w-0">
                <p className="font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-brand">
                  {category.note}
                </p>
                <h3 className="mt-1 font-serif text-[15px] leading-tight text-ink sm:text-base">
                  {category.name}
                </h3>
              </div>
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-soft bg-elevated text-ink transition-colors group-hover:border-brand group-hover:bg-brand hover:text-white"
              >
                <ArrowUpRight className="size-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
