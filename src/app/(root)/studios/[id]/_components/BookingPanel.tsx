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
      <div className="rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#5E574C]">
          <span className="size-1.5 rounded-full bg-[#D9542B]" />
          Reserve this space
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <p>
            <span className="font-serif text-4xl leading-none text-[#191713]">
              {formattedRate}
            </span>
            <span className="ml-1 text-xs text-[#8A8173]">/ hour</span>
          </p>
          <p className="text-right text-[11px] leading-relaxed text-[#8A8173]">
            {Number(deposit) > 0 ? `$${Number(deposit).toLocaleString("en-US")} deposit` : "No deposit"}
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-[#E4DACC] bg-[#F4EEE4] px-3.5 py-3">
          <div className="flex items-center gap-2 text-[13px] text-[#191713]">
            <CalendarDays className="size-4 text-[#D9542B]" />
            <span className="font-medium text-[#191713]">
              {capacity ? `${capacity} guests` : "On request"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
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
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-[#D8CFC0] bg-[#FBF8F2] text-[#5E574C] shadow-sm"
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
