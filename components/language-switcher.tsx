"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { Globe } from "lucide-react"

/**
 * Language switcher component for toggling between Spanish and English
 * 
 * Features:
 * - Toggle between Spanish (ES) and English (EN)
 * - Visual feedback for currently selected language
 * - Smooth transitions with hover effects
 * - Persists language choice to localStorage
 * - Globe icon for visual context
 * - Themed styling matching AlegrIA design system
 * 
 * The language preference is automatically saved and restored across sessions
 * via the LanguageContext provider.
 * 
 * @component
 * @returns {JSX.Element} The language switcher component
 * 
 * @example
 * ```tsx
 * import LanguageSwitcher from "@/components/language-switcher"
 * 
 * // Used in header or navigation
 * function Header() {
 *   return (
 *     <nav>
 *       <LanguageSwitcher />
 *     </nav>
 *   )
 * }
 * ```
 * 
 * @see {@link LanguageContext} for language state management
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-[#4A5EE7]" />
      <div className="flex bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg overflow-hidden">
        <button
          onClick={() => setLanguage("es")}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === "es" ? "bg-[#4A5EE7] text-white" : "text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === "en" ? "bg-[#4A5EE7] text-white" : "text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  )
}
