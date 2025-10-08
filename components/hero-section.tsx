"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronDown } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"

/**
 * Hero section component with scroll-based story progression animation
 * 
 * Features:
 * - Multi-phase storytelling that progresses as user scrolls
 * - Smooth transitions between different story phases
 * - Animated paper airplane that moves during scroll
 * - Dynamic text changes based on scroll position
 * - Call-to-action button that appears in final phase
 * - Parallax-style effects with background elements
 * - Multi-language support for all text content
 * - Responsive design for mobile and desktop
 * 
 * The hero tells the story of the hackathon journey:
 * 1. "Do you have an idea that can change the world?"
 * 2. "From idea..."
 * 3. "...to prototype" 
 * 4. "...to real business"
 * 5. Final CTA with hackathon details
 * 
 * @component
 * @returns {JSX.Element} The hero section component
 * 
 * @example
 * ```tsx
 * import HeroSection from "@/components/hero-section"
 * 
 * export default function HomePage() {
 *   return (
 *     <main>
 *       <HeroSection />
 *       // Other sections...
 *     </main>
 *   )
 * }
 * ```
 */
export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  const phases = [
    {
      title: t("hero.question"),
      subtitle: "",
      showAirplane: true,
      showCTA: false,
    },
    {
      title: t("hero.from_idea"),
      subtitle: "",
      showAirplane: true,
      showCTA: false,
    },
    {
      title: t("hero.to_prototype"),
      subtitle: "",
      showAirplane: true,
      showCTA: false,
    },
    {
      title: t("hero.to_business"),
      subtitle: "",
      showAirplane: false,
      showCTA: false,
    },
    {
      title: t("hero.main_title"),
      subtitle: t("hero.subtitle"),
      showAirplane: false,
      showCTA: true,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return

      const heroRect = heroRef.current.getBoundingClientRect()
      const heroHeight = heroRect.height
      const viewportHeight = window.innerHeight

      // Calculate total scroll progress through the entire section
      const scrolled = Math.max(0, -heroRect.top)
      const maxScroll = heroHeight - viewportHeight
      const progress = Math.min(1, scrolled / maxScroll)

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const getPhaseOpacity = (phaseIndex: number) => {
    const totalPhases = phases.length
    const phaseStart = phaseIndex / totalPhases
    const phaseEnd = (phaseIndex + 1) / totalPhases
    const phaseMid = (phaseStart + phaseEnd) / 2

    // First phase starts visible
    if (phaseIndex === 0 && scrollProgress === 0) {
      return 1
    }

    // Last phase stays at full opacity for shorter time
    if (phaseIndex === phases.length - 1 && scrollProgress >= phaseStart - 0.05) {
      return 1
    }

    // Special handling for "...a negocio real" (phase 3) - longer full opacity
    if (phaseIndex === 3) {
      const fadeRange = 0.04 // Faster fade
      const fullOpacityRange = 0.15 // Shorter full opacity for faster transitions
      const gapBeforeNext = 0.03 // Smaller gap for faster flow

      if (scrollProgress < phaseStart || scrollProgress > phaseEnd - gapBeforeNext) {
        return 0
      }

      if (scrollProgress < phaseMid - fullOpacityRange / 2) {
        // Fading in
        const fadeProgress = (scrollProgress - phaseStart) / fadeRange
        return Math.min(1, fadeProgress)
      } else if (scrollProgress > phaseMid + fullOpacityRange / 2) {
        // Fading out - smoother
        const fadeProgress = (phaseEnd - gapBeforeNext - scrollProgress) / (fadeRange * 0.5)
        return Math.max(0, Math.min(1, fadeProgress))
      } else {
        // Full opacity in the middle
        return 1
      }
    }

    // Create a bell curve for opacity with peak at phase middle
    if (scrollProgress < phaseStart || scrollProgress > phaseEnd) {
      return 0
    }

    // Fade in/out with faster transitions
    const fadeRange = phaseIndex === phases.length - 1 ? 0.05 : 0.05 // Faster fade for all
    const fullOpacityRange = phaseIndex === phases.length - 1 ? 0.1 : 0.15 // Shorter visibility for faster flow

    if (scrollProgress < phaseMid - fullOpacityRange / 2) {
      // Fading in
      const fadeProgress = (scrollProgress - phaseStart) / fadeRange
      return Math.min(1, fadeProgress)
    } else if (scrollProgress > phaseMid + fullOpacityRange / 2) {
      // Fading out
      const fadeProgress = (phaseEnd - scrollProgress) / fadeRange
      return Math.min(1, fadeProgress)
    } else {
      // Full opacity in the middle
      return 1
    }
  }

  const getPhaseTransform = (phaseIndex: number) => {
    const totalPhases = phases.length
    const phaseProgress = scrollProgress * totalPhases - phaseIndex

    // First phase starts centered
    if (phaseIndex === 0 && scrollProgress === 0) {
      return 0
    }

    // Last phase stops moving once it's centered and stays longer
    if (phaseIndex === phases.length - 1 && phaseProgress >= -0.2) {
      return 0
    }

    // Text always moves up when scrolling down
    // Starts from below (40px) and moves to above (-40px)
    const yOffset = 40 - phaseProgress * 80

    // Clamp to prevent excessive movement
    return Math.max(-40, Math.min(40, yOffset))
  }

  const handleCTAClick = () => {
    window.location.href = "/resultados"
  }

  const getTitleColor = (phase: any) => {
    if (phase.title === "…a negocio real") return "#FFD700"
    return "#F7F9FF"
  }

  const getTitleShadow = (phase: any) => {
    if (phase.title === "…a negocio real") return "0 0 20px #FFD700"
    return "none"
  }

  // Calculate airplane visibility
  const airplaneOpacity = scrollProgress < 0.6 ? 1 - scrollProgress * 1.67 : 0

  return (
    <section ref={heroRef} id="mision" className="relative" style={{ height: `${phases.length * 100}vh` }}>
      {/* Sticky content container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 text-center">
          {/* Paper Airplane - Restored to original */}
          <div
            className="mb-4 flex justify-center transition-all duration-1000"
            style={{
              opacity: airplaneOpacity,
              transform: `translateY(${-scrollProgress * 50}px) scale(${1 + scrollProgress * 0.3})`,
              filter: `drop-shadow(0 0 ${25 + scrollProgress * 20}px #4A5EE7)`,
            }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src="/images/paper-airplane.png"
                alt="Paper Airplane"
                fill
                className="object-contain animate-float"
                priority
              />
            </div>
          </div>

          {/* Titles Container - Increased height for better spacing */}
          <div className="relative h-40 md:h-48 flex items-center justify-center">
            {phases.map((phase, index) => {
              const opacity = getPhaseOpacity(index)
              const yOffset = getPhaseTransform(index)

              return (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    opacity,
                    transform: `translateY(${yOffset}px)`,
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                  }}
                >
                  <h1
                    className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight whitespace-pre-line text-center"
                    style={{
                      color: getTitleColor(phase),
                      textShadow: getTitleShadow(phase),
                    }}
                  >
                    {phase.title}
                  </h1>

                  {/* Subtitle with more spacing and special styling for "primer hackathon" */}
                  {phase.subtitle && (
                    <div className="text-lg md:text-xl lg:text-2xl text-[#BFC9DB] mt-8 max-w-3xl mx-auto text-center">
                      <span>{t("hero.subtitle_first_part")}</span>
                      <span className="relative inline-block group">
                        <span className="relative z-10 cursor-help">{t("hero.subtitle_highlight")}</span>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-[#1a2332] border border-[#4A5EE7]/30 rounded-lg text-sm text-[#F7F9FF] max-w-lg w-[90vw] md:w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 shadow-xl">
                          <div className="font-medium text-[#4A5EE7] mb-2">{t("faq.q8")}</div>
                          <div className="text-[#BFC9DB] leading-relaxed text-xs md:text-sm">{t("faq.a8_short")}</div>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a2332]"></div>
                        </div>
                        
                        <svg
                          className="absolute -bottom-1 left-0 w-full h-4 z-0 opacity-80"
                          viewBox="0 0 400 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 10.5C25 8.2 60 6.8 100 7.5C150 8.5 200 9.2 250 8.8C300 8.4 350 7.9 385 9.2C390 9.5 395 10.1 398 10.8"
                            stroke="#EF4444"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </span>
                      <span>{t("hero.subtitle_last_part")}</span>
                    </div>
                  )}

                  {/* CTA Button - Fixed hitbox */}
                  {phase.showCTA && (
                    <div className="mt-12 mx-4 sm:mx-6 md:mx-0">
                      <button
                        onClick={handleCTAClick}
                        className="inline-block bg-gradient-to-r from-[#4A5EE7] to-[#BFC9DB] hover:from-[#4A5EE7]/80 hover:to-[#BFC9DB]/80 text-white px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold transition-all duration-300 hover:shadow-[0_0_40px_#4A5EE7] hover:scale-105 hover:-translate-y-2 rounded-xl cursor-pointer border-none outline-none focus:outline-none focus:ring-2 focus:ring-[#4A5EE7] focus:ring-offset-2 focus:ring-offset-[#00162D] touch-manipulation select-none"
                        style={{
                          WebkitTapHighlightColor: "transparent",
                          minHeight: "60px",
                          minWidth: "200px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {t("hero.cta")}
                      </button>

                      {/* Application deadline notice */}
                      <p className="text-[#BFC9DB]/80 text-sm md:text-base mt-4 font-medium">{t("hero.deadline")}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Scroll hint - Higher on mobile only */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-[#BFC9DB] text-sm z-30 md:hidden pointer-events-none"
            style={{
              bottom: "18vh", // Higher on mobile
              opacity: scrollProgress > 0.15 ? 0 : Math.max(0, 1 - scrollProgress * 6),
            }}
          >
            <div className="flex flex-col items-center opacity-75">
              <span>{t("hero.scroll_hint")}</span>
              <ChevronDown className="mt-1" size={20} />
            </div>
          </div>

          {/* Desktop scroll hint - original position */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-[#BFC9DB] text-sm z-30 hidden md:block pointer-events-none"
            style={{
              bottom: "12vh",
              opacity: scrollProgress > 0.15 ? 0 : Math.max(0, 1 - scrollProgress * 6),
            }}
          >
            <div className="flex flex-col items-center opacity-75">
              <span>{t("hero.scroll_hint")}</span>
              <ChevronDown className="mt-1" size={20} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes gradientSweep {
          0%,
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }

        /* Scale down plane on larger screens */
        @media (min-width: 760px) {
          .plane-container {
            transform: scale(0.7);
          }
        }
      `}</style>
    </section>
  )
}
