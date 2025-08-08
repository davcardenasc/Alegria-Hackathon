"use client"
import Image from "next/image"
import { X } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div className="relative">
        {/* Close button positioned above the image container */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-[10000] bg-black bg-opacity-60 rounded-full p-2"
          aria-label="Close image"
        >
          <X size={20} />
        </button>
        
        {/* Image container that prevents click-through */}
        <div 
          className="relative bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={800}
            height={600}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  )
}
