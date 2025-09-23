import { useEffect, useState } from "react";

export function useTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (prefersDark ? "dark" : "light")
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return { theme, toggleTheme };
}
