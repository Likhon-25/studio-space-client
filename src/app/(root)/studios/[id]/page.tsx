import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookingPanel from "./_components/BookingPanel";
import { auth } from "@/lib/auth";
import {
  Aperture,
  ArrowLeft,
  Check,
  MapPin,
  ShieldCheck,
  Star,
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/studios/${id}`)}`);
  }

  let studio: Studio | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/${id}`,
      { cache: "no-store" }
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
      <div className="min-h-svh bg-canvas px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-line bg-surface px-6 py-14 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Aperture className="size-5" strokeWidth={1.6} />
          </span>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
            404 / Studio
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-none text-ink">
            This space is off the call sheet.
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
            The studio you are looking for may have been removed or the link is
            no longer active.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-brand-strong"
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
    <div className="min-h-svh bg-canvas px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          <Link
            href="/studios"
            className="text-faint transition-colors hover:text-brand"
          >
            Explore
          </Link>
          <span className="text-whisper">/</span>
          <span className="truncate text-body-2">
            {studio.category || "Studio"}
          </span>
        </nav>

        <div className="mt-5 flex flex-col gap-5 border-b border-line pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                <span className="size-1.5 rounded-full bg-brand" />
                {studio.category || "Creative space"}
              </span>

              {rating > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-surface px-3 py-1.5 text-[11px] font-medium text-ink">
                  <Star className="size-3.5 fill-brand text-brand" />
                  {studio.rating}
                  {studio.reviewCount ? (
                    <span className="text-faint">
                      ({studio.reviewCount} reviews)
                    </span>
                  ) : null}
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {studio.title?.trim() || "Untitled studio"}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin
                className="size-4 shrink-0 text-brand"
                strokeWidth={1.8}
              />
              {studio.location || "Location shared on request"}
            </p>
          </div>

          <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
            Studio / {studio._id.slice(-6)}
          </p>
        </div>

        <div className="relative mt-7 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-panel md:aspect-[16/9]">
          <div className="absolute inset-0 flex items-center justify-center text-muted">
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
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
                  01 / Overview
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-none text-ink">
                  The space.
                </h2>
                <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-body-2">
                  {studio.overview}
                </p>
              </section>
            )}

            {amenities.length > 0 && (
              <section className="mt-9 border-t border-line pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
                  02 / Amenities
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-none text-ink">
                  What is included.
                </h2>

                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 rounded-xl border border-line-soft bg-surface px-3.5 py-3 text-[13px] text-body"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {hasReviews && (
              <section className="mt-9 border-t border-line pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
                  03 / Reviews
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="font-serif text-3xl leading-none text-ink">
                    Notes from the room.
                  </h2>

                  {rating > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-soft bg-surface px-3 py-1.5 text-[11px] font-medium text-ink">
                      <Star className="size-3.5 fill-brand text-brand" />
                      {studio.rating} / 5
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  {reviews.map((review, index) => (
                    <article
                      key={review._id ?? `${review.name}-${index}`}
                      className="rounded-2xl border border-line-soft bg-surface p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] font-semibold text-ink">
                          {review.name || review.author || "Studio guest"}
                        </p>
                        {review.rating ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-faint">
                            <Star className="size-3 fill-brand text-brand" />
                            {review.rating} / 5
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-body-2">
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
            <BookingPanel
              studioId={studio._id}
              rate={studio.rate ?? 0}
              deposit={studio.deposit ?? 0}
              capacity={studio.capacity ?? 0}
            />

            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line-soft bg-canvas p-4 text-[11px] leading-relaxed text-muted">
              <ShieldCheck
                className="mt-0.5 size-4 shrink-0 text-brand"
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
