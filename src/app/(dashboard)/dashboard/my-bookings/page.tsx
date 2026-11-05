"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, ArrowUpRight, MapPin } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  bookingDate?: string;
  studioId?: string;
  startTime?: string;
  endTime?: string;
};

const MyBookingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user.email?.trim().toLowerCase();
    if (isPending) return;
    if (!email) return;

    const loadBookings = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/booking/${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      const data = res.ok ? await res.json() : [];
      setBookings(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    loadBookings();
  }, [isPending, session?.user.email]);

  return (
    <div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
          Dashboard / Reservations
        </p>
        <h1 className="mt-2 font-serif text-3xl text-[#191713] sm:text-4xl">
          My Bookings
        </h1>
      </div>

      {loading || isPending ? (
        <div className="mt-6 space-y-3">
          {[0, 1].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-4">
              <div className="h-4 w-1/3 rounded bg-[#E7DDCE]" />
              <div className="mt-3 h-3 w-1/2 rounded bg-[#E7DDCE]" />
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#C8BCA8] bg-[#FBF8F2] px-6 py-14 text-center">
          <CalendarDays className="mx-auto size-9 text-[#D9542B]" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl text-[#191713]">No bookings yet</h2>
          <p className="mt-2 text-sm text-[#6B6357]">Find a studio and reserve your session.</p>
          <Link href="/studios" className="mt-5 inline-flex h-10 items-center rounded-full bg-[#D9542B] px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Browse studios
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => (
            <article key={booking._id} className="flex flex-col gap-4 rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-4 transition-all hover:border-[#C4B8A5] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#191713] text-[#E3A867]">
                  <CalendarDays className="size-5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <span className="rounded-full bg-[#D9542B]/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#D9542B]">
                    Booking
                  </span>
                  <p className="mt-2 truncate text-[13px] font-semibold text-[#191713]">
                    Studio reservation
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-[#6B6357]">
                    <MapPin className="size-3" />
                    ID {booking.studioId?.slice(-8) || booking._id.slice(-8)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:min-w-[330px] sm:grid-cols-[1fr_1fr_auto]">
                <div className="rounded-xl bg-[#F4EEE4] px-3 py-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#8A8173]">Date</p>
                  <p className="mt-1 text-[12px] font-semibold text-[#191713]">{booking.bookingDate || "Not set"}</p>
                </div>
                <div className="rounded-xl bg-[#F4EEE4] px-3 py-2">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#8A8173]">Time</p>
                  <p className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-[#191713]">
                    <Clock3 className="size-3 text-[#D9542B]" />
                    {booking.startTime || "—"}–{booking.endTime || "—"}
                  </p>
                </div>
                <Link href={booking.studioId ? `/studios/${booking.studioId}` : "/studios"} className="col-span-2 flex h-10 items-center justify-center gap-1 rounded-full border border-[#E4DACC] px-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#191713] hover:border-[#D9542B] hover:text-[#D9542B] sm:col-span-1">
                  View
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
