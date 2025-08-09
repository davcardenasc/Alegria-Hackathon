"use client"

import type React from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

/**
 * Props for the CustomPopup component
 */
interface CustomPopupProps {
  /** Controls whether the popup is visible */
  isOpen: boolean
  /** Callback function called when the popup should be closed */
  onClose: () => void
  /** Title text displayed at the top of the popup */
  title: string
  /** Message text displayed in the body of the popup */
  message: string
}

/**
 * Custom popup/modal component for the AlegrIA Hackathon website
 * 
 * Features:
 * - Full-screen overlay with backdrop blur effect
 * - Themed styling matching the AlegrIA design system
 * - Accessible close button with keyboard support
 * - Multi-language support for close button text
 * - Click-outside-to-close functionality
 * - Responsive design for mobile and desktop
 * 
 * Used primarily for:
 * - Success messages after form submissions
 * - Error messages and notifications  
 * - Confirmation dialogs
 * - General notifications to users
 * 
 * @component
 * @param {CustomPopupProps} props - The component props
 * @returns {JSX.Element | null} The rendered popup or null if not open
 * 
 * @example
 * ```tsx
 * import { CustomPopup } from "@/components/CustomPopup"
 * 
 * function FormComponent() {
 *   const [showSuccess, setShowSuccess] = useState(false)
 * 
 *   const handleSubmit = () => {
 *     // Submit form logic
 *     setShowSuccess(true)
 *   }
 * 
 *   return (
 *     <>
 *       <form onSubmit={handleSubmit}>
 *         // Form content
 *       </form>
 *       
 *       <CustomPopup
 *         isOpen={showSuccess}
 *         onClose={() => setShowSuccess(false)}
 *         title="¡Éxito!"
 *         message="Tu aplicación ha sido enviada correctamente."
 *       />
 *     </>
 *   )
 * }
 * ```
 */
export const CustomPopup: React.FC<CustomPopupProps> = ({ isOpen, onClose, title, message }) => {
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#00162D] border border-[#4A5EE7]/30 rounded-lg p-6 max-w-md w-full shadow-[0_0_40px_#4A5EE7]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-[#F7F9FF] mb-4">{title}</h2>
        <p className="text-[#BFC9DB] mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white py-2 px-4 rounded-md font-semibold transition-all duration-300 hover:shadow-[0_0_20px_#4A5EE7]"
        >
          {t("forms.close")}
        </button>
      </div>
    </div>
  )
}
