import Link from "next/link";
import { Aperture, ArrowUpRight, MapPin, Star } from "lucide-react";

type Studio = {
  _id?: string;
  id?: string;
  title?: string;
  category?: string;
  location?: string;
  rate?: number | string;
  hourlyRate?: number | string;
  image?: string;
  imageUrl?: string;
  rating?: number | string;
  createdAt?: string;
};

const money = (value: number | string | undefined) => {
  const amount = Number(value ?? 0);
  return Number.isFinite(amount)
    ? `$${amount.toLocaleString("en-US")}`
    : "$0";
};

const FeaturedStudios = async () => {
  let studios: Studio[] = [];

  try {
    const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    if (backendUrl) {
      const response = await fetch(
        `${backendUrl}/all-studios?limit=6&sort=rating`,
        { cache: "no-store" }
      );

      if (response.ok) {
        const data = await response.json();
        studios = Array.isArray(data) ? data : [];
      }
    }
  } catch {
    studios = [];
  }

  studios = [...studios]
    .sort((a, b) => {
      const ratingDifference = Number(b.rating ?? 0) - Number(a.rating ?? 0);
      if (ratingDifference !== 0) return ratingDifference;

      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    })
    .slice(0, 6);

  return (
    <section
      id="featured-studios"
      aria-labelledby="featured-studios-heading"
      className="bg-canvas px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-brand" />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
                Editor&apos;s shortlist / 03
              </p>
            </div>
            <h2
              id="featured-studios-heading"
              className="mt-3 max-w-2xl font-serif text-3xl leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl"
            >
              Featured <span className="italic">Studios.</span>
            </h2>
          </div>

          <Link
            href="/studios"
            className="group inline-flex w-fit items-center gap-2 border-b border-ink/30 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-brand hover:text-brand"
          >
            View all studios
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {studios.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => {
              const studioId = studio._id || studio.id;
              const image = studio.image || studio.imageUrl;
              const rate = studio.rate ?? studio.hourlyRate;
              const rating = Number(studio.rating ?? 0);

              return (
                <article
                  key={studioId || `${studio.title}-${studio.location}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_60px_-38px_rgba(25,23,19,0.55)]"
                >
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

                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-canvas/95 px-2.5 py-1.5 text-[11px] font-semibold text-ink backdrop-blur-sm">
                      <Star className="size-3.5 fill-brand text-brand" />
                      {rating > 0 ? rating.toFixed(1) : "New"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="line-clamp-2 font-serif text-[1.45rem] leading-[1.05] tracking-[-0.01em] text-ink sm:text-[1.6rem]">
                        {studio.title?.trim() || "Untitled studio"}
                      </h3>
                      <div className="shrink-0 text-right">
                        <p className="font-serif text-2xl leading-none text-ink">
                          {money(rate)}
                        </p>
                        <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-faint">
                          / hr
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 flex items-start gap-1.5 text-xs text-muted">
                      <MapPin
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={1.8}
                      />
                      <span className="line-clamp-1">
                        {studio.location || "Location shared on request"}
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studioId || ""}`}
                      className="mt-auto pt-5"
                      aria-label={`View details for ${studio.title || "this studio"}`}
                    >
                      <span className="flex items-center justify-between rounded-full border border-line-soft py-1.5 pr-1.5 pl-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-brand hover:text-brand">
                        View Details
                        <span className="flex size-7 items-center justify-center rounded-full bg-elevated transition-colors group-hover:bg-brand group-hover:text-[#FBF8F2]">
                          <ArrowUpRight className="size-3.5" />
                        </span>
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
            <p className="font-serif text-2xl text-ink">
              Featured studios are coming soon.
            </p>
            <Link
              href="/studios"
              className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand"
            >
              Browse all studios <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStudios;
