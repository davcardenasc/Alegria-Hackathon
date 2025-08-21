"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // Don't apply session checks to login page
  const isLoginPage = pathname === "/admin/login"

  // Show loading for non-login pages while checking session
  if (status === "loading" && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#00162D] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Always render login page
  if (isLoginPage) {
    return <>{children}</>
  }

  // For other admin pages, middleware handles authentication redirect
  // Just render the content once session is loaded
  return <>{children}</>
}