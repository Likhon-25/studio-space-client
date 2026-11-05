import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";

export const studioCategories = [
  {
    name: "Photo Studios",
    note: "Daylight & cyc walls",
    image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sound Stages",
    note: "Production-ready floors",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Podcast Rooms",
    note: "Broadcast-grade quiet",
    image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Music Suites",
    note: "Write, record, mix",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Art Workshops",
    note: "Make room for making",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
  },
];

const StudioCategoryFilter = ({ selectedCategory }: { selectedCategory?: string }) => (
  <div className="mt-8">
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#D9542B]">
          Browse by category
        </p>
        <h2 className="mt-1 font-serif text-2xl text-[#191713]">
          Find the right kind of room.
        </h2>
      </div>
      {selectedCategory && (
        <Link
          href="/studios"
          className="shrink-0 rounded-full border border-[#D8CFC0] bg-[#FBF8F2] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#191713] transition-colors hover:border-[#D9542B] hover:text-[#D9542B]"
        >
          Show all
        </Link>
      )}
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {studioCategories.map((category, index) => {
        const active =
          selectedCategory?.trim().toLowerCase() === category.name.toLowerCase();
        return (
          <Link
            key={category.name}
            href={`/studios?category=${encodeURIComponent(category.name)}`}
            aria-current={active ? "true" : undefined}
            className={`group relative min-h-40 overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9542B] sm:min-h-48 ${
              active
                ? "border-[#D9542B] ring-2 ring-[#D9542B]/20"
                : "border-[#D8CFC0] hover:border-[#D9542B]/60"
            }`}
          >
            <div
              aria-hidden="true"
              style={{ backgroundImage: `url("${category.image}")` }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/35 via-[#12100E]/20 to-[#12100E]/90" />
            <div className="relative z-10 flex h-full min-h-32 flex-col justify-between sm:min-h-40">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#F4EEE4]/75">
                  0{index + 1}
                </span>
                <span className={`flex size-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
                  active
                    ? "border-[#D9542B] bg-[#D9542B] text-white"
                    : "border-white/25 bg-white/10 text-white group-hover:border-[#D9542B] group-hover:bg-[#D9542B]"
                }`}>
                  {active ? <Aperture className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
                </span>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#E3A867]">
                  {category.note}
                </p>
                <h3 className="mt-1 font-serif text-lg leading-tight text-[#F4EEE4]">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default StudioCategoryFilter;
