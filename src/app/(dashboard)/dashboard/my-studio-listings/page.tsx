"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Aperture, Building2, MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/${editStudio._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/${deleteStudio._id}`,
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
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Studio Name and Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead className="text-center">Edit</TableHead>
                  <TableHead className="text-center">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studios.map((studio) => {
                  const title = studio.title || "Untitled studio";
                  const image = studio.image || studio.imageUrl;
                  const rate = Number(studio.rate ?? studio.hourlyRate ?? 0);
                  return (
                    <TableRow key={studio._id}>
                      <TableCell>
                        <div className="relative size-16 overflow-hidden rounded-xl bg-[#191713]">
                          {image ? (
                            <div role="img" aria-label={`${title} cover`} style={{ backgroundImage: `url("${image}")` }} className="absolute inset-0 bg-cover bg-center" />
                          ) : (
                            <Aperture className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-[#8A8173]" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-serif text-base text-[#191713]">{title}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#6B6357]">
                          <MapPin className="size-3" />
                          {studio.location || "Location unavailable"}
                        </p>
                      </TableCell>
                      <TableCell>{studio.category || "Creative space"}</TableCell>
                      <TableCell>${Number.isFinite(rate) ? rate.toLocaleString("en-US") : 0}/hr</TableCell>
                      <TableCell>{studio.capacity || "-"} people</TableCell>
                      <TableCell className="text-center">
                        <Button size="icon-sm" variant="outline" onClick={() => setEditStudio(studio)} aria-label={`Edit ${title}`}>
                          <Pencil />
                        </Button>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button size="icon-sm" variant="destructive" onClick={() => setDeleteStudio(studio)} aria-label={`Delete ${title}`}>
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <Dialog open={Boolean(editStudio)} onOpenChange={(open) => !open && setEditStudio(null)}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit studio</DialogTitle>
                <DialogDescription>Update the listing information.</DialogDescription>
              </DialogHeader>
              {editStudio && (
                <form onSubmit={updateStudio} className="grid gap-3 sm:grid-cols-2">
                  <Input name="title" defaultValue={editStudio.title || ""} placeholder="Studio name" required />
                  <Input name="category" defaultValue={editStudio.category || ""} placeholder="Category" />
                  <Input className="sm:col-span-2" name="location" defaultValue={editStudio.location || ""} placeholder="Location" />
                  <Input name="rate" type="number" min="0" defaultValue={editStudio.rate ?? editStudio.hourlyRate ?? 0} placeholder="Hourly rate" required />
                  <Input name="capacity" type="number" min="0" defaultValue={editStudio.capacity ?? 0} placeholder="Capacity" />
                  <Input className="sm:col-span-2" name="image" defaultValue={editStudio.image || editStudio.imageUrl || ""} placeholder="Image URL" />
                  <DialogFooter className="sm:col-span-2">
                    <Button type="button" variant="outline" onClick={() => setEditStudio(null)}>Cancel</Button>
                    <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          <AlertDialog open={Boolean(deleteStudio)} onOpenChange={(open) => !open && setDeleteStudio(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this studio?</AlertDialogTitle>
                <AlertDialogDescription>
                  This permanently removes &quot;{deleteStudio?.title || "this studio"}&quot;. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={deleteStudioListing} disabled={deleting}>
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
