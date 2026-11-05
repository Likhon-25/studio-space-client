import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
}

async function getStudio(backendUrl: string, id: string) {
  const response = await fetch(`${backendUrl}/all-studios/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const studio = await getStudio(backendUrl || "", id);
  const ownerEmail =
    studio?.ownerEmail || studio?.creatorEmail || studio?.hostEmail;

  if (!studio || ownerEmail?.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const response = await fetch(`${backendUrl}/all-studios/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await response.json(), { status: response.status });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const studio = await getStudio(backendUrl || "", id);
  const ownerEmail =
    studio?.ownerEmail || studio?.creatorEmail || studio?.hostEmail;

  if (!studio || ownerEmail?.trim().toLowerCase() !== user.email.trim().toLowerCase()) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const response = await fetch(`${backendUrl}/all-studios/${id}`, {
    method: "DELETE",
  });

  return NextResponse.json(await response.json(), { status: response.status });
}
