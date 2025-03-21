"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only show the toggle after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-full shadow-lg p-2 border border-slate-200 dark:border-slate-700">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 bg-white dark:bg-slate-800 rounded-full shadow-lg p-2 border border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-colors ${
          theme === "light"
            ? "bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-6 w-6" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-colors ${
          theme === "dark"
            ? "bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-6 w-6" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full transition-colors ${
          theme === "system"
            ? "bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`}
        aria-label="System mode"
      >
        <Laptop className="h-6 w-6" />
      </button>
    </div>
  )
}

