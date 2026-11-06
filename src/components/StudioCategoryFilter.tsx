import Link from "next/link";
import {
  Camera,
  LayoutGrid,
  Mic,
  Music,
  Palette,
  Speaker,
} from "lucide-react";

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

const filterIcons: Record<string, typeof Camera> = {
  "Photo Studios": Camera,
  "Sound Stages": Speaker,
  "Podcast Rooms": Mic,
  "Music Suites": Music,
  "Art Workshops": Palette,
};

const StudioCategoryFilter = ({
  selectedCategory,
}: {
  selectedCategory?: string;
}) => {
  const active = selectedCategory?.trim().toLowerCase();

  const pills = [
    { name: "All", href: "/studios", icon: LayoutGrid },
    ...studioCategories.map((category) => ({
      name: category.name,
      href: `/studios?category=${encodeURIComponent(category.name)}`,
      icon: filterIcons[category.name] ?? LayoutGrid,
    })),
  ];

  return (
    <div
      role="group"
      aria-label="Filter studios by category"
      className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-2.5"
    >
      {pills.map((pill) => {
        const isActive =
          pill.name === "All" ? !active : active === pill.name.toLowerCase();
        const Icon = pill.icon;

        return (
          <Link
            key={pill.name}
            href={pill.href}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9542B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EEE4] sm:h-10 sm:px-5 ${
              isActive
                ? "border-[#D9542B] bg-[#D9542B] text-[#F4EEE4]"
                : "border-[#D8CFC0] bg-[#FBF8F2] text-[#5E574C] hover:border-[#191713]/60 hover:text-[#191713]"
                // ? "border-[#191713] bg-[#191713] text-[#F4EEE4]"
                // : "border-[#D8CFC0] bg-[#FBF8F2] text-[#5E574C] hover:border-[#D9542B]/60 hover:text-[#191713]"
            }`}
          >
            <Icon
              className={`size-3.5 shrink-0 transition-colors ${
                isActive
                  ? "text-[#191713]"
                  : "text-[#8A8173] group-hover:text-[#D9542B]"
              }`}
            />
            {pill.name}
          </Link>
        );
      })}
    </div>
  );
};

export default StudioCategoryFilter;
