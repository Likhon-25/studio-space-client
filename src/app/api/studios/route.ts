import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAuthToken } from "@/lib/auth-token";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const email = session.user.email.trim().toLowerCase();
  const studioData = {
    ...body,
    hostId: session.user.id,
    hostName: session.user.name || "",
    hostEmail: email,
    hostImage: session.user.image || "",
    creatorId: session.user.id,
    creatorEmail: email,
    creatorName: session.user.name || "",
    creatorImage: session.user.image || "",
    ownerEmail: email,
  };

  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { message: "Server configuration error" },
      { status: 500 }
    );
  }
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json(
      { message: "Authentication token could not be created" },
      { status: 401 }
    );
  }

  const response = await fetch(`${backendUrl}/all-studios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studioData),
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
  });
}
