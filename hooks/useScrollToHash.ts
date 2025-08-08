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

    // Scroll on initial load
    scrollToHash()

    // Listen for hash changes
    window.addEventListener("hashchange", scrollToHash)

    return () => {
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [pathname])
}
