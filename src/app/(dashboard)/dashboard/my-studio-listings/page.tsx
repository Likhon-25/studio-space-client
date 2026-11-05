"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Aperture, ArrowUpRight, Building2, MapPin, Plus, Pencil, Trash2, Users, DollarSign, ImageIcon, AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Studio = {
  _id: string;
  title?: string;
  category?: string;
  location?: string;
  image?: string;
  imageUrl?: string;
  rate?: number | string;
  hourlyRate?: number | string;
  capacity?: number | string;
};

const MyStudioListings = () => {
  const { data: session, isPending } = authClient.useSession();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStudio, setEditStudio] = useState<Studio | null>(null);
  const [deleteStudio, setDeleteStudio] = useState<Studio | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const email = session?.user.email?.trim().toLowerCase();
    if (isPending) return;
    if (!email) return;

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

  const updateStudio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editStudio) return;

    const form = new FormData(event.currentTarget);
    const updateData = {
      title: String(form.get("title") || ""),
      category: String(form.get("category") || ""),
      location: String(form.get("location") || ""),
      image: String(form.get("image") || ""),
      rate: Number(form.get("rate") || 0),
      capacity: Number(form.get("capacity") || 0),
    };

    setSaving(true);
    try {
      const res = await fetch(
        `/api/studios/${editStudio._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      if (!res.ok) throw new Error("Update failed");

      setStudios((current) =>
        current.map((studio) =>
          studio._id === editStudio._id ? { ...studio, ...updateData } : studio
        )
      );
      setEditStudio(null);
      toast.add({ title: "Studio updated", description: "Your listing changes were saved." });
    } catch {
      toast.add({ title: "Update failed", description: "Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const deleteStudioListing = async () => {
    if (!deleteStudio) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/studios/${deleteStudio._id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");

      setStudios((current) => current.filter((studio) => studio._id !== deleteStudio._id));
      setDeleteStudio(null);
      toast.add({ title: "Studio deleted", description: "The listing was removed." });
    } catch {
      toast.add({ title: "Delete failed", description: "Please try again.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#D9542B]">
            Dashboard / My Studios
          </p>
          <h1 className="mt-2 font-serif text-3xl text-[#191713] sm:text-4xl">
            My Studio Listings
          </h1>
        </div>
        <Link
          href="/dashboard/add-new-studio"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#191713] px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F4EEE4] transition-colors hover:bg-[#D9542B]"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add Studio</span>
        </Link>
      </div>

      {loading || isPending ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-3">
              <div className="flex gap-4">
                <div className="h-20 w-24 rounded-xl bg-[#E7DDCE] sm:h-24 sm:w-32" />
                <div className="flex-1 py-2">
                  <div className="h-4 w-2/3 rounded bg-[#E7DDCE]" />
                  <div className="mt-3 h-3 w-1/3 rounded bg-[#E7DDCE]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#C8BCA8] bg-[#FBF8F2] px-6 py-14 text-center">
          <Building2 className="mx-auto size-9 text-[#D9542B]" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl text-[#191713]">No studio listings yet</h2>
          <p className="mt-2 text-sm text-[#6B6357]">Publish your first creative space.</p>
          <Link href="/dashboard/add-new-studio" className="mt-5 inline-flex h-10 items-center rounded-full bg-[#D9542B] px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Add new studio
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => {
              const title = studio.title || "Untitled studio";
              const image = studio.image || studio.imageUrl;
              const rate = Number(studio.rate ?? studio.hourlyRate ?? 0);

              return (
                <article key={studio._id} className="group flex min-h-full flex-col overflow-hidden rounded-[22px] border border-[#D8CFC0] bg-[#FBF8F2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C4B8A5] hover:shadow-[0_24px_45px_-30px_rgba(25,23,19,0.6)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#191713]">
                    {image ? (
                      <div role="img" aria-label={`${title} cover`} style={{ backgroundImage: `url("${image}")` }} className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]" />
                    ) : (
                      <Aperture className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 text-[#8A8173]" strokeWidth={1.5} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#FBF8F2]/95 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-[#191713] backdrop-blur-sm">
                      {studio.category || "Creative space"}
                    </span>
                    <div className="absolute right-4 bottom-4 rounded-xl bg-[#191713]/90 px-3 py-2 text-right text-[#F4EEE4] backdrop-blur-sm">
                      <p className="font-serif text-lg leading-none">${Number.isFinite(rate) ? rate.toLocaleString("en-US") : 0}</p>
                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.13em] text-[#CFC6B7]">per hour</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="line-clamp-1 font-serif text-[1.55rem] leading-tight text-[#191713]">{title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#6B6357]">
                      <MapPin className="size-3.5 shrink-0 text-[#D9542B]" />
                      <span className="line-clamp-1">{studio.location || "Location unavailable"}</span>
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 border-y border-[#E4DACC] py-4">
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-[#F4EEE4] text-[#D9542B]"><DollarSign className="size-4" /></span>
                        <div><p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#8A8173]">Hourly</p><p className="mt-0.5 text-xs font-semibold text-[#191713]">${Number.isFinite(rate) ? rate : 0}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-[#F4EEE4] text-[#D9542B]"><Users className="size-4" /></span>
                        <div><p className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#8A8173]">Capacity</p><p className="mt-0.5 text-xs font-semibold text-[#191713]">{studio.capacity || "-"} guests</p></div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Link href={`/studios/${studio._id}`} className="flex h-9 items-center justify-between rounded-full border border-[#E4DACC] py-1 pr-1 pl-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#191713] transition-colors hover:border-[#D9542B] hover:text-[#D9542B]">
                        View details
                        <span className="flex size-7 items-center justify-center rounded-full bg-[#F4EEE4] transition-colors group-hover:bg-[#D9542B] group-hover:text-white"><ArrowUpRight className="size-3.5" /></span>
                      </Link>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-full border border-[#D8CFC0] bg-[#FBF8F2] text-[#191713] shadow-sm hover:border-[#D9542B] hover:bg-[#F4EEE4] hover:text-[#D9542B]"
                          onClick={() => setEditStudio(studio)}
                        >
                          <Pencil />Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-full border border-red-200 bg-red-50 text-red-700 shadow-sm hover:border-red-300 hover:bg-red-100 hover:text-red-800"
                          onClick={() => setDeleteStudio(studio)}
                        >
                          <Trash2 />Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <Dialog open={Boolean(editStudio)} onOpenChange={(open) => !open && setEditStudio(null)}>
            <DialogContent className="max-h-[calc(100vh-2rem)] max-w-2xl overflow-y-auto rounded-[24px] border-[#D8CFC0] bg-[#FBF8F2] p-0 text-[#191713] sm:max-w-2xl">
              <DialogHeader>
                <div className="border-b border-[#E4DACC] px-6 py-5 pr-14">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#D9542B]">Listing editor</p>
                  <DialogTitle className="mt-1 font-serif text-2xl text-[#191713]">Edit studio details</DialogTitle>
                  <DialogDescription className="mt-1 text-xs text-[#6B6357]">Update the information creators will see.</DialogDescription>
                </div>
              </DialogHeader>
              {editStudio && (
                <form onSubmit={updateStudio}>
                  <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Studio name</span>
                      <Input className="h-11 rounded-xl border-[#D8CFC0] bg-white/70 text-[#191713]" name="title" defaultValue={editStudio.title || ""} placeholder="Studio name" required />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Category</span>
                      <select className="h-11 w-full rounded-xl border border-[#D8CFC0] bg-white/70 px-3 text-sm text-[#191713] outline-none focus:border-[#D9542B] focus:ring-2 focus:ring-[#D9542B]/15" name="category" defaultValue={editStudio.category || ""}>
                        <option value="">Creative space</option>
                        <option>Photo Studios</option>
                        <option>Sound Stages</option>
                        <option>Podcast Rooms</option>
                        <option>Music Suites</option>
                        <option>Art Workshops</option>
                      </select>
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Capacity</span>
                      <Input className="h-11 rounded-xl border-[#D8CFC0] bg-white/70 text-[#191713]" name="capacity" type="number" min="0" defaultValue={editStudio.capacity ?? 0} placeholder="Capacity" />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Hourly rate</span>
                      <Input className="h-11 rounded-xl border-[#D8CFC0] bg-white/70 text-[#191713]" name="rate" type="number" min="0" defaultValue={editStudio.rate ?? editStudio.hourlyRate ?? 0} placeholder="Hourly rate" required />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Location</span>
                      <Input className="h-11 rounded-xl border-[#D8CFC0] bg-white/70 text-[#191713]" name="location" defaultValue={editStudio.location || ""} placeholder="Location" />
                    </label>
                    <label className="sm:col-span-2">
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#6B6357]">Cover image URL</span>
                      <div className="relative">
                        <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#D9542B]" />
                        <Input className="h-11 rounded-xl border-[#D8CFC0] bg-white/70 pl-9 text-[#191713]" name="image" defaultValue={editStudio.image || editStudio.imageUrl || ""} placeholder="https://example.com/studio.jpg" />
                      </div>
                    </label>
                  </div>
                  <DialogFooter className="-mx-0 -mb-0 border-t border-[#E4DACC] bg-[#F4EEE4]/70 px-6 py-4">
                    <Button type="button" variant="outline" className="rounded-full" onClick={() => setEditStudio(null)}>Cancel</Button>
                    <Button type="submit" className="rounded-full bg-[#D9542B] text-white hover:bg-[#B8431F]" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <AlertDialog open={Boolean(deleteStudio)} onOpenChange={(open) => !open && setDeleteStudio(null)}>
            <AlertDialogContent className="max-w-sm rounded-[24px] border border-[#E4DACC] bg-[#FBF8F2] p-6 text-[#191713] sm:max-w-sm">
              <AlertDialogHeader>
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertTriangle className="size-6" />
                </span>
                <AlertDialogTitle className="font-serif text-xl text-[#191713]">Delete this studio?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-relaxed text-[#6B6357]">
                  This permanently removes &quot;{deleteStudio?.title || "this studio"}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="-mx-6 -mb-6 mt-2 grid grid-cols-2 gap-2 border-t border-[#E4DACC] bg-[#F4EEE4]/60 p-4 sm:flex sm:justify-end">
                <AlertDialogCancel className="rounded-full border-[#D8CFC0] bg-[#FBF8F2] text-[#191713]">Keep studio</AlertDialogCancel>
                <AlertDialogAction className="rounded-full bg-red-600 text-white hover:bg-red-700" onClick={deleteStudioListing} disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete studio"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default MyStudioListings;
