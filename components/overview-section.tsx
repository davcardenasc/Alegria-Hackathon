"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Info, PlayCircle, Users, Calendar, DollarSign, Trophy, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from "@/contexts/LanguageContext"

export default function OverviewSection() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const items = [
    {
      icon: Info,
      title: t("overview.what_is.title"),
      lines: t("overview.what_is.body").split("\n"),
      color: "from-[#4A5EE7]/20 to-[#6366f1]/20",
      border: "border-[#4A5EE7]/40",
      iconColor: "text-[#4A5EE7]",
    },
    {
      icon: PlayCircle,
      title: t("overview.flow.title"),
      lines: t("overview.flow.body").split("\n"),
      color: "from-[#BFC9DB]/20 to-white/10",
      border: "border-[#BFC9DB]/40",
      iconColor: "text-[#BFC9DB]",
    },
    {
      icon: Users,
      title: t("overview.eligibility.title"),
      lines: t("overview.eligibility.body").split("\n"),
      color: "from-green-400/20 to-emerald-600/20",
      border: "border-emerald-400/40",
      iconColor: "text-emerald-400",
    },
    {
      icon: Calendar,
      title: t("overview.dates.title"),
      lines: t("overview.dates.body").split("\n"),
      color: "from-orange-400/20 to-amber-600/20",
      border: "border-amber-400/40",
      iconColor: "text-amber-400",
    },
    {
      icon: DollarSign,
      title: t("overview.cost.title"),
      lines: t("overview.cost.body").split("\n"),
      color: "from-sky-400/20 to-cyan-600/20",
      border: "border-sky-400/40",
      iconColor: "text-sky-400",
    },
    {
      icon: Trophy,
      title: t("overview.prizes.title"),
      lines: t("overview.prizes.body").split("\n"),
      color: "from-yellow-400/20 to-yellow-600/20",
      border: "border-yellow-400/40",
      iconColor: "text-yellow-400",
    },
  ]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  // Touch/Mouse handlers for swipe functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return
    const x = e.touches[0].pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Let scroll snapping handle the positioning naturally
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    // Let scroll snapping handle the positioning naturally
  }

  // Sync scroll position with currentIndex
  useEffect(() => {
    if (!containerRef.current || isDragging) return
    const cardWidth = containerRef.current.scrollWidth / items.length
    containerRef.current.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth'
    })
  }, [currentIndex, items.length, isDragging])

  // Add scroll listener to sync index with manual scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      if (isDragging) return // Don't update during drag
      
      // Debounce the scroll handler to avoid conflicts with snap scrolling
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const cardWidth = container.scrollWidth / items.length
        const scrollPosition = container.scrollLeft
        const newIndex = Math.round(scrollPosition / cardWidth)
        const clampedIndex = Math.max(0, Math.min(newIndex, items.length - 1))
        
        if (clampedIndex !== currentIndex) {
          setCurrentIndex(clampedIndex)
        }
      }, 150) // Wait for scroll to settle
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [currentIndex, items.length, isDragging])

  const currentItem = items[currentIndex]

  return (
    <section id="overview" className="py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] mb-4">{t("overview.title")}</h2>
          <p className="text-[#BFC9DB] text-lg max-w-3xl mx-auto">{t("overview.description")}</p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-xs sm:max-w-lg md:max-w-2xl mx-auto">
          {/* Scrollable Card Display */}
          <div className="overflow-hidden">
            <div 
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
              style={{
                scrollBehavior: isDragging ? 'auto' : 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollSnapType: 'x mandatory',
                scrollSnapStop: 'always',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full max-w-xs sm:max-w-lg md:max-w-2xl"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div
                    className={`relative bg-gradient-to-br ${item.color} border-2 sm:border-3 ${item.border} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden shadow-lg sm:shadow-xl backdrop-blur-sm min-h-[280px] sm:min-h-[320px] flex flex-col mx-2 sm:mx-4`}
                  >
                    <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-gradient-to-br from-white/8 to-transparent rounded-full -translate-y-8 sm:-translate-y-10 md:-translate-y-12 translate-x-8 sm:translate-x-10 md:translate-x-12" />
                    <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-6 sm:translate-y-8 md:translate-y-10 -translate-x-6 sm:-translate-x-8 md:-translate-x-10" />
                    
                    <div className="relative z-10 flex-grow flex flex-col h-full">
                      <item.icon className={`${item.iconColor} mb-4 sm:mb-6 drop-shadow-lg`} size={40} />
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#F7F9FF] mb-3 sm:mb-4 tracking-wide leading-tight">{item.title}</h3>
                      <ul className="space-y-2 sm:space-y-3 flex-grow">
                        {item.lines.map((line, i) => (
                          <li key={i} className="text-[#BFC9DB] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Responsive positioning */}
          <button
            onClick={prevCard}
            className="absolute -left-4 sm:-left-8 md:-left-16 top-1/2 transform -translate-y-1/2 bg-[#00162D]/80 sm:bg-[#00162D] backdrop-blur-sm border border-[#4A5EE7]/30 hover:border-[#4A5EE7]/60 text-[#4A5EE7] hover:text-[#F7F9FF] w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300 z-10 shadow-lg"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5" />
          </button>
          <button
            onClick={nextCard}
            className="absolute -right-4 sm:-right-8 md:-right-16 top-1/2 transform -translate-y-1/2 bg-[#00162D]/80 sm:bg-[#00162D] backdrop-blur-sm border border-[#4A5EE7]/30 hover:border-[#4A5EE7]/60 text-[#4A5EE7] hover:text-[#F7F9FF] w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300 z-10 shadow-lg"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#4A5EE7] scale-125" 
                    : "bg-[#BFC9DB]/30 hover:bg-[#BFC9DB]/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}