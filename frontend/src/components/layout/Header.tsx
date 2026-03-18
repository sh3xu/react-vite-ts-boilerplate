import { Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useUIStore } from "@/store/uiStore";

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const handleThemeChange = useCallback((newIsDark: boolean) => {
    setIsDark(newIsDark);
  }, []);

  const { ref: themeButtonRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 750,
    isDarkMode: isDark,
    onDarkModeChange: handleThemeChange,
  });

  const handleThemeToggle = async () => {
    const root = window.document.documentElement;
    root.setAttribute("data-no-transition", "true");

    try {
      await toggleSwitchTheme();
      // Wait for the full animation (500ms) plus a generous buffer for cleanup
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      root.removeAttribute("data-no-transition");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-2 sm:px-4">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
          <h1 className="text-xl font-bold">Rvite Template</h1>
        </div>

        <div className="flex items-center">
          <Button
            ref={themeButtonRef}
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            className="h-10 w-10"
          >
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
