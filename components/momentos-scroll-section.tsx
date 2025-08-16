"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronRight, ChevronLeft } from 'lucide-react'
import ImageModal from "./image-modal"
import { useLanguage } from "@/contexts/LanguageContext"
import { GALLERY_IMAGES } from '@/lib/data'

export default function MomentosScrollSection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  // Updated gallery with translated descriptions
  const galeria = GALLERY_IMAGES.map(img => ({
    ...img,
    description: t(img.description)
  }))

  // Preload images when component mounts
  useEffect(() => {
    const preloadImages = async () => {
      // Check if we're in the browser
      if (typeof window === "undefined") {
        setImagesLoaded(true)
        return
      }

      const imagePromises = galeria.map((imagen) => {
        return new Promise<void>((resolve) => {
          if (typeof window !== "undefined" && "Image" in window) {
            const img = new window.Image()
            img.onload = () => resolve()
            img.onerror = () => {
              // Failed to load image, resolve anyway to not block other images
              resolve()
            }
            img.src = imagen.src
          } else {
            resolve()
          }
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        // Error preloading images, show anyway
        setImagesLoaded(true)
      }
    }

    // Add a small delay to ensure component is mounted
    const timer = setTimeout(() => {
      preloadImages()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Duplicate the array to create seamless infinite scroll (Optimized to 2x)
  const duplicatedGaleria = [...galeria, ...galeria]

  const handleImageClick = (imagen: { src: string; alt: string }) => {
    setSelectedImage(imagen)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      })
    }
  }

  const scrollToPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="momentos-galeria" className="py-8 overflow-hidden" onWheel={(e) => e.stopPropagation()}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-4 mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-[#F7F9FF] text-center">{t("moments.title")}</h2>
        <p className="text-[#BFC9DB] text-center mt-4 max-w-2xl mx-auto">{t("moments.description")}</p>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#00162D] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#00162D] to-transparent z-10 pointer-events-none" />

        {/* Left Control button */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={scrollToPrev}
            className="bg-[#4A5EE7]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#4A5EE7] transition-colors duration-300 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Control button */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={scrollToNext}
            className="bg-[#4A5EE7]/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-[#4A5EE7] transition-colors duration-300 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scrolling content - Responsive sizing */}
        <div
          ref={scrollContainerRef}
          className={`flex overflow-x-auto scrollbar-hide transition-opacity duration-500 ${
            imagesLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {duplicatedGaleria.map((imagen, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-3 group cursor-pointer w-[280px] h-[200px] sm:w-[320px] sm:h-[240px] md:w-[360px] md:h-[270px] lg:w-[400px] lg:h-[300px] xl:w-[450px] xl:h-[340px]"
              onClick={() => handleImageClick(imagen)}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_#4A5EE7/30] transition-all duration-300 hover:scale-105">
                <Image
                  src={imagen.src || "/placeholder.svg"}
                  alt={imagen.alt}
                  fill
                  className="object-cover group-hover:brightness-110 transition-all duration-300"
                  priority={index < 6} // Priority for first few images
                />

                {/* Overlay with description */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium leading-tight">{imagen.description}</p>
                    <p className="text-white/70 text-xs mt-1">{t("moments.click_to_expand")}</p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading placeholder */}
        {!imagesLoaded && (
          <div className="flex justify-center items-center h-[200px]">
            <div className="text-[#BFC9DB]">{t("moments.loading")}</div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src || "/placeholder.svg"}
          alt={selectedImage.alt}
          isOpen={!!selectedImage}
          onClose={closeModal}
        />
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
