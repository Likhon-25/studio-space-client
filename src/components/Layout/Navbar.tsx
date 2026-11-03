import Link from "next/link";
import { Aperture, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D8CFC0]/80 bg-[#F4EEE4]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link
          href="/"
          aria-label="StudioSpace home"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-[#191713] text-[#E3A867]">
            <Aperture className="size-[19px]" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-[1.45rem] leading-none tracking-[-0.02em] text-[#191713]">
            Studio<span className="italic">Space</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6357] transition-colors hover:text-[#191713]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="inline-flex h-9 items-center justify-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#191713] transition-colors hover:bg-[#191713]/5 sm:px-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#D9542B] px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FBF8F2] transition-colors hover:bg-[#B8431F] sm:px-4"
            >
              Sign Up
            </Link>
          </div>

          <span
            aria-label="Menu"
            className="flex size-9 items-center justify-center rounded-full border border-[#191713]/15 text-[#191713] lg:hidden"
          >
            <Menu className="size-[18px]" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </header>
  );
};
