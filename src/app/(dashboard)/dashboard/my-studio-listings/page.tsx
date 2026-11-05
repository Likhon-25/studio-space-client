"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Studio = {
  _id: string;
  title?: string;
  studioName?: string;
  name?: string;
  location?: string;
  city?: string;
};

const MyStudioListings = () => {
  const { data: session, isPending } = authClient.useSession();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user.email;
    if (isPending || !email) return;

    const loadStudios = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-studios/${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      const data = res.ok ? await res.json() : [];
      setStudios(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    loadStudios();
  }, [isPending, session?.user.email]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">My Studio Listings</h2>
      {loading || isPending ? (
        <p className="mt-4">Loading...</p>
      ) : studios.length === 0 ? (
        <p className="mt-4">No studio listings found.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <article
              key={studio._id}
              className="rounded-xl border border-[#D8CFC0] bg-[#FBF8F2] p-4"
            >
              <h3>{studio.title || studio.studioName || studio.name || "Studio"}</h3>
              <p className="mt-1 text-sm text-[#6B6357]">
                {studio.location || studio.city || "Location unavailable"}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStudioListings;