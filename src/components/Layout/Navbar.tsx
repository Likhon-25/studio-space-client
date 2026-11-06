"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Aperture,
  Building2,
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import ThemeToggle from "@/components/theme/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-booking-works" },
  { label: "About Us", href: "/about" },
];

const accountLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/dashboard/add-new-studio", icon: Plus },
  {
    label: "My Studio Listings",
    href: "/dashboard/my-studio-listings",
    icon: Building2,
  },
  { label: "My Bookings", href: "/dashboard/my-bookings", icon: CalendarDays },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const initial =
    user?.name?.trim().charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.includes("#")
      ? false
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeMenus = () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    closeMenus();
    router.replace("/");
    router.refresh();
  };

  const avatar = user?.image ? (
    <span
      role="img"
      aria-label={user.name ? `${user.name} profile photo` : "Profile photo"}
      style={{ backgroundImage: `url("${user.image}")` }}
      className="size-9 shrink-0 rounded-full border border-line bg-cover bg-center"
    />
  ) : (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#191713] text-[11px] font-semibold uppercase text-[#E3A867]">
      {initial}
    </span>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-3 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="StudioSpace home"
          className="group flex shrink-0 items-center gap-2 sm:gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#191713] text-[#E3A867]">
            <Aperture className="size-[19px]" strokeWidth={1.6} />
          </span>
          <span className="hidden font-serif text-[1.45rem] leading-none tracking-[-0.02em] text-ink sm:inline">
            Studio<span className="italic">Space</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                aria-current={active ? "page" : undefined}
                className={`relative text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-2 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-brand transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <ThemeToggle className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-line-strong" />

          {isPending ? (
            <span
              aria-label="Loading account"
              className="h-9 w-[138px] animate-pulse rounded-full bg-line/60 sm:w-[150px]"
            />
          ) : user ? (
            <div
              className="group relative"
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setUserMenuOpen((open) => !open);
                }}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-controls="account-menu"
                aria-label="Open account menu"
                className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface p-0.5 pr-2 transition-colors hover:border-line-strong sm:gap-2 sm:pr-2.5"
              >
                {avatar}
                <span className="max-w-[88px] truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-ink sm:max-w-[140px] sm:text-[11px] sm:tracking-[0.12em]">
                  {user.name || "Account"}
                </span>
                <ChevronDown
                  className={`size-3.5 shrink-0 text-faint transition-transform lg:group-hover:rotate-180 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id="account-menu"
                role="menu"
                aria-label="Account menu"
                className={`absolute top-full right-0 z-50 w-64 max-w-[calc(100vw-2rem)] origin-top-right pt-3 transition-all duration-200 ${
                  userMenuOpen
                    ? "pointer-events-auto visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1 opacity-0"
                } lg:group-hover:pointer-events-auto lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100`}
              >
                <div className="rounded-2xl border border-line bg-surface p-1.5 shadow-[0_24px_60px_-20px_rgba(25,23,19,0.4)]">
                  <div className="flex items-center gap-3 rounded-xl bg-canvas p-3">
                    {avatar}
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-ink">
                        {user.name || "Account"}
                      </p>
                      <p className="truncate text-[10px] text-faint">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1.5 space-y-0.5">
                    {accountLinks.map((link) => {
                      const active = isActive(link.href);
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          role="menuitem"
                          onClick={closeMenus}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[12px] font-medium transition-colors ${
                            active
                              ? "bg-canvas text-ink"
                              : "text-body-2 hover:bg-canvas hover:text-ink"
                          }`}
                        >
                          <Icon
                            className={`size-4 shrink-0 ${
                              active ? "text-brand" : "text-faint"
                            }`}
                            strokeWidth={1.8}
                          />
                          <span className="truncate">{link.label}</span>
                          {active && (
                            <span className="ml-auto size-1.5 shrink-0 rounded-full bg-brand" />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-1.5 border-t border-line-soft pt-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] font-medium text-brand-strong transition-colors hover:bg-danger-soft"
                    >
                      <LogOut className="size-4 shrink-0" strokeWidth={1.8} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/5 sm:px-4 sm:text-[11px]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-full bg-brand px-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-brand-strong sm:px-4 sm:text-[11px]"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setUserMenuOpen(false);
              setMobileOpen((open) => !open);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-panel hover:text-cream lg:hidden"
          >
            {mobileOpen ? (
              <X className="size-[18px]" strokeWidth={1.8} />
            ) : (
              <Menu className="size-[18px]" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-canvas lg:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto max-w-[1280px] space-y-1 px-3 py-3 sm:px-6"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "bg-surface text-ink"
                      : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="size-1.5 rounded-full bg-brand" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
