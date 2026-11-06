"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  Aperture,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { authClient, signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

const labelClass =
  "font-mono text-[9px] uppercase tracking-[0.18em] text-body-2";

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-line bg-elevated px-3.5 text-base text-ink outline-none transition-colors placeholder:text-placeholder focus:border-brand focus:ring-2 focus:ring-brand/10 sm:text-sm";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email) {
      setError("Enter your email address to continue.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Enter your password to continue.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const requested = params.get("callbackUrl") || params.get("next") || "/";
    const destination =
      requested.startsWith("/") && !requested.startsWith("//")
        ? requested
        : "/";

    setLoading(true);
    const { error: signInError } = await signIn.email({
      email,
      password,
      callbackURL: destination,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
      toast.add({
        title: "Sign in failed",
        description: signInError.message || "Invalid email or password.",
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Signed in",
      description: "Welcome back to StudioSpace.",
    });
    router.replace(destination);
    router.refresh();
  };
  const handleGoogleSignUp = async () =>{
      const data = await authClient.signIn.social({
    provider: "google",
  });

      if (data?.error) {
        console.error(data.error);
        toast.add({
          title: "Google sign-in failed",
          description: data.error.message || "Could not start Google sign-in. Please try again.",
          type: "error",
        });
      }
  }
  return (
    <div className="min-h-svh bg-canvas lg:grid lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-[#191713] lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1800&auto=format&fit=crop")',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#12100E]/95 via-[#191713]/75 to-[#191713]/30"
        />

        <div className="relative z-10 flex h-full min-h-svh flex-col justify-between p-10 xl:p-14">
          <Link
            href="/"
            aria-label="StudioSpace home"
            className="inline-flex w-fit items-center gap-2.5"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-[#E3A867] text-ink">
              <Aperture className="size-[19px]" strokeWidth={1.6} />
            </span>
            <span className="font-serif text-[1.45rem] leading-none tracking-[-0.02em] text-[#F4EEE4]">
              Studio<span className="italic text-[#E3A867]">Space</span>
            </span>
          </Link>

          <div className="max-w-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#E3A867]">
              The studio network / 01
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.02em] text-[#F4EEE4] xl:text-6xl">
              A good room{" "}
              <span className="italic text-[#E3A867]">changes the work.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#D8CFC0]">
              Book photo studios, workshops, and creative spaces by the hour.
            </p>
          </div>

          <div className="flex items-end justify-between gap-6 border-t border-white/15 pt-5">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#B9AE9C]">
                StudioSpace
              </p>
              <p className="mt-1.5 font-serif text-lg italic text-[#F4EEE4]">
                Creative spaces, on call.
              </p>
            </div>

            <Link
              href="/studios"
              className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#F4EEE4] transition-colors hover:text-[#E3A867]"
            >
              Browse studios
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </aside>

      <section className="flex min-h-svh flex-col">
        <header className="flex items-center gap-4 px-4 py-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="StudioSpace home"
            className="flex items-center gap-2.5 lg:hidden"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-[#191713] text-[#E3A867]">
              <Aperture className="size-[17px]" strokeWidth={1.6} />
            </span>
            <span className="font-serif text-xl leading-none tracking-[-0.02em] text-ink">
              Studio<span className="italic">Space</span>
            </span>
          </Link>

          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-faint transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
          <section
            aria-labelledby="login-heading"
            className="w-full max-w-[440px] rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-50px_rgba(25,23,19,0.55)] sm:p-8"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-brand" />
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-brand">
                Member access / 01
              </p>
            </div>

            <h1
              id="login-heading"
              className="mt-4 font-serif text-4xl leading-none tracking-[-0.02em] text-ink sm:text-5xl"
            >
              Welcome back.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Sign in to manage your bookings, listings, and studio details.
            </p>

            <button
            onClick={handleGoogleSignUp}
              type="button"
              className="mt-7 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-canvas text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-line-strong hover:bg-elevated-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                focusable="false"
              >
                <path
                  fill="#4285F4"
                  d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.232c1.891-1.74 2.981-4.305 2.981-7.351Z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.7 0 4.964-.895 6.619-2.422l-3.232-2.51c-.895.6-2.04.955-3.387.955-2.605 0-4.81-1.76-5.599-4.124H3.06v2.59A9.997 9.997 0 0 0 12 22Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.401 13.899A6.005 6.005 0 0 1 6.088 12c0-.659.113-1.3.313-1.899V7.51H3.06A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.06 4.49l3.341-2.59Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.96 2.99 14.696 2 12 2a9.997 9.997 0 0 0-8.94 5.51l3.341 2.59C7.19 7.737 9.395 5.977 12 5.977Z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-whisper">
                Or continue with email
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@studio.com"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  onChange={() => {
                    if (error) setError("");
                  }}
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-medium text-brand underline-offset-4 transition-colors hover:text-brand-strong hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "login-error" : undefined}
                  onChange={() => {
                    if (error) setError("");
                  }}
                  className={inputClass}
                />
              </div>

              {error && (
                <p
                  id="login-error"
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-danger-line bg-danger-soft p-3 text-[11px] leading-relaxed text-danger-text"
                >
                  <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FBF8F2] transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
                <ArrowRight className="size-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              New to StudioSpace?{" "}
              <Link
                href="/register"
                className="font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-strong hover:underline"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>

        <footer className="px-4 pb-6 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-whisper">
          StudioSpace / Creative spaces, on call.
        </footer>
      </section>
    </div>
  );
};

export default LoginPage;
