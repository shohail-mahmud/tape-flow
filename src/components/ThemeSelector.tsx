import { useEffect, useState } from "react";

const themes = [
  { name: "dark", color: "#18181b", label: "Dark" },
  { name: "light", color: "#fafafa", label: "Light", border: true },
  { name: "sunset", gradient: "linear-gradient(135deg, #f97316, #ea580c)", label: "Sunset" },
  { name: "ocean", gradient: "linear-gradient(135deg, #06b6d4, #0284c7)", label: "Ocean" },
  { name: "forest", gradient: "linear-gradient(135deg, #22c55e, #16a34a)", label: "Forest" },
];

export const ThemeSelector = () => {
  const [activeTheme, setActiveTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("tapeflow-theme") || "dark";
    setActiveTheme(saved);
    document.documentElement.className = saved;
  }, []);

  const switchTheme = (themeName: string) => {
    setActiveTheme(themeName);
    document.documentElement.className = themeName;
    localStorage.setItem("tapeflow-theme", themeName);
  };

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => switchTheme(theme.name)}
          className={`w-6 h-6 rounded-full transition-all hover:scale-110 ${
            activeTheme === theme.name ? "ring-2 ring-foreground glow-accent" : ""
          }`}
          style={{
            background: theme.gradient || theme.color,
            border: theme.border ? "1px solid #e4e4e7" : "none",
          }}
          title={theme.label}
          aria-label={`Switch to ${theme.label} theme`}
        />
      ))}
    </div>
  );
};
