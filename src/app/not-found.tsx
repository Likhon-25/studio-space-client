import Link from "next/link";
import type { Metadata } from "next";
import { Aperture, ArrowLeft, Film } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

const NotFound = () => {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section
        aria-labelledby="not-found-heading"
        className="w-full max-w-xl rounded-2xl border border-line bg-surface p-5 shadow-[0_30px_80px_-50px_rgba(25,23,19,0.55)] sm:p-7"
      >
        <div
          aria-hidden="true"
          className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-[#191713] sm:h-44"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,84,43,0.16),transparent_50%)]" />

          <div className="absolute top-0 left-0 right-0 flex items-center gap-2 border-b border-white/10 bg-[#F4EEE4] px-3 py-1.5">
            <Film className="size-3 shrink-0 text-[#D9542B]" />
            <p className="truncate font-mono text-[8px] uppercase tracking-[0.18em] text-[#191713]">
              Slate 404 · Scene 01 · Take 01
            </p>
          </div>

          <div className="relative flex flex-col items-center gap-2">
            <span className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#D9542B]/15 text-[#E3A867]">
              <Aperture className="size-6" strokeWidth={1.6} />
            </span>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#B9AE9C]">
              The set is empty.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center sm:mt-7">
          <p
            aria-hidden="true"
            className="font-serif text-5xl leading-none tracking-[0.08em] text-[#191713]/20 sm:text-6xl"
          >
            4 0 4
          </p>

          <h1
            id="not-found-heading"
            className="mt-3 font-serif text-2xl leading-tight tracking-[-0.01em] text-ink sm:text-3xl"
          >
            Oops! This page doesn&apos;t exist.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            The page you&apos;re looking for may have been moved or no longer
            exists.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <ArrowLeft className="size-4" />
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
