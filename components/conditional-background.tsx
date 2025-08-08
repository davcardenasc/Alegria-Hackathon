"use client"

import { usePathname } from "next/navigation"
import GlobalBackground from "./global-background"

export default function ConditionalBackground() {
  const pathname = usePathname()
  
  // Don't show background on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }
  
  return <GlobalBackground />
}