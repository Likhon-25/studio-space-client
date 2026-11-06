"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Aperture,
  Building2,
  CalendarDays,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";


const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/dashboard/add-new-studio", icon: Plus },
  { label: "My Bookings", href: "/dashboard/my-bookings", icon: CalendarDays },
  {
    label: "My Studio Listings",
    href: "/dashboard/my-studio-listings",
    icon: Building2,
  },
];


const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-canvas/95 px-4 backdrop-blur-md lg:hidden">
        <Link
          href="/"
          aria-label="StudioSpace home"
          className="flex items-center gap-2"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-[#191713] text-[#E3A867]">
            <Aperture className="size-4" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-lg leading-none tracking-[-0.02em] text-[#191713]">
            Studio<span className="italic">Space</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-line-strong" />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open dashboard menu"
            className="flex size-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-panel hover:text-cream"
          >
            <Menu className="size-[18px]" strokeWidth={1.8} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close dashboard menu"
          className="fixed inset-0 z-40 bg-[#12100E]/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        aria-label="Dashboard sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col overflow-hidden border-r border-white/10 bg-[#191713] transition-all duration-300 lg:sticky lg:top-0 lg:z-30 lg:h-svh lg:translate-x-0 ${
          collapsed ? "lg:w-[88px]" : "lg:w-[280px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,84,43,0.16),transparent_45%)]" />

        <div
          className={`relative flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-4 ${
            collapsed ? "lg:justify-center lg:px-0" : ""
          }`}
        >
          <Link
            href="/"
            aria-label="StudioSpace home"
            className="flex items-center gap-2.5"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#F4EEE4] text-[#191713]">
              <Aperture className="size-[19px]" strokeWidth={1.6} />
            </span>
            <span
              className={`font-serif text-[1.4rem] leading-none tracking-[-0.02em] text-[#F4EEE4] ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              Studio<span className="italic">Space</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close dashboard menu"
            className="flex size-8 items-center justify-center rounded-full text-[#CFC6B7] transition-colors hover:bg-white/10 hover:text-[#F4EEE4] lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav
          aria-label="Dashboard navigation"
          className="relative flex-1 overflow-y-auto px-3 py-4"
        >
          <p
            className={`px-3 pb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-[#8A8173] ${
              collapsed ? "lg:hidden" : ""
            }`}
          >
            Workspace
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  title={link.label}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#F4EEE4] text-[#191713]"
                      : "text-[#CFC6B7] hover:bg-white/5 hover:text-[#F4EEE4]"
                  } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
                >
                  <Icon
                    className={`size-[18px] shrink-0 ${
                      active
                        ? "text-[#D9542B]"
                        : "text-[#8A8173] group-hover:text-[#E3A867]"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span
                    className={`truncate ${collapsed ? "lg:hidden" : ""}`}
                  >
                    {link.label}
                  </span>
                  {active && (
                    <span
                      className={`ml-auto size-1.5 shrink-0 rounded-full bg-[#D9542B] ${
                        collapsed ? "lg:hidden" : ""
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="relative shrink-0 border-t border-white/10 p-3">
          <div
            className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
              collapsed ? "justify-center px-0 lg:justify-center lg:px-0" : ""
            }`}
          >
            <ThemeToggle className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-cream-muted transition-colors hover:bg-white/10 hover:text-cream" />
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.16em] text-faint ${
                collapsed ? "hidden" : ""
              }`}
            >
              Theme
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`mt-1 hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8173] transition-colors hover:bg-white/5 hover:text-[#F4EEE4] lg:flex ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-4" />
            ) : (
              <PanelLeftClose className="size-4" />
            )}
            <span className={collapsed ? "hidden" : ""}>
              Collapse sidebar
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
