import Link from "next/link";
import { Aperture } from "lucide-react";
import { studioCategories } from "@/components/StudioCategoryFilter";
import { NewsletterForm } from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "Sign Up", href: "/register" },
  { label: "Log In", href: "/login" },
];

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="6" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const socialLinks = [
  { label: "StudioSpace on X", href: "https://x.com/", Icon: XIcon },
  { label: "StudioSpace on Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
  { label: "StudioSpace on YouTube", href: "https://youtube.com/", Icon: YouTubeIcon },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="StudioSpace home"
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-[#191713] text-[#E3A867]">
                <Aperture className="size-[19px]" strokeWidth={1.6} />
              </span>
              <span className="font-serif text-[1.45rem] leading-none tracking-[-0.02em] text-ink">
                Studio<span className="italic">Space</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              StudioSpace pairs creators with the rooms that make their work
              possible — from daylight cyc walls to sound stages, reserved by the
              hour.
            </p>

            <ul className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-line bg-canvas text-muted transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="font-serif text-lg leading-tight text-ink">
              Quick Navigation
            </h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg leading-tight text-ink">
              Popular Studio Categories
            </h3>
            <ul className="mt-5 space-y-2.5">
              {studioCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category.name)}`}
                    className="group block"
                  >
                    <span className="block text-sm font-medium text-ink transition-colors group-hover:text-brand">
                      {category.name}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-faint">
                      {category.note}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-serif text-lg leading-tight text-ink">
              Newsletter
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Early access to new studio spaces, member-only rates, and stories
              from the creative floor.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 border-t border-line-soft pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              © {year} StudioSpace. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/terms"
                className="text-xs font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-xs font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
