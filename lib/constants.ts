// Shared constants and styling patterns

// UI Styling Constants
export const STYLES = {
  card: {
    default: "bg-[#00162D] border border-[#4A5EE7]/20 rounded-lg p-6 hover:border-[#4A5EE7]/40 transition-all duration-300",
    glass: "bg-[#00162D]/90 backdrop-blur-sm border border-[#4A5EE7]/30 rounded-lg p-6",
    bordered: "bg-transparent border border-[#4A5EE7]/40 rounded-lg p-6 hover:bg-[#00162D]/50 transition-all duration-300",
  },
  button: {
    primary: "bg-[#4A5EE7] hover:bg-[#4A5EE7]/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300",
    secondary: "bg-transparent border border-[#4A5EE7] text-[#4A5EE7] hover:bg-[#4A5EE7] hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300",
    outline: "bg-transparent border border-[#BFC9DB] text-[#BFC9DB] hover:bg-[#BFC9DB] hover:text-[#00162D] font-semibold py-2 px-4 rounded-lg transition-all duration-300",
  },
  text: {
    primary: "text-[#F7F9FF]",
    secondary: "text-[#BFC9DB]",
    accent: "text-[#4A5EE7]",
    muted: "text-[#BFC9DB]/70",
  }
} as const

// Color Palette
export const COLORS = {
  primary: '#4A5EE7',
  secondary: '#BFC9DB',
  dark: '#00162D',
  light: '#F7F9FF',
  muted: '#BFC9DB',
  accent: '#4A5EE7',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
} as const

// Animation Constants
export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  float: 'animate-float',
  scrollLeft: 'animate-scroll-left',
} as const

// Responsive Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// File Upload Constants
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.pdf'],
} as const

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  required: 'Este campo es obligatorio',
  email: 'Por favor ingresa un email válido',
  fileSize: 'El archivo es demasiado grande. Máximo 5MB',
  fileType: 'Tipo de archivo no permitido',
  phone: 'Por favor ingresa un número de teléfono válido',
} as const

// API Constants
export const API_ROUTES = {
  sendApplication: '/api/send-application',
  sendSchoolApplication: '/api/send-school-application',
} as const

// Social Media Patterns
export const SOCIAL_PATTERNS = {
  whatsapp: /^(\+|00)[1-9]\d{8,14}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+?58)?[- ]?(\(?0?4\d{2}\)?)[- ]?\d{3}[- ]?\d{4}$/,
} as const