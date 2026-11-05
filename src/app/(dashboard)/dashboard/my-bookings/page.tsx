"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Booking = {
  _id: string;
  bookingDate?: string;
  studioId?: string;
};

const MyBookingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user.email;
    if (isPending || !email) return;

    const loadBookings = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${encodeURIComponent(email)}`,
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
      <h2 className="text-2xl font-semibold">My Bookings</h2>
      {loading || isPending ? (
        <p className="mt-4">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="mt-4">No bookings found.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="rounded-xl border border-[#D8CFC0] bg-[#FBF8F2] p-4"
            >
              <p>Studio ID: {booking.studioId || "Unavailable"}</p>
              <p className="mt-1 text-sm text-[#6B6357]">
                Booking date: {booking.bookingDate || "Unavailable"}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;