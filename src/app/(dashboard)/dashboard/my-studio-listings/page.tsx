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
      const res = await fetch("/api/studios/me", { cache: "no-store" });
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
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
            Dashboard / My Studios
          </p>
          <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            My Studio Listings
          </h1>
        </div>
        <Link
          href="/dashboard/add-new-studio"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-panel px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-brand"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add Studio</span>
        </Link>
      </div>

      {loading || isPending ? (
        <div className="mt-6 space-y-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-line bg-surface p-3">
              <div className="flex gap-4">
                <div className="h-20 w-24 rounded-xl bg-skeleton sm:h-24 sm:w-32" />
                <div className="flex-1 py-2">
                  <div className="h-4 w-2/3 rounded bg-skeleton" />
                  <div className="mt-3 h-3 w-1/3 rounded bg-skeleton" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
          <Building2 className="mx-auto size-9 text-brand" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl text-ink">No studio listings yet</h2>
          <p className="mt-2 text-sm text-muted">Publish your first creative space.</p>
          <Link href="/dashboard/add-new-studio" className="mt-5 inline-flex h-10 items-center rounded-full bg-brand px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
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
                <article key={studio._id} className="group flex min-h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_45px_-30px_rgba(25,23,19,0.6)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                    {image ? (
                      <div role="img" aria-label={`${title} cover`} style={{ backgroundImage: `url("${image}")` }} className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]" />
                    ) : (
                      <Aperture className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 text-faint" strokeWidth={1.5} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-surface/95 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.15em] text-ink backdrop-blur-sm">
                      {studio.category || "Creative space"}
                    </span>
                    <div className="absolute right-4 bottom-4 rounded-xl bg-panel/90 px-3 py-2 text-right text-cream backdrop-blur-sm">
                      <p className="font-serif text-lg leading-none">${Number.isFinite(rate) ? rate.toLocaleString("en-US") : 0}</p>
                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.13em] text-cream-muted">per hour</p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="line-clamp-1 font-serif text-[1.55rem] leading-tight text-ink">{title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <MapPin className="size-3.5 shrink-0 text-brand" />
                      <span className="line-clamp-1">{studio.location || "Location unavailable"}</span>
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 border-y border-line-soft py-4">
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-elevated text-brand"><DollarSign className="size-4" /></span>
                        <div><p className="font-mono text-[7px] uppercase tracking-[0.12em] text-faint">Hourly</p><p className="mt-0.5 text-xs font-semibold text-ink">${Number.isFinite(rate) ? rate : 0}</p></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-elevated text-brand"><Users className="size-4" /></span>
                        <div><p className="font-mono text-[7px] uppercase tracking-[0.12em] text-faint">Capacity</p><p className="mt-0.5 text-xs font-semibold text-ink">{studio.capacity || "-"} guests</p></div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <Link href={`/studios/${studio._id}`} className="flex h-9 items-center justify-between rounded-full border border-line-soft py-1 pr-1 pl-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-ink transition-colors hover:border-brand hover:text-brand">
                        View details
                        <span className="flex size-7 items-center justify-center rounded-full bg-elevated transition-colors group-hover:bg-brand group-hover:text-white"><ArrowUpRight className="size-3.5" /></span>
                      </Link>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-full border border-line bg-surface text-ink shadow-sm hover:border-brand hover:bg-elevated hover:text-brand"
                          onClick={() => setEditStudio(studio)}
                        >
                          <Pencil />Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-full border border-danger-line bg-danger-soft text-danger-text shadow-sm hover:bg-danger-softer hover:text-danger"
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
            <DialogContent className="max-h-[calc(100vh-2rem)] max-w-2xl overflow-y-auto rounded-[24px] border-line bg-surface p-0 text-ink sm:max-w-2xl">
              <DialogHeader>
                <div className="border-b border-line-soft px-6 py-5 pr-14">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-brand">Listing editor</p>
                  <DialogTitle className="mt-1 font-serif text-2xl text-ink">Edit studio details</DialogTitle>
                  <DialogDescription className="mt-1 text-xs text-muted">Update the information creators will see.</DialogDescription>
                </div>
              </DialogHeader>
              {editStudio && (
                <form onSubmit={updateStudio}>
                  <div className="grid gap-5 px-6 py-5 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Studio name</span>
                      <Input className="h-11 rounded-xl border-line bg-elevated-muted text-ink" name="title" defaultValue={editStudio.title || ""} placeholder="Studio name" required />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Category</span>
                      <select className="h-11 w-full rounded-xl border border-line bg-elevated-muted px-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/15" name="category" defaultValue={editStudio.category || ""}>
                        <option value="">Creative space</option>
                        <option>Photo Studios</option>
                        <option>Sound Stages</option>
                        <option>Podcast Rooms</option>
                        <option>Music Suites</option>
                        <option>Art Workshops</option>
                      </select>
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Capacity</span>
                      <Input className="h-11 rounded-xl border-line bg-elevated-muted text-ink" name="capacity" type="number" min="0" defaultValue={editStudio.capacity ?? 0} placeholder="Capacity" />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Hourly rate</span>
                      <Input className="h-11 rounded-xl border-line bg-elevated-muted text-ink" name="rate" type="number" min="0" defaultValue={editStudio.rate ?? editStudio.hourlyRate ?? 0} placeholder="Hourly rate" required />
                    </label>
                    <label>
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Location</span>
                      <Input className="h-11 rounded-xl border-line bg-elevated-muted text-ink" name="location" defaultValue={editStudio.location || ""} placeholder="Location" />
                    </label>
                    <label className="sm:col-span-2">
                      <span className="mb-2 block font-mono text-[8px] uppercase tracking-[0.16em] text-muted">Cover image URL</span>
                      <div className="relative">
                        <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-brand" />
                        <Input className="h-11 rounded-xl border-line bg-elevated-muted pl-9 text-ink" name="image" defaultValue={editStudio.image || editStudio.imageUrl || ""} placeholder="https://example.com/studio.jpg" />
                      </div>
                    </label>
                  </div>
                  <DialogFooter className="-mx-0 -mb-0 border-t border-line-soft bg-elevated/70 px-6 py-4">
                    <Button type="button" variant="outline" className="rounded-full" onClick={() => setEditStudio(null)}>Cancel</Button>
                    <Button type="submit" className="rounded-full bg-brand text-white hover:bg-brand-strong" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <AlertDialog open={Boolean(deleteStudio)} onOpenChange={(open) => !open && setDeleteStudio(null)}>
            <AlertDialogContent className="max-w-sm rounded-[24px] border border-line-soft bg-surface p-6 text-ink sm:max-w-sm">
              <AlertDialogHeader>
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger">
                  <AlertTriangle className="size-6" />
                </span>
                <AlertDialogTitle className="font-serif text-xl text-ink">Delete this studio?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-relaxed text-muted">
                  This permanently removes &quot;{deleteStudio?.title || "this studio"}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="-mx-6 -mb-6 mt-2 grid grid-cols-2 gap-2 border-t border-line-soft bg-elevated/60 p-4 sm:flex sm:justify-end">
                <AlertDialogCancel className="rounded-full border-line bg-surface text-ink">Keep studio</AlertDialogCancel>
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
