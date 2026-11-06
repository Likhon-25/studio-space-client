"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  Lock,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const amenities = [
  "Natural Light",
  "Blackout Curtains",
  "Cyc Wall",
  "Loading Access",
  "Green Room",
  "Wi-Fi",
  "Parking",
  "Sound System",
  "Lighting Kit",
  "HVAC",
  "Kitchenette",
  "Equipment Rental",
];

const checklist = [
  "A clear, specific title",
  "Accurate hourly rate and deposit",
  "A high-resolution cover image",
  "The amenities creators ask about",
];

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-elevated px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-placeholder focus:border-brand focus:ring-2 focus:ring-brand/15";

const labelClass =
  "mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-body-2";

  const AddNewStudio = () => {
    const {data: session, isPending} = authClient.useSession()
    const user = session?.user;
    const router = useRouter();
    const [publishing, setPublishing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) {
      return;
    }
    if (!user) {
      return;
    }
    if (publishing) return;
    setPublishing(true);

    const formData = new FormData(event.currentTarget);
    const data: Record<string, FormDataEntryValue | FormDataEntryValue[]> =
      Object.fromEntries(
        [...formData.entries()].filter(([name]) => name !== "amenities")
      );
    data.amenities = formData.getAll("amenities").map(String);
    data.hostId = user.id;
    data.hostName = user.name || "";
    data.hostEmail = user.email;
    data.hostImage = user.image || "";
    data.creatorEmail = user.email;
    data.creatorName = user.name || "";
    data.creatorImage = user.image || "";
    data.ownerEmail = user.email.trim().toLowerCase();

    try {
      const result = await fetch("/api/studios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        throw new Error(`Failed to publish studio (${result.status})`);
      }

      await result.json();
      toast.add({
        title: "Studio published",
        description: "Your listing is now live in the roster.",
      });
      router.push("/dashboard/my-studio-listings");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.add({
        title: "Publish failed",
        description: "We could not publish your studio. Please try again.",
        type: "error",
      });
      setPublishing(false);
    }
  }

  return (
    <div className="min-h-svh bg-canvas px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>{" "}
              / New listing
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-5xl">
              Add a new studio.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Share the details of your space and set the stage for your next
              creative collaboration.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-brand" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-body-2">
              Draft listing
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-7 lg:p-8"
          >
            <section>
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-brand">
                  01
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-ink">
                    Studio essentials
                  </h2>
                  <p className="mt-2 text-xs text-faint">
                    The core details creators use to find and compare your
                    space.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="title" className={labelClass}>
                    Studio title
                  </label>
                  <input
                    id="title"
                    name="title"
                    required
                    className={fieldClass}
                    placeholder="e.g. Daylight Cyc Studio"
                  />
                </div>

                <div>
                  <label htmlFor="category" className={labelClass}>
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      required
                      defaultValue=""
                      className={`${fieldClass} appearance-none pr-10`}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-faint" />
                  </div>
                </div>

                <div>
                  <label htmlFor="capacity" className={labelClass}>
                    Max capacity
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    required
                    className={fieldClass}
                    placeholder="12"
                  />
                </div>

                <div>
                  <label htmlFor="rate" className={labelClass}>
                    Hourly rate ($)
                  </label>
                  <input
                    id="rate"
                    name="rate"
                    type="number"
                    min="0"
                    required
                    className={fieldClass}
                    placeholder="85"
                  />
                </div>

                <div>
                  <label htmlFor="deposit" className={labelClass}>
                    Security deposit ($)
                  </label>
                  <input
                    id="deposit"
                    name="deposit"
                    type="number"
                    min="0"
                    required
                    className={fieldClass}
                    placeholder="150"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="location" className={labelClass}>
                    Location / address
                  </label>
                  <input
                    id="location"
                    name="location"
                    required
                    className={fieldClass}
                    placeholder="e.g. 420 Mateo St, Los Angeles, CA"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="image" className={labelClass}>
                    Image URL
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="url"
                    required
                    className={fieldClass}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="mt-2 text-[11px] text-faint">
                    Paste a hosted image URL. A wide, high-resolution shot works
                    best.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 border-t border-line-soft pt-8">
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-brand">
                  02
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-ink">
                    The details
                  </h2>
                  <p className="mt-2 text-xs text-faint">
                    Give creators a feel for the space and what comes with it.
                  </p>
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className={labelClass}>Amenities</legend>
                <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {amenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-line-soft bg-elevated px-3.5 py-3 text-[13px] text-body transition-colors hover:border-line-strong has-[:checked]:border-brand has-[:checked]:bg-brand/5"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity}
                        className="size-4 shrink-0 accent-brand"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5">
                <label htmlFor="overview" className={labelClass}>
                  Detailed overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-line bg-elevated px-3.5 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-placeholder focus:border-brand focus:ring-2 focus:ring-brand/15"
                  placeholder="Describe the light, the floor, the atmosphere, and what makes this space special..."
                />
              </div>
            </section>

            <section className="mt-8 border-t border-line-soft pt-8">
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-brand">
                  03
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-ink">
                    Host details
                  </h2>
                  <p className="mt-2 text-xs text-faint">
                    Your account information is attached to this listing.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-line-soft bg-canvas p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                  <Lock className="size-3" />
                  Read only
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hostName" className={labelClass}>
                      User name
                    </label>
                    <input
                      id="hostName"
                      name="hostName"
                      value={isPending ? "Loading..." : user?.name || ""}
                      readOnly
                      aria-readonly="true"
                      className={`${fieldClass} cursor-not-allowed bg-elevated-muted text-muted focus:border-line focus:ring-0`}
                    />
                  </div>
                  <div>
                    <label htmlFor="hostEmail" className={labelClass}>
                      User email
                    </label>
                    <input
                      id="hostEmail"
                      name="hostEmail"
                      value={isPending ? "Loading..." : user?.email || ""}
                      readOnly
                      aria-readonly="true"
                      className={`${fieldClass} cursor-not-allowed bg-elevated-muted text-muted focus:border-line focus:ring-0`}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-body-2 transition-colors hover:bg-panel/5 hover:text-ink"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={publishing || isPending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
              >
                {publishing ? "Publishing..." : "Publish studio"}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
                Before you publish
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-ink">
                A listing creators trust.
              </h2>

              <ul className="mt-5 space-y-3.5">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[13px] leading-relaxed text-body-2"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-line-soft bg-canvas p-4 text-[11px] leading-relaxed text-muted">
                You can update rates, photos, and availability at any time from
                My Studio Listings.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-panel p-6 text-cream">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,84,43,0.28),transparent_55%)]" />
              <div className="relative">
                <Camera className="size-5 text-gold" strokeWidth={1.6} />
                <h2 className="mt-5 font-serif text-2xl leading-tight">
                  Need a hand?
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-cream-muted">
                  Our host team can help you price the space and present it at
                  its best.
                </p>
                <Link
                  href="/how-it-works"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold transition-colors hover:text-cream"
                >
                  Read the host guide
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudio;
