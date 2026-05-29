import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setIsDark((v) => !v)}
      className="fixed left-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.5)] backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50 hover:text-primary md:left-6 md:top-6"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
};

export default ThemeToggle;
