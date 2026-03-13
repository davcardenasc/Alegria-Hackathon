"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { href: "/", label: t("nav.inicio") },
    { href: "/hackaton", label: t("nav.hackaton") },
    { href: "/speakers", label: t("nav.speakers") },
    { href: "/premios", label: t("nav.prizes") },
    { href: "/ideas", label: t("nav.project_ideas") },
    { href: "/contacto", label: t("nav.contact") },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#00162D]/95 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-2 md:py-3" : "py-3 md:py-4"
          }`}>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Image
                src="/images/New Alegria Logo.png?v=2"
                alt="AlegrIA Logo"
                width={120}
                height={40}
                className={`transition-all duration-300 object-contain ${
                  isScrolled
                    ? "w-[100px] h-[32px] md:w-[120px] md:h-[40px]"
                    : "w-[120px] h-[40px] md:w-[140px] md:h-[46px]"
                }`}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6 ml-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[#BFC9DB] hover:text-[#F7F9FF] transition-all duration-300 font-medium whitespace-nowrap ${
                    isScrolled ? "text-sm" : "text-base"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Results Button & Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center gap-3 ml-4">
              <Link
                href="/resultados-2026"
                className="bg-[#4A5EE7] hover:bg-[#3a4ed7] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm whitespace-nowrap"
              >
                {t("nav.results_2026")}
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Tablet Menu */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-3 ml-4">
              {menuItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#BFC9DB] hover:text-[#F7F9FF] transition-all duration-300 text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
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
              className="lg:hidden text-[#F7F9FF] p-2 hover:bg-white/5 rounded-lg transition-colors duration-300 ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[40]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-[#00162D] z-[100] transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-xl font-bold text-[#F7F9FF]">Menú</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#F7F9FF] p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6">
            <div className="flex flex-col space-y-1 px-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-[#BFC9DB] hover:text-[#F7F9FF] hover:bg-white/5 transition-all duration-300 text-left py-3 px-4 rounded-lg text-base font-medium block"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="p-6 border-t border-white/10">
            <Link
              href="/resultados-2026"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-[#4A5EE7] hover:bg-[#3a4ed7] text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 mb-4"
            >
              {t("nav.results_2026")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}
