"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLanguage("es")}
        className={`px-3 py-2 text-sm font-semibold rounded-l-md transition-colors ${
          language === "es"
            ? "bg-[#4A5EE7] text-white"
            : "bg-[#0a1f3d] text-[#BFC9DB] hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-2 text-sm font-semibold rounded-r-md transition-colors ${
          language === "en"
            ? "bg-[#4A5EE7] text-white"
            : "bg-[#0a1f3d] text-[#BFC9DB] hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  )
}
