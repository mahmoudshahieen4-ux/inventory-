import { Moon, SunMedium } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-black/20 px-4 py-2 text-sm text-violet-100 transition hover:bg-violet-500/10"
    >
      {theme === "dark" ? (
        <SunMedium className="h-4 w-4 text-violet-200" />
      ) : (
        <Moon className="h-4 w-4 text-violet-500" />
      )}
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
