import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthToken(): Promise<string | null> {
  try {
    const result = await auth.api.getToken({
      headers: await headers(),
    });
    return result?.token || null;
  } catch (error) {
    console.error("Authentication token generation failed:", error);
    return null;
  }
}
