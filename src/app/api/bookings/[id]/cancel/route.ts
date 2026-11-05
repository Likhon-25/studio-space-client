import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }

  const email = session.user.email.trim().toLowerCase();
  const bookingsResponse = await fetch(
    `${backendUrl}/all-studios/booking/${encodeURIComponent(email)}`,
    { cache: "no-store" }
  );
  if (!bookingsResponse.ok) {
    return NextResponse.json(
      { message: "Booking could not be verified" },
      { status: 500 }
    );
  }

  const bookings = await bookingsResponse.json();
  const ownsBooking = Array.isArray(bookings) && bookings.some(
    (booking) => String(booking._id) === id
  );
  if (!ownsBooking) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const response = await fetch(
    `${backendUrl}/all-studios/booking/${id}/cancel`,
    { method: "PATCH" }
  );

  return NextResponse.json(await response.json(), { status: response.status });
}
