import Link from "next/link";
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

type Review = {
  _id?: string;
  name?: string;
  author?: string;
  rating?: number | string;
  comment?: string;
  text?: string;
};

type Studio = {
  _id: string;
  title?: string;
  category?: string;
  capacity?: number | string;
  rate?: number | string;
  deposit?: number | string;
  location?: string;
  image?: string;
  amenities?: string[] | string;
  overview?: string;
  rating?: number | string;
  reviewCount?: number | string;
  reviews?: Review[];
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

const StudioDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  let studio: Studio | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/${id}`
    );

    if (response.ok) {
      const data = await response.json();
      studio = data?._id ? data : null;
    }
  } catch {
    studio = null;
  }

  if (!studio) {
    return (
      <div className="min-h-svh bg-[#F4EEE4] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] px-6 py-14 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#D9542B]/10 text-[#D9542B]">
            <Aperture className="size-5" strokeWidth={1.6} />
          </span>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
            404 / Studio
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-none text-[#191713]">
            This space is off the call sheet.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#6B6357]">
            The studio you are looking for may have been removed or the link is
            no longer active.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D9542B] px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F]"
          >
            <ArrowLeft className="size-4" />
            Back to all studios
          </Link>
        </div>
      </div>
    );
  }

  const amenities = amenityList(studio.amenities);
  const reviews = Array.isArray(studio.reviews) ? studio.reviews : [];
  const rating = Number(studio.rating ?? 0);
  const hasReviews = reviews.length > 0 || rating > 0;

  return (
    <div className="min-h-svh bg-[#F4EEE4] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          <Link
            href="/studios"
            className="text-[#8A8173] transition-colors hover:text-[#D9542B]"
          >
            Explore
          </Link>
          <span className="text-[#B9AE9C]">/</span>
          <span className="truncate text-[#5E574C]">
            {studio.category || "Studio"}
          </span>
        </nav>

        <div className="mt-5 flex flex-col gap-5 border-b border-[#D8CFC0] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFC0] bg-[#FBF8F2] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#191713]">
                <span className="size-1.5 rounded-full bg-[#D9542B]" />
                {studio.category || "Creative space"}
              </span>

              {rating > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DACC] bg-[#FBF8F2] px-3 py-1.5 text-[11px] font-medium text-[#191713]">
                  <Star className="size-3.5 fill-[#D9542B] text-[#D9542B]" />
                  {studio.rating}
                  {studio.reviewCount ? (
                    <span className="text-[#8A8173]">
                      ({studio.reviewCount} reviews)
                    </span>
                  ) : null}
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[0.95] tracking-[-0.02em] text-[#191713] sm:text-5xl lg:text-6xl">
              {studio.title?.trim() || "Untitled studio"}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-sm text-[#6B6357]">
              <MapPin
                className="size-4 shrink-0 text-[#D9542B]"
                strokeWidth={1.8}
              />
              {studio.location || "Location shared on request"}
            </p>
          </div>

          <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A8173]">
            Studio / {studio._id.slice(-6)}
          </p>
        </div>

        <div className="relative mt-7 aspect-[4/3] overflow-hidden rounded-2xl border border-[#D8CFC0] bg-[#191713] md:aspect-[16/9]">
          <div className="absolute inset-0 flex items-center justify-center text-[#6B6357]">
            <Aperture className="size-10" strokeWidth={1.4} />
          </div>

          {studio.image && (
            <div
              role="img"
              aria-label={`${studio.title || "Studio"} space`}
              style={{ backgroundImage: `url("${studio.image}")` }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.02]"
            />
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#12100E]/80 via-[#12100E]/20 to-transparent p-4 sm:p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F4EEE4]">
              Studio view
            </p>
            <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#F4EEE4] backdrop-blur-sm">
              01 / 01
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
          <div className="order-2 xl:order-1">
            {studio.overview && (
              <section>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
                  01 / Overview
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-none text-[#191713]">
                  The space.
                </h2>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-[#5E574C]">
                  {studio.overview}
                </p>
              </section>
            )}

            {amenities.length > 0 && (
              <section className="mt-9 border-t border-[#D8CFC0] pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
                  02 / Amenities
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-none text-[#191713]">
                  What is included.
                </h2>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 rounded-xl border border-[#E4DACC] bg-[#FBF8F2] px-3.5 py-3 text-[13px] text-[#3B3731]"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D9542B]/10 text-[#D9542B]">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasReviews && (
              <section className="mt-9 border-t border-[#D8CFC0] pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
                  03 / Reviews
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="font-serif text-3xl leading-none text-[#191713]">
                    Notes from the room.
                  </h2>

                  {rating > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DACC] bg-[#FBF8F2] px-3 py-1.5 text-[11px] font-medium text-[#191713]">
                      <Star className="size-3.5 fill-[#D9542B] text-[#D9542B]" />
                      {studio.rating} / 5
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  {reviews.map((review, index) => (
                    <article
                      key={review._id ?? `${review.name}-${index}`}
                      className="rounded-2xl border border-[#E4DACC] bg-[#FBF8F2] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] font-semibold text-[#191713]">
                          {review.name || review.author || "Studio guest"}
                        </p>
                        {review.rating ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#8A8173]">
                            <Star className="size-3 fill-[#D9542B] text-[#D9542B]" />
                            {review.rating} / 5
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#5E574C]">
                        {review.comment || review.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside
            id="booking"
            className="order-1 xl:sticky xl:top-28 xl:order-2"
          >
            <div className="rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#5E574C]">
                <span className="size-1.5 rounded-full bg-[#D9542B]" />
                Reserve this space
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <p>
                  <span className="font-serif text-4xl leading-none text-[#191713]">
                    {money(studio.rate)}
                  </span>
                  <span className="ml-1.5 text-xs text-[#8A8173]">/ hr</span>
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#8A8173]">
                  Studio rate
                </span>
              </div>

              <div className="mt-5 space-y-3 border-t border-[#E4DACC] pt-4">
                <div className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="flex items-center gap-2 text-[#6B6357]">
                    <ShieldCheck
                      className="size-4 text-[#D9542B]"
                      strokeWidth={1.8}
                    />
                    Security deposit
                  </span>
                  <span className="font-medium text-[#191713]">
                    {money(studio.deposit)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-[13px]">
                  <span className="flex items-center gap-2 text-[#6B6357]">
                    <Users
                      className="size-4 text-[#D9542B]"
                      strokeWidth={1.8}
                    />
                    Maximum capacity
                  </span>
                  <span className="font-medium text-[#191713]">
                    {studio.capacity ? `${studio.capacity} guests` : "On request"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D9542B] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F]"
              >
                <CalendarDays className="size-4" />
                Book Workspace Now
                <ArrowRight className="size-4" />
              </button>

              <p className="mt-3 text-center text-[11px] leading-relaxed text-[#8A8173]">
                No payment is taken today.
              </p>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#E4DACC] bg-[#F4EEE4] p-4 text-[11px] leading-relaxed text-[#6B6357]">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-[#D9542B]"
                strokeWidth={1.8}
              />
              Your reservation is secured with a separate refundable deposit.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default StudioDetails;
