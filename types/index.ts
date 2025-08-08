// Core data types for the application

export interface Ambassador {
  name: string
  role: string
  institution: string
  whatsapp: string
  whatsappMessage: string
  image: string
}

export interface Workshop {
  name: string
  completed: boolean
  date?: string
  participants?: number
}

export interface Sponsor {
  name: string
  description: string
  logo: string | null
  url: string
  confirmed: boolean
  tier?: 'gold' | 'silver' | 'bronze'
}

export interface Prize {
  place: string
  icon: any // LucideIcon type
  prize: string
  bonus: string
  color: string
  bgGradient: string
  borderColor: string
}

export interface GalleryImage {
  src: string
  alt: string
  description: string
}

export interface Testimonial {
  texto: string
  nombre: string
  colegio: string
}

export interface Speaker {
  name: string
  title: string
  company: string
  image: string
  bio: string
  social?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface FormData {
  tipo: 'participantes' | 'colegios'
  numero_participantes?: string
  participantes?: string[]
  nombre_colegio?: string
  nombre_contacto?: string
  email_contacto?: string
  telefono_contacto?: string
  mensaje?: string
}

export interface APIResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface EmailTemplate {
  subject: string
  html: string
  to: string
  from: string
  attachments?: Array<{
    filename: string
    content: string
    type: string
  }>
}

// UI Component Props
export interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'bordered'
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

// Language types
export type Language = 'es' | 'en'
export type TranslationKey = string
export type TranslationFunction = (key: TranslationKey) => string