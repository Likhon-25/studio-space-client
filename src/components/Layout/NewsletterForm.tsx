"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = email.trim();
    if (!value) {
      setError("Please enter your email address to subscribe.");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    // The newsletter subscription endpoint is not wired up in this project yet,
    // so a validated address simply resets the field until the backend exists.
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-5 flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email address
      </label>
      <Input
        id="footer-newsletter-email"
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        required
        placeholder="you@studio.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "footer-newsletter-error" : undefined}
        className="h-12 w-full rounded-full border-line bg-transparent px-5 text-sm text-ink placeholder:text-placeholder focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-1"
      />
      {error ? (
        <p
          id="footer-newsletter-error"
          role="alert"
          className="text-[11px] leading-relaxed text-danger-text"
        >
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        className="h-12 w-full rounded-full bg-brand px-6 text-[#FBF8F2] hover:bg-brand-strong sm:w-auto"
      >
        Subscribe
        <Send className="size-3.5" />
      </Button>
    </form>
  );
};
