"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    // Function to scroll to hash
    const scrollToHash = () => {
      const hash = window.location.hash
      if (hash) {
        // Remove the # from the hash
        const elementId = hash.substring(1)

        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(elementId)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }, 100)
      }
    }

    // Clear any hash from the URL on initial load to prevent unwanted scrolling
    if (pathname === "/" && window.location.hash) {
      // Use replaceState to remove hash without triggering hashchange
      window.history.replaceState(null, "", window.location.pathname)
    }

    // Don't scroll on initial load - only on explicit hash changes
    // This prevents automatic scrolling when the page loads
    
    // Listen for hash changes only
    window.addEventListener("hashchange", scrollToHash)

    return () => {
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [pathname])
}
