"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Don't redirect if we're already on the login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (isLoginPage) return // Don't redirect login page

    if (!session) {
      router.push("/admin/login")
      return
    }
  }, [session, status, router, isLoginPage])

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

  // For other admin pages, require authentication
  if (!session) {
    return null
  }

  return <>{children}</>
}