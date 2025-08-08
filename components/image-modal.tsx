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
      className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button positioned in top-right corner */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[10000] bg-black bg-opacity-60 rounded-full p-2"
        aria-label="Close image"
      >
        <X size={20} />
      </button>
      
      {/* Image container that prevents click-through */}
      <div 
        className="relative max-w-[85vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={800}
          height={600}
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
    </div>
  )
}