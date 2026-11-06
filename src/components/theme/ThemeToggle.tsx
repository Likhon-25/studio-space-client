"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "studiospace-theme";

const subscribeToTheme = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const isDarkTheme = () => document.documentElement.classList.contains("dark");

export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const dark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => false);

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // Persistence is best-effort; the toggle still works this session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={className}
    >
      {dark ? (
        <Sun className="size-[18px]" strokeWidth={1.8} />
      ) : (
        <Moon className="size-[18px]" strokeWidth={1.8} />
      )}
    </button>
  );
};

export default ThemeToggle;
