import Link from "next/link";
import { Suspense } from "react";
import { Aperture, ArrowUpRight, MapPin } from "lucide-react";
import StudioCategoryFilter from "@/components/StudioCategoryFilter";

type Studio = {
  _id: string;
  title?: string;
  category?: string;
  location?: string;
  capacity?: number | string;
  rate?: number | string;
  hourlyRate?: number | string;
  deposit?: number | string;
  securityDeposit?: number | string;
  image?: string;
  imageUrl?: string;
  amenities?: string[] | string;
};

const money = (value: number | string | undefined) => {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount)
    ? `$${amount.toLocaleString("en-US")}`
    : "$0";
};

const amenityList = (amenities: Studio["amenities"]) => {
  if (Array.isArray(amenities)) return amenities.filter(Boolean);
  if (typeof amenities === "string") {
    return amenities
      .split(",")
      .map((amenity) => amenity.trim())
      .filter(Boolean);
  }
  return [];
};

const StudioCard = ({ studio }: { studio: Studio }) => {
  const amenities = amenityList(studio.amenities);
  const visibleAmenities = amenities.slice(0, 3);
  const extraAmenities = amenities.length - visibleAmenities.length;
  const image = studio.image || studio.imageUrl;
  const rate = studio.rate ?? studio.hourlyRate;
  const deposit = studio.deposit ?? studio.securityDeposit;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_60px_-38px_rgba(25,23,19,0.55)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-panel">
        <div className="absolute inset-0 flex items-center justify-center text-muted">
          <Aperture className="size-8" strokeWidth={1.4} />
        </div>

        {image && (
          <div
            role="img"
            aria-label={`${studio.title || "Studio"} space`}
            style={{ backgroundImage: `url("${image}")` }}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}

        <span className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 truncate rounded-full border border-white/20 bg-canvas/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
          <span className="size-1.5 shrink-0 rounded-full bg-brand" />
          {studio.category || "Creative space"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-2 font-serif text-[1.6rem] leading-[1.05] tracking-[-0.01em] text-ink">
            {studio.title?.trim() || "Untitled studio"}
          </h2>
          <div className="shrink-0 text-right">
            <p className="font-serif text-2xl leading-none text-ink">
              {money(rate)}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
              per hour
            </p>
          </div>
        </div>

        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-muted">
          <MapPin
            className="mt-0.5 size-3.5 shrink-0 text-brand"
            strokeWidth={1.8}
          />
          <span className="line-clamp-1">
            {studio.location || "Location shared on request"}
          </span>
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleAmenities.length > 0 ? (
            <>
              {visibleAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-line-soft bg-canvas px-2.5 py-1 text-[10px] font-medium text-body-2"
                >
                  {amenity}
                </span>
              ))}
              {extraAmenities > 0 && (
                <span className="rounded-full border border-brand/20 bg-brand/5 px-2.5 py-1 text-[10px] font-medium text-brand">
                  +{extraAmenities}
                </span>
              )}
            </>
          ) : (
            <span className="text-[11px] text-faint">
              Amenities on request
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-3 border-t border-line-soft pt-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                Security deposit
              </p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {money(deposit)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                Capacity
              </p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {studio.capacity ? `Up to ${studio.capacity} guests` : "On request"}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/studios/${studio._id}`}
          className="mt-4 flex items-center justify-between rounded-full border border-line-soft py-1.5 pr-1.5 pl-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-brand hover:text-brand"
        >
          View details
          <span className="flex size-7 items-center justify-center rounded-full bg-elevated transition-colors group-hover:bg-brand group-hover:text-[#FBF8F2]">
            <ArrowUpRight className="size-3.5" />
          </span>
        </Link>
      </div>
    </article>
  );
};

const StudioSkeletons = () => (
  <div
    role="status"
    className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
  >
    <span className="sr-only">Loading studios</span>
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-2xl border border-line bg-surface"
      >
        <div className="aspect-[4/3] animate-pulse bg-skeleton" />
        <div className="space-y-3 p-5 sm:p-6">
          <div className="h-5 w-3/4 animate-pulse rounded bg-skeleton" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-skeleton" />
          <div className="h-7 w-full animate-pulse rounded bg-skeleton" />
          <div className="h-10 w-full animate-pulse rounded-full bg-skeleton" />
        </div>
      </div>
    ))}
  </div>
);

const StudiosEmpty = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
      <Aperture className="size-5" strokeWidth={1.6} />
    </span>
    <h2 className="mt-5 font-serif text-3xl text-ink">{title}</h2>
    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
      {message}
    </p>
    <Link
      href="/dashboard/add-new-studio"
      className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-brand-strong"
    >
      List your studio
    </Link>
  </div>
);

const AllStudios = async ({ selectedCategory }: { selectedCategory?: string }) => {
  let studiosData: Studio[] = [];
  let failed = false;

  try {
    const studios = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios`,
      { cache: "no-store" }
    );

    if (studios.ok) {
      const data = await studios.json();
      studiosData = Array.isArray(data) ? data : [];
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <StudiosEmpty
        title="The roster is taking a moment."
        message="We could not load the studios right now. Please refresh the page in a little while."
      />
    );
  }

  if (studiosData.length === 0) {
    return (
      <StudiosEmpty
        title="No studios on the roster yet."
        message="New spaces are added all the time. Be the first to open your doors to the community."
      />
    );
  }

  if (selectedCategory) {
    studiosData = studiosData.filter(
      (studio) => studio.category?.trim().toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedCategory && studiosData.length === 0) {
    return (
      <StudiosEmpty
        title={`No ${selectedCategory} listings yet.`}
        message="Try another category or browse all available creative spaces."
      />
    );
  }

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {studiosData.map((studio: Studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
};

const StudiosPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) => {
  const params = await searchParams;
  const selectedCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  return (
    <div className="min-h-svh bg-canvas px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
            Explore / Studios
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-6xl">
            Find your next room.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Photo studios, sound stages, podcast lounges, and more — reserved by
            the hour and built for the work.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-brand" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-body-2">
            Now booking
          </span>
        </div>
      </div>

      <StudioCategoryFilter selectedCategory={selectedCategory} />

      <Suspense fallback={<StudioSkeletons />}>
        <AllStudios selectedCategory={selectedCategory} />
      </Suspense>
    </div>
    </div>
  );
};

export default StudiosPage;
