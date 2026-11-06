"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, ArrowUpRight, MapPin, ReceiptText, XCircle, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
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

type Booking = {
  _id: string;
  bookingDate?: string;
  studioId?: string;
  startTime?: string;
  endTime?: string;
  hourlyRate?: number | string;
  totalEstimatedCost?: number | string;
  status?: string;
};

type Studio = {
  _id: string;
  title?: string;
  location?: string;
  image?: string;
  imageUrl?: string;
};

const MyBookingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [receiptBooking, setReceiptBooking] = useState<Booking | null>(null);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const email = session?.user.email?.trim().toLowerCase();
    if (isPending) return;
    if (!email) return;

    const loadBookings = async () => {
      const response = await fetch("/api/bookings/me", { cache: "no-store" });
      const data = response.ok ? await response.json() : { bookings: [], studios: [] };
      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      setStudios(Array.isArray(data.studios) ? data.studios : []);
      setLoading(false);
    };

    loadBookings();
  }, [isPending, session?.user.email]);

  const findStudio = (booking: Booking) =>
    studios.find((studio) => studio._id === booking.studioId);

  const getStatus = (booking: Booking) =>
    (booking.status || "pending").toLowerCase() === "cancelled" ? "cancelled" : "pending";

  const formatPrice = (booking: Booking) =>
    `$${Number(booking.totalEstimatedCost ?? booking.hourlyRate ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const cancelBookingRequest = async () => {
    if (!cancelBooking) return;
    setCancelling(true);
    try {
      const res = await fetch(
        `/api/bookings/${cancelBooking._id}/cancel`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Cancellation failed");

      setBookings((current) =>
        current.map((booking) =>
          booking._id === cancelBooking._id ? { ...booking, status: "cancelled" } : booking
        )
      );
      setCancelBooking(null);
      toast.add({ title: "Booking cancelled", description: "The booking status is now cancelled." });
    } catch {
      toast.add({ title: "Cancellation failed", description: "Please try again.", type: "error" });
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand">
          Dashboard / Reservations
        </p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
          My Bookings
        </h1>
      </div>

      {loading || isPending ? (
        <div className="mt-6 space-y-3">
          {[0, 1].map((item) => (
            <div key={item} className="animate-pulse rounded-2xl border border-line bg-surface p-4">
              <div className="h-4 w-1/3 rounded bg-skeleton" />
              <div className="mt-3 h-3 w-1/2 rounded bg-skeleton" />
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
          <CalendarDays className="mx-auto size-9 text-brand" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl text-ink">No bookings yet</h2>
          <p className="mt-2 text-sm text-muted">Find a studio and reserve your session.</p>
          <Link href="/studios" className="mt-5 inline-flex h-10 items-center rounded-full bg-brand px-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            Browse studios
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {bookings.map((booking) => {
            const studio = findStudio(booking);
            const status = getStatus(booking);
            const image = studio?.image || studio?.imageUrl;
            const studioName = studio?.title || "Studio reservation";

            return (
              <article key={booking._id} className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_18px_40px_-28px_rgba(25,23,19,0.55)]">
                <div className="grid sm:grid-cols-[180px_1fr]">
                  <div className="relative h-36 overflow-hidden bg-panel sm:h-full sm:min-h-44">
                    {image ? (
                      <div role="img" aria-label={`${studioName} cover`} style={{ backgroundImage: `url("${image}")` }} className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]" />
                    ) : (
                      <Building2 className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 text-cream-muted" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>

                  <div className="min-w-0 p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-brand">Studio booking</p>
                        <h2 className="mt-1 truncate font-serif text-xl text-ink sm:text-2xl">{studioName}</h2>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                          <MapPin className="size-3.5 text-brand" />
                          <span className="truncate">{studio?.location || "Location unavailable"}</span>
                        </p>
                      </div>
                      <span className={status === "cancelled"
                        ? "shrink-0 rounded-full bg-danger-soft px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-danger"
                        : "shrink-0 rounded-full bg-warn-soft px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-warn-text"
                      }>
                        {status}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3">
                      <div className="rounded-xl bg-elevated px-3 py-2.5">
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Date</p>
                        <p className="mt-1 text-[12px] font-semibold text-ink">{booking.bookingDate || "Not set"}</p>
                      </div>
                      <div className="rounded-xl bg-elevated px-3 py-2.5">
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Time</p>
                        <p className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-ink">
                          <Clock3 className="size-3 text-brand" />
                          {booking.startTime || "—"}–{booking.endTime || "—"}
                        </p>
                      </div>
                      <div className="col-span-2 rounded-xl bg-elevated px-3 py-2.5 lg:col-span-1">
                        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-faint">Price</p>
                        <p className="mt-1 text-[12px] font-semibold text-ink">{formatPrice(booking)}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        className="rounded-full border border-line bg-surface text-ink shadow-sm hover:border-brand hover:bg-elevated hover:text-brand"
                        onClick={() => setReceiptBooking(booking)}
                      >
                        <ReceiptText />
                        Receipt
                      </Button>
                      {status === "pending" && (
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-full border border-danger-line bg-danger-soft text-danger-text shadow-sm hover:bg-danger-softer hover:text-danger"
                          onClick={() => setCancelBooking(booking)}
                        >
                          <XCircle />
                          Cancel
                        </Button>
                      )}
                      <Link href={booking.studioId ? `/studios/${booking.studioId}` : "/studios"} className="ml-auto inline-flex h-7 items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted hover:text-brand">
                        View studio
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Dialog open={Boolean(receiptBooking)} onOpenChange={(open) => !open && setReceiptBooking(null)}>
        <DialogContent className="max-w-md overflow-hidden rounded-[24px] border-line bg-surface p-0 text-ink">
          <DialogHeader>
            <div className="border-b border-line-soft px-6 py-5 pr-14">
              <div className="flex items-center gap-2 text-brand">
                <ReceiptText className="size-4" />
                <p className="font-mono text-[8px] uppercase tracking-[0.18em]">Booking receipt</p>
              </div>
              <DialogTitle className="mt-2 font-serif text-2xl text-ink">Reservation details</DialogTitle>
              <DialogDescription className="mt-1 text-xs text-muted">A summary of your studio booking.</DialogDescription>
            </div>
          </DialogHeader>
          {receiptBooking && (
            <div className="px-6 pb-1">
              <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-elevated p-5">
                <div className="absolute -top-8 -right-8 size-24 rounded-full bg-brand/10" />
                <div className="relative flex items-start justify-between border-b border-line pb-4">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">Studio</p>
                  <p className="mt-1 font-serif text-lg text-ink">
                    {findStudio(receiptBooking)?.title || "Studio reservation"}
                  </p>
                </div>
                  <span className="flex size-10 items-center justify-center rounded-full bg-surface text-brand shadow-sm">
                    <CheckCircle2 className="size-5" />
                  </span>
                </div>
                <div className="relative mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-surface p-3">
                    <p className="text-[10px] text-faint">Date</p>
                    <p className="mt-1 font-semibold">{receiptBooking.bookingDate || "Not set"}</p>
                  </div>
                  <div className="rounded-xl bg-surface p-3">
                    <p className="text-[10px] text-faint">Time</p>
                    <p className="mt-1 font-semibold">{receiptBooking.startTime || "—"}–{receiptBooking.endTime || "—"}</p>
                  </div>
                  <div className="rounded-xl bg-surface p-3">
                    <p className="text-[10px] text-faint">Status</p>
                    <p className="mt-1 font-semibold capitalize">{getStatus(receiptBooking)}</p>
                  </div>
                  <div className="rounded-xl bg-panel p-3 text-cream">
                    <p className="text-[10px] text-cream-muted">Total price</p>
                    <p className="mt-1 text-base font-semibold">{formatPrice(receiptBooking)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="-mx-0 -mb-0 border-t border-line-soft bg-elevated/70 px-6 py-4">
            <Button type="button" className="rounded-full bg-panel px-5 text-cream hover:bg-brand" onClick={() => setReceiptBooking(null)}>
              <ShieldCheck />
              Close receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(cancelBooking)} onOpenChange={(open) => !open && setCancelBooking(null)}>
        <AlertDialogContent className="max-w-sm rounded-[24px] border border-line-soft bg-surface p-6 text-ink sm:max-w-sm">
          <AlertDialogHeader>
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger">
              <XCircle className="size-6" />
            </span>
            <AlertDialogTitle className="font-serif text-xl text-ink">Cancel this booking?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed text-muted">
              The booking will remain in My Bookings with a cancelled status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="-mx-6 -mb-6 mt-2 grid grid-cols-2 gap-2 border-t border-line-soft bg-elevated/60 p-4 sm:flex sm:justify-end">
            <AlertDialogCancel className="rounded-full border-line bg-surface text-ink">Keep booking</AlertDialogCancel>
            <AlertDialogAction className="rounded-full bg-red-600 text-white hover:bg-red-700" onClick={cancelBookingRequest} disabled={cancelling}>
              {cancelling ? "Cancelling..." : "Cancel booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyBookingPage;
