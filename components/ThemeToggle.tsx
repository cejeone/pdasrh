"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle Dark Mode">
      {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
    </Button>
  );
}
