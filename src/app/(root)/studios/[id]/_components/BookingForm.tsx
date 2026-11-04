"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Loader2,
  ShieldCheck,
} from "lucide-react";

type BookingFormProps = {
  studioId: string;
  rate: number | string;
  deposit: number | string;
};

type Status = "idle" | "loading" | "success" | "error";

const labelClass =
  "font-mono text-[9px] uppercase tracking-[0.18em] text-[#6B6357]";

const fieldClass =
  "mt-2 h-11 w-full rounded-xl border border-[#D8CFC0] bg-[#F4EEE4] px-3 text-sm text-[#191713] outline-none transition-colors placeholder:text-[#9B9184] focus:border-[#D9542B] focus:ring-2 focus:ring-[#D9542B]/10";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const formatHours = (value: number) =>
  Number(value.toFixed(2)).toLocaleString("en-US");

const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

const BookingForm = ({ studioId, rate, deposit }: BookingFormProps) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const hourlyRate = Number.isFinite(Number(rate)) ? Number(rate) : 0;
  const securityDeposit = Number.isFinite(Number(deposit))
    ? Number(deposit)
    : 0;

  const invalidTime = Boolean(
    startTime && endTime && toMinutes(endTime) <= toMinutes(startTime)
  );

  const rawHours =
    startTime && endTime && !invalidTime
      ? (toMinutes(endTime) - toMinutes(startTime)) / 60
      : 0;

  const totalHours = Math.round(rawHours * 100) / 100;
  const subtotal = Math.round(totalHours * hourlyRate * 100) / 100;
  const totalEstimatedCost =
    Math.round((subtotal + securityDeposit) * 100) / 100;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setStatus("loading");
    setFeedback("");

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-studios/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const bookingRes = await result.json();

      if (!result.ok) {
        throw new Error(
          typeof bookingRes?.message === "string"
            ? bookingRes.message
            : "We could not confirm your booking. Please try again."
        );
      }

      setStatus("success");
      setFeedback("Your booking request has been received.");
      form.reset();
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not confirm your booking. Please try again."
      );
    }
  };

  return (
    <section className="rounded-2xl border border-[#D8CFC0] bg-[#FBF8F2] p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D9542B]">
          Booking request
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4DACC] bg-[#F4EEE4] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-[#6B6357]">
          <ShieldCheck className="size-3 text-[#D9542B]" />
          Secure
        </span>
      </div>

      <h2 className="mt-3 font-serif text-3xl leading-none text-[#191713]">
        Reserve the room.
      </h2>
      <p className="mt-2 text-[12px] leading-relaxed text-[#6B6357]">
        Choose your date and hours. The studio will confirm availability.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <input type="hidden" name="studioId" value={studioId} />
        <input type="hidden" name="hourlyRate" value={hourlyRate} />
        <input
          type="hidden"
          name="securityDeposit"
          value={securityDeposit}
        />
        <input type="hidden" name="totalHours" value={totalHours} />
        <input type="hidden" name="subtotal" value={subtotal} />
        <input
          type="hidden"
          name="totalEstimatedCost"
          value={totalEstimatedCost}
        />

        <div>
          <label htmlFor="bookingDate" className={labelClass}>
            Booking date
          </label>
          <input
            id="bookingDate"
            name="bookingDate"
            type="date"
            required
            onChange={() => status !== "loading" && setStatus("idle")}
            className={fieldClass}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="startTime" className={labelClass}>
              Start time
            </label>
            <input
              id="startTime"
              name="startTime"
              type="time"
              step="900"
              required
              value={startTime}
              onChange={(event) => {
                setStartTime(event.target.value);
                if (status !== "loading") setStatus("idle");
              }}
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="endTime" className={labelClass}>
              End time
            </label>
            <input
              id="endTime"
              name="endTime"
              type="time"
              step="900"
              required
              value={endTime}
              onChange={(event) => {
                setEndTime(event.target.value);
                if (status !== "loading") setStatus("idle");
              }}
              className={fieldClass}
            />
          </div>
        </div>

        {invalidTime && (
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#B8431F]">
            <AlertCircle className="size-3.5" />
            End time must be after start time.
          </p>
        )}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E4DACC] bg-[#F4EEE4] px-3.5 py-3">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#6B6357]">
            <Clock3 className="size-3.5 text-[#D9542B]" />
            Total booking hours
          </span>
          <span className="font-serif text-xl leading-none text-[#191713]">
            {formatHours(totalHours)}{" "}
            <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-[#8A8173]">
              hrs
            </span>
          </span>
        </div>

        <div className="mt-4">
          <label htmlFor="notes" className={labelClass}>
            Notes <span className="text-[#9B9184]">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Anything the studio should know?"
            onChange={() => status !== "loading" && setStatus("idle")}
            className={`${fieldClass} h-auto resize-none py-3`}
          />
        </div>

        <div className="mt-5 border-t border-[#E4DACC] pt-4">
          <div className="space-y-2.5 text-[13px]">
            <div className="flex items-center justify-between gap-3 text-[#6B6357]">
              <span>Hourly rate</span>
              <span className="font-medium text-[#191713]">
                {formatCurrency(hourlyRate)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-[#6B6357]">
              <span>Subtotal</span>
              <span className="font-medium text-[#191713]">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-[#6B6357]">
              <span className="flex items-center gap-1.5">
                Refundable security deposit
                <ShieldCheck className="size-3.5 text-[#D9542B]" />
              </span>
              <span className="font-medium text-[#191713]">
                {formatCurrency(securityDeposit)}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#191713] px-4 py-3.5 text-[#F4EEE4]">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#B9AE9C]">
                  Total estimated cost
                </p>
                <p className="mt-1 text-[10px] text-[#B9AE9C]">
                  Includes {formatCurrency(securityDeposit)} refundable security
                  deposit
                </p>
              </div>
              <p className="font-serif text-2xl leading-none">
                {formatCurrency(totalEstimatedCost)}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading" || invalidTime || totalHours <= 0}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D9542B] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <CalendarCheck className="size-4" />
          )}
          {status === "loading" ? "Confirming..." : "Confirm Booking"}
          {status !== "loading" && <ArrowRight className="size-4" />}
        </button>

        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#8A8173]">
          No payment is taken today.
        </p>

        {(status === "success" || status === "error") && feedback && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 flex items-start gap-2 rounded-xl border p-3 text-[11px] leading-relaxed ${
              status === "success"
                ? "border-[#BBD6C7] bg-[#EEF6F1] text-[#2F6B4F]"
                : "border-[#E8C6B9] bg-[#FBEDE7] text-[#9D3F22]"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            )}
            {feedback}
          </div>
        )}
      </form>
    </section>
  );
};

export default BookingForm;
