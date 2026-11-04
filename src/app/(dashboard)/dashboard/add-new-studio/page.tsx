"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  Lock,
} from "lucide-react";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
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
  "h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#F8F3EA] px-3.5 text-sm text-[#191713] outline-none transition-colors placeholder:text-[#9A9080] focus:border-[#D9542B] focus:ring-2 focus:ring-[#D9542B]/15";

const labelClass =
  "mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#5E574C]";
  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const studios = await result.json();
    console.log(studios);
  }
const AddNewStudio = () => {
  return (
    <div className="min-h-svh bg-[#F4EEE4] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D9542B]">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>{" "}
              / New listing
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-none tracking-[-0.02em] text-[#191713] sm:text-5xl">
              Add a new studio.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6B6357]">
              Share the details of your space and set the stage for your next
              creative collaboration.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-[#D8CFC0] bg-[#FBF8F2] px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-[#D9542B]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5E574C]">
              Draft listing
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-5 shadow-sm sm:p-7 lg:p-8"
          >
            <section>
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#D9542B]">
                  01
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-[#191713]">
                    Studio essentials
                  </h2>
                  <p className="mt-2 text-xs text-[#8A8173]">
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
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#8A8173]" />
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
                  <p className="mt-2 text-[11px] text-[#8A8173]">
                    Paste a hosted image URL. A wide, high-resolution shot works
                    best.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 border-t border-[#E4DACC] pt-8">
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#D9542B]">
                  02
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-[#191713]">
                    The details
                  </h2>
                  <p className="mt-2 text-xs text-[#8A8173]">
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
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#E4DACC] bg-[#F8F3EA] px-3.5 py-3 text-[13px] text-[#3B3731] transition-colors hover:border-[#C8BCA8] has-[:checked]:border-[#D9542B] has-[:checked]:bg-[#D9542B]/5"
                    >
                      <input
                        type="checkbox"
                        name="amenities"
                        value={amenity}
                        className="size-4 shrink-0 accent-[#D9542B]"
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
                  className="w-full resize-none rounded-xl border border-[#D8CFC0] bg-[#F8F3EA] px-3.5 py-3 text-sm leading-relaxed text-[#191713] outline-none transition-colors placeholder:text-[#9A9080] focus:border-[#D9542B] focus:ring-2 focus:ring-[#D9542B]/15"
                  placeholder="Describe the light, the floor, the atmosphere, and what makes this space special..."
                />
              </div>
            </section>

            <section className="mt-8 border-t border-[#E4DACC] pt-8">
              <div className="flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#D9542B]">
                  03
                </span>
                <div>
                  <h2 className="font-serif text-2xl leading-none text-[#191713]">
                    Host details
                  </h2>
                  <p className="mt-2 text-xs text-[#8A8173]">
                    Your account information is attached to this listing.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E4DACC] bg-[#F4EEE4] p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#8A8173]">
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
                      value="Maya Chen"
                      readOnly
                      aria-readonly="true"
                      className={`${fieldClass} cursor-not-allowed bg-[#EFE7DA] text-[#6B6357] focus:border-[#D8CFC0] focus:ring-0`}
                    />
                  </div>
                  <div>
                    <label htmlFor="hostEmail" className={labelClass}>
                      User email
                    </label>
                    <input
                      id="hostEmail"
                      value="maya@studios.co"
                      readOnly
                      aria-readonly="true"
                      className={`${fieldClass} cursor-not-allowed bg-[#EFE7DA] text-[#6B6357] focus:border-[#D8CFC0] focus:ring-0`}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E4DACC] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5E574C] transition-colors hover:bg-[#191713]/5 hover:text-[#191713]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D9542B] px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F]"
              >
                Publish studio
                <ArrowRight className="size-4" />
              </button>
            </div>
          </form>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
                Before you publish
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-[#191713]">
                A listing creators trust.
              </h2>

              <ul className="mt-5 space-y-3.5">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[13px] leading-relaxed text-[#5E574C]"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D9542B]/10 text-[#D9542B]">
                      <Check className="size-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 rounded-xl border border-[#E4DACC] bg-[#F4EEE4] p-4 text-[11px] leading-relaxed text-[#6B6357]">
                You can update rates, photos, and availability at any time from
                My Studio Listings.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-[#191713] p-6 text-[#F4EEE4]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,84,43,0.28),transparent_55%)]" />
              <div className="relative">
                <Camera className="size-5 text-[#E3A867]" strokeWidth={1.6} />
                <h2 className="mt-5 font-serif text-2xl leading-tight">
                  Need a hand?
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#CFC6B7]">
                  Our host team can help you price the space and present it at
                  its best.
                </p>
                <Link
                  href="/how-it-works"
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E3A867] transition-colors hover:text-[#F4EEE4]"
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
