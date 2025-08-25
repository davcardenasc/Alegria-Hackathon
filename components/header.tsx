"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, ChevronDown } from 'lucide-react'
import { useRouter, usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "./language-switcher"

/**
 * Header component for the AlegrIA Hackathon landing page
 * 
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - Dynamic styling based on scroll position and hero section visibility
 * - Multi-language support with dropdown menus
 * - Smooth scrolling navigation to page sections
 * - Dropdown menus for Applications, Schedule, and Prizes
 * 
 * The header changes its appearance based on:
 * - Scroll position (transparent -> solid background)
 * - Whether user is in hero section (affects styling)
 * - Current page route (different behavior on home vs other pages)
 * - Window width (responsive mobile/desktop layouts)
 * 
 * @component
 * @example
 * ```tsx
 * // Used in main layout
 * import Header from "@/components/header"
 * 
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <Header />
 *       <main>{children}</main>
 *     </>
 *   )
 * }
 * ```
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInHero, setIsInHero] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCronogramaOpen, setIsCronogramaOpen] = useState(false)
  const [isAplicacionesOpen, setIsAplicacionesOpen] = useState(false)
  const [isPremiosOpen, setIsPremiosOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  const router = useRouter()
  const pathname = usePathname()

  const { t } = useLanguage()

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Check if we're still in the hero section (only on home page)
      if (pathname === "/") {
        const heroSection = document.querySelector("#mision")
        if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect()
          setIsInHero(heroRect.bottom > 100) // 100px buffer
        }
      } else {
        setIsInHero(false) // Always show styled header on other pages
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [pathname])

  const menuItems = [
    {
      href: "/#conferencia",
      label: t("nav.conference"),
      isDropdown: true,
      dropdownItems: [
        { href: "/#mision", label: t("nav.mission") },
        { href: "/#overview", label: t("nav.overview") },
        { href: "/#momentos-galeria", label: t("nav.moments") },
        { href: "/#cronograma", label: t("nav.schedule") },
        { href: "/speakers", label: t("nav.speakers") },
      ],
    },
    {
      href: "/#premios-menu",
      label: t("nav.prizes"),
      isDropdown: true,
      dropdownItems: [
        { href: "/#premios", label: t("nav.main_prizes") },
        { href: "/#premios-yummy", label: t("nav.yummy_prizes") },
        { href: "/#patrocinadores", label: t("nav.sponsors") },
      ],
    },
    {
      href: "/#aplicaciones-menu",
      label: t("nav.applications"),
      isDropdown: true,
      dropdownItems: [
        { href: "https://formulario.alegriahackaton.com/", label: t("nav.student_application"), external: true },
        { href: "/formulario-colegios", label: t("nav.school_application") },
        { href: "/ideas", label: t("nav.project_ideas") },
      ],
    },
    { href: "/#workshops", label: t("nav.workshops") },
    { href: "/#embajadores", label: t("nav.ambassadors") },
    { href: "/#faq", label: t("nav.faq") },
    { href: "/#contacto", label: t("nav.contact") },
  ]

  const handleMenuClick = (href: string) => {
    setIsMobileMenuOpen(false)
    setIsCronogramaOpen(false)
    setIsAplicacionesOpen(false)
    setIsPremiosOpen(false)

    // Check if it's an external URL
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }

    if (!href.includes("#")) {
      // Page navigation without hash
      router.push(href)
    } else if (href.startsWith("/") && href.includes("#")) {
      // Navigation with hash
      const [path, hash] = href.split("#")

      if (pathname === path || (pathname === "/" && path === "/")) {
        // Same page, just scroll
        const element = document.querySelector(`#${hash}`)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        // Different page, navigate then scroll
        router.push(href)
      }
    } else if (href.startsWith("#")) {
      // Just a hash on current page
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleDropdownClick = (item: any) => {
    if (item.isDropdown) {
      if (item.href === "/#conferencia") {
        setIsCronogramaOpen(!isCronogramaOpen)
        setIsAplicacionesOpen(false)
        setIsPremiosOpen(false)
      } else if (item.href === "/#premios-menu") {
        setIsPremiosOpen(!isPremiosOpen)
        setIsCronogramaOpen(false)
        setIsAplicacionesOpen(false)
      } else if (item.href === "/#aplicaciones-menu") {
        setIsAplicacionesOpen(!isAplicacionesOpen)
        setIsCronogramaOpen(false)
        setIsPremiosOpen(false)
      }
    } else {
      handleMenuClick(item.href)
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isInHero
            ? isScrolled
              ? "bg-[#00162D]/95 backdrop-blur-lg shadow-[0_8px_32px_rgba(74,94,231,0.15)] border-b border-[#4A5EE7]/20"
              : "bg-transparent"
            : "bg-[#00162D]/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(74,94,231,0.3)] border-b border-[#4A5EE7]/30"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled || !isInHero ? "py-2 md:py-3" : "py-3 md:py-4"
            }`}
          >
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer flex-shrink-0"
            >
              <div className="relative">
                <Image
                  src="/images/New Alegria Logo.png?v=2"
                  alt="AlegrIA Logo"
                  width={120}
                  height={40}
                  className={`transition-all duration-300 object-contain ${
                    isScrolled || !isInHero
                      ? "w-[100px] h-[32px] md:w-[120px] md:h-[40px]"
                      : "w-[120px] h-[40px] md:w-[140px] md:h-[46px]"
                  }`}
                  priority
                />
              </div>
            </button>

            {/* Desktop Menu - Hidden on smaller screens, with more spacing */}
            <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6 ml-8">
              {menuItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.isDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => handleDropdownClick(item)}
                        className={`text-[#BFC9DB] hover:text-[#F7F9FF] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(74,94,231,0.6)] font-medium flex items-center gap-1 whitespace-nowrap ${
                          isScrolled || !isInHero ? "text-sm" : "text-base"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            (item.href === "/#conferencia" && isCronogramaOpen) ||
                            (item.href === "/#premios-menu" && isPremiosOpen) ||
                            (item.href === "/#aplicaciones-menu" && isAplicacionesOpen)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {((item.href === "/#conferencia" && isCronogramaOpen) ||
                        (item.href === "/#premios-menu" && isPremiosOpen) ||
                        (item.href === "/#aplicaciones-menu" && isAplicacionesOpen)) && (
                        <div className="absolute top-full left-0 mt-2 bg-[#00162D]/95 backdrop-blur-lg border border-[#4A5EE7]/20 rounded-lg shadow-lg min-w-[180px] z-50">
                          {item.dropdownItems?.map((dropdownItem: any) => (
                            <button
                              key={dropdownItem.href}
                              onClick={() => handleMenuClick(dropdownItem.href)}
                              className="block w-full text-left px-4 py-3 text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            >
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMenuClick(item.href)}
                      className={`text-[#BFC9DB] hover:text-[#F7F9FF] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(74,94,231,0.6)] font-medium whitespace-nowrap ${
                        isScrolled || !isInHero ? "text-sm" : "text-base"
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Results Button & Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              <button
                onClick={() => handleMenuClick("/resultados")}
                className="bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                {t("nav.results")}
              </button>
              <LanguageSwitcher />
            </div>

            {/* Tablet Menu - Simplified version */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-3 ml-4">
              {menuItems.slice(0, 4).map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleMenuClick(item.href)}
                  className="text-[#BFC9DB] hover:text-[#F7F9FF] transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  {item.label.replace("Cronograma", "Conf.")}
                </button>
              ))}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors duration-300 ml-2"
              >
                <Menu size={20} />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#F7F9FF] p-2 hover:bg-[#4A5EE7]/10 rounded-lg transition-colors duration-300 ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {(isMobileMenuOpen || isCronogramaOpen || isAplicacionesOpen || isPremiosOpen) && (
        <div
          className="fixed inset-0 bg-black/50 z-[40]"
          onClick={() => {
            setIsMobileMenuOpen(false)
            setIsCronogramaOpen(false)
            setIsAplicacionesOpen(false)
            setIsPremiosOpen(false)
          }}
        />
      )}

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#00162D]/98 backdrop-blur-xl z-[100] transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 sm:p-6 border-b border-[#4A5EE7]/20">
            <span className="text-xl font-bold text-[#F7F9FF]">Menú</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F7F9FF] p-2 hover:bg-[#4A5EE7]/10 rounded-lg transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col space-y-1 px-6 sm:px-6">
              {(windowWidth < 1024 ? menuItems : windowWidth < 1280 ? menuItems.slice(4) : menuItems).map(
                (item, index) => (
                  <div key={item.href}>
                    {item.isDropdown ? (
                      <>
                        <button
                          onClick={() => {
                            if (item.href === "/#conferencia") {
                              setIsCronogramaOpen(!isCronogramaOpen)
                              setIsAplicacionesOpen(false)
                              setIsPremiosOpen(false)
                            } else if (item.href === "/#premios-menu") {
                              setIsPremiosOpen(!isPremiosOpen)
                              setIsCronogramaOpen(false)
                              setIsAplicacionesOpen(false)
                            } else if (item.href === "/#aplicaciones-menu") {
                              setIsAplicacionesOpen(!isAplicacionesOpen)
                              setIsCronogramaOpen(false)
                              setIsPremiosOpen(false)
                            }
                          }}
                          className="w-full text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10 transition-all duration-300 text-left py-3 px-4 rounded-lg text-base font-medium flex items-center justify-between"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              (item.href === "/#conferencia" && isCronogramaOpen) ||
                              (item.href === "/#premios-menu" && isPremiosOpen) ||
                              (item.href === "/#aplicaciones-menu" && isAplicacionesOpen)
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {((item.href === "/#conferencia" && isCronogramaOpen) ||
                          (item.href === "/#premios-menu" && isPremiosOpen) ||
                          (item.href === "/#aplicaciones-menu" && isAplicacionesOpen)) &&
                          item.dropdownItems && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.dropdownItems.map((dropdownItem: any) => (
                                <button
                                  key={dropdownItem.href}
                                  onClick={() => handleMenuClick(dropdownItem.href)}
                                  className="w-full text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10 transition-all duration-300 text-left py-2 px-4 rounded-lg text-sm"
                                >
                                  {dropdownItem.label}
                                </button>
                              ))}
                            </div>
                          )}
                      </>
                    ) : (
                      <button
                        onClick={() => handleMenuClick(item.href)}
                        className="w-full text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-[#4A5EE7]/10 transition-all duration-300 text-left py-3 px-4 rounded-lg text-base font-medium"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ),
              )}
            </div>
          </nav>

          {/* Results Button & Language Switcher - Mobile */}
          <div className="px-6 pb-4 border-b border-[#4A5EE7]/20">
            <button
              onClick={() => handleMenuClick("/resultados")}
              className="w-full bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 mb-4"
            >
              {t("nav.results")}
            </button>
            <LanguageSwitcher />
          </div>

          {/* CTA at bottom */}
          <div className="p-6 sm:p-6 border-t border-[#4A5EE7]/20">
            <button
              onClick={() => handleMenuClick("https://formulario.alegriahackaton.com/")}
              className="w-full bg-gradient-to-r from-[#4A5EE7] to-[#BFC9DB] hover:from-[#4A5EE7]/80 hover:to-[#BFC9DB]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {t("nav.apply")}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
