import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAuthToken } from "@/lib/auth-token";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const token = await getAuthToken();
  if (!backendUrl || !token) {
    return NextResponse.json({ message: "Authentication unavailable" }, { status: 401 });
  }

  const email = encodeURIComponent(session.user.email.trim().toLowerCase());
  const [bookingsResponse, studiosResponse] = await Promise.all([
    fetch(`${backendUrl}/all-studios/booking/${email}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${backendUrl}/all-studios`, { cache: "no-store" }),
  ]);

  if (!bookingsResponse.ok) {
    const text = await bookingsResponse.text();
    return new NextResponse(text, { status: bookingsResponse.status });
  }

  const bookings = await bookingsResponse.json();
  const studios = studiosResponse.ok ? await studiosResponse.json() : [];
  return NextResponse.json({ bookings, studios });
}
