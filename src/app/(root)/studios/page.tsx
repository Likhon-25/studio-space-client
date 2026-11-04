import Link from "next/link";
import { Suspense } from "react";
import { Aperture, ArrowUpRight, MapPin } from "lucide-react";

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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B8A5] hover:shadow-[0_30px_60px_-38px_rgba(25,23,19,0.55)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#191713]">
        <div className="absolute inset-0 flex items-center justify-center text-[#6B6357]">
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

        <span className="absolute top-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 truncate rounded-full border border-white/20 bg-[#F4EEE4]/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#191713] backdrop-blur-sm">
          <span className="size-1.5 shrink-0 rounded-full bg-[#D9542B]" />
          {studio.category || "Creative space"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="line-clamp-2 font-serif text-[1.6rem] leading-[1.05] tracking-[-0.01em] text-[#191713]">
            {studio.title?.trim() || "Untitled studio"}
          </h2>
          <div className="shrink-0 text-right">
            <p className="font-serif text-2xl leading-none text-[#191713]">
              {money(rate)}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#8A8173]">
              per hour
            </p>
          </div>
        </div>

        <p className="mt-2.5 flex items-start gap-1.5 text-xs text-[#6B6357]">
          <MapPin
            className="mt-0.5 size-3.5 shrink-0 text-[#D9542B]"
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
                  className="rounded-full border border-[#E4DACC] bg-[#F4EEE4] px-2.5 py-1 text-[10px] font-medium text-[#5E574C]"
                >
                  {amenity}
                </span>
              ))}
              {extraAmenities > 0 && (
                <span className="rounded-full border border-[#D9542B]/20 bg-[#D9542B]/5 px-2.5 py-1 text-[10px] font-medium text-[#D9542B]">
                  +{extraAmenities}
                </span>
              )}
            </>
          ) : (
            <span className="text-[11px] text-[#8A8173]">
              Amenities on request
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-3 border-t border-[#E4DACC] pt-4">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8A8173]">
                Security deposit
              </p>
              <p className="mt-1 text-[13px] font-medium text-[#191713]">
                {money(deposit)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8A8173]">
                Capacity
              </p>
              <p className="mt-1 text-[13px] font-medium text-[#191713]">
                {studio.capacity ? `Up to ${studio.capacity} guests` : "On request"}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/studios/${studio._id}`}
          className="mt-4 flex items-center justify-between rounded-full border border-[#E4DACC] py-1.5 pr-1.5 pl-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#191713] transition-colors hover:border-[#D9542B] hover:text-[#D9542B]"
        >
          View details
          <span className="flex size-7 items-center justify-center rounded-full bg-[#F4EEE4] transition-colors group-hover:bg-[#D9542B] group-hover:text-[#FBF8F2]">
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
        className="overflow-hidden rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2]"
      >
        <div className="aspect-[4/3] animate-pulse bg-[#E7DDCE]" />
        <div className="space-y-3 p-5 sm:p-6">
          <div className="h-5 w-3/4 animate-pulse rounded bg-[#E7DDCE]" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-[#E7DDCE]" />
          <div className="h-7 w-full animate-pulse rounded bg-[#E7DDCE]" />
          <div className="h-10 w-full animate-pulse rounded-full bg-[#E7DDCE]" />
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
  <div className="mt-8 rounded-2xl border border-dashed border-[#C8BCA8] bg-[#FBF8F2] px-6 py-16 text-center">
    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#D9542B]/10 text-[#D9542B]">
      <Aperture className="size-5" strokeWidth={1.6} />
    </span>
    <h2 className="mt-5 font-serif text-3xl text-[#191713]">{title}</h2>
    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#6B6357]">
      {message}
    </p>
    <Link
      href="/dashboard/add-new-studio"
      className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#D9542B] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F]"
    >
      List your studio
    </Link>
  </div>
);

const AllStudios = async () => {
  let studiosData: Studio[] = [];
  let failed = false;

  try {
    const studios = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios`
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

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {studiosData.map((studio: Studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
};

const StudiosPage = () => (
  <div className="min-h-svh bg-[#F4EEE4] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-[1280px]">
      <div className="flex flex-col gap-6 border-b border-[#D8CFC0] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D9542B]">
            Explore / Studios
          </p>
          <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#191713] sm:text-6xl">
            Find your next room.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6B6357]">
            Photo studios, sound stages, podcast lounges, and more — reserved by
            the hour and built for the work.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-[#D8CFC0] bg-[#FBF8F2] px-3 py-1.5">
          <span className="size-1.5 rounded-full bg-[#D9542B]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5E574C]">
            Now booking
          </span>
        </div>
      </div>

      <Suspense fallback={<StudioSkeletons />}>
        <AllStudios />
      </Suspense>
    </div>
  </div>
);

export default StudiosPage;
