"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import BookingForm from "./BookingForm";

type BookingPanelProps = {
  studioId: string;
  rate: number | string;
  deposit: number | string;
  capacity: number | string;
};

const BookingPanel = ({
  studioId,
  rate,
  deposit,
  capacity,
}: BookingPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const amount = Number(rate ?? 0);
  const formattedRate = Number.isFinite(amount)
    ? `$${amount.toLocaleString("en-US")}`
    : "$0";

  return (
    <>
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-body-2">
          <span className="size-1.5 rounded-full bg-brand" />
          Reserve this space
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p>
            <span className="font-serif text-4xl leading-none text-ink">
              {formattedRate}
            </span>
            <span className="ml-1 text-xs text-faint">/ hour</span>
          </p>
          <p className="text-right text-[11px] leading-relaxed text-faint">
            {Number(deposit) > 0 ? `$${Number(deposit).toLocaleString("en-US")} deposit` : "No deposit"}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-line-soft bg-elevated px-3.5 py-3">
          <div className="flex items-center gap-2 text-[13px] text-ink">
            <CalendarDays className="size-4 text-brand" />
            <span className="font-medium text-ink">
              {capacity ? `${capacity} guests` : "On request"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-brand-strong"
        >
          <CalendarDays className="size-4" />
          Book Workspace Now
          <ArrowRight className="size-4" />
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-faint">
          No payment is taken today.
        </p>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#191713]/55 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Booking form"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close booking form"
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-line bg-surface text-body-2 shadow-sm"
            >
              <X className="size-4" />
            </button>
            <BookingForm studioId={studioId} rate={rate} deposit={deposit} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingPanel;
