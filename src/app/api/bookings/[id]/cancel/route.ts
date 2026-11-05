import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAuthToken } from "@/lib/auth-token";

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

  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ message: "Authentication token could not be created" }, { status: 401 });
  }
  const response = await fetch(
    `${backendUrl}/all-studios/booking/${id}/cancel`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return NextResponse.json(await response.json(), { status: response.status });
}
