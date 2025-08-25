// Centralized data management
import { Ambassador, Workshop, Sponsor, Prize, GalleryImage, Testimonial } from '@/types'
import { Crown, Trophy, Medal, Gift, Gem, Sparkles, Star, Award } from 'lucide-react'

// Organizers Data
export const ORGANIZADORES: Ambassador[] = [
  {
    name: "David Cárdenas",
    role: "ambassadors.david.role",
    institution: "Escuela Campo Alegre",
    whatsapp: "+58 412 2226901",
    whatsappMessage: "Hola David, estoy interesado en el hackatón de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-david-cardenas.jpeg",
  },
  {
    name: "Ugo Di Martino",
    role: "ambassadors.ugo.role",
    institution: "Escuela Campo Alegre",
    whatsapp: "+58 424 2572999",
    whatsappMessage: "Hola Ugo, estoy interesado en el hackatón de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-ugo-di-martino.jpg",
  },
]

// Ambassadors Data (now empty - only organizers remain)
export const EMBAJADORES: Ambassador[] = []

// Workshops Data
export const WORKSHOPS: Workshop[] = [
  { name: "ECA – 6to grado", completed: true },
  { name: "ECA – 7mo grado", completed: true },
  { name: "ECA – 8vo grado", completed: true },
  { name: "San Ignacio – CESI", completed: true },
  { name: "British School", completed: false },
  { name: "British School", completed: false },
  { name: "Cristo Rey", completed: false },
  { name: "Cristo Rey", completed: false },
  { name: "Academia Washington", completed: false },
  { name: "Academia Washington", completed: false },
]

// Sponsors Data
export const SPONSORS: Sponsor[] = [
  {
    name: "Slash",
    description: "sponsors.slash_description",
    logo: "/images/slash-logo.png",
    url: "https://www.slash.com",
    confirmed: true,
    tier: "gold",
  },
  {
    name: "Yummy",
    description: "sponsors.yummy_description",
    logo: "/images/yummy-logo.png",
    url: "https://www.yummysuperapp.com/",
    confirmed: true,
    tier: "gold",
  },
  {
    name: "Ribbit Capital",
    description: "sponsors.ribbit_description",
    logo: "/images/Ribbit_Capital logo.png",
    url: "https://www.ribbitcap.com/",
    confirmed: true,
    tier: "gold",
  },
  {
    name: "Corporación Cárdenas",
    description: "sponsors.cardenas_description",
    logo: "/images/corporacion-cardenas-logo.png",
    url: "#",
    confirmed: true,
    tier: "silver",
  },
  {
    name: "Por confirmar",
    description: "Por confirmar",
    logo: null,
    url: "#",
    confirmed: false,
    tier: "bronze",
  },
]

// Backup of unconfirmed sponsors (for future use when confirmed)
export const PENDING_SPONSORS: Sponsor[] = [
  {
    name: "Yummy",
    description: "sponsors.yummy_description",
    logo: "/images/yummy-logo.png",
    url: "https://www.yummy.com.ve",
    confirmed: false,
    tier: "gold",
  },
  {
    name: "Cashea",
    description: "sponsors.cashea_description",
    logo: "/images/cashea-logo.jpg",
    url: "https://www.cashea.com.ve",
    confirmed: false,
    tier: "silver",
  },
  {
    name: "Kontigo",
    description: "sponsors.kontigo_description",
    logo: "/images/kontigo-logo.png",
    url: "https://www.kontigo.io",
    confirmed: false,
    tier: "bronze",
  },
]

// Prizes Data
export const PRIZES: Prize[] = [
  {
    place: "prizes.first_place",
    icon: Crown,
    prize: "prizes.first_prize",
    description: "prizes.first_description",
    bonus: "prizes.first_bonus",
    color: "text-yellow-400",
    bgGradient: "from-yellow-400/20 to-yellow-600/20",
    borderColor: "border-yellow-400/30",
  },
  {
    place: "prizes.second_place",
    icon: Gem,
    prize: "prizes.second_prize",
    description: "prizes.second_description",
    bonus: "prizes.second_bonus",
    color: "text-blue-400",
    bgGradient: "from-blue-400/20 to-blue-600/20",
    borderColor: "border-blue-400/50",
  },
  {
    place: "prizes.third_place",
    icon: Sparkles,
    prize: "prizes.third_prize",
    description: "prizes.third_description",
    bonus: "prizes.third_bonus",
    color: "text-orange-400",
    bgGradient: "from-orange-400/20 to-orange-600/20",
    borderColor: "border-orange-400/50",
  },
  {
    place: "prizes.top5",
    icon: Star,
    prize: "prizes.top5_prize",
    bonus: "prizes.top5_bonus",
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-400/30",
  },
]

// Yummy Sub-Category Prizes Data
export const YUMMY_PRIZES: Prize[] = [
  {
    place: "prizes.yummy_winner",
    icon: Trophy,
    prize: "prizes.yummy_prize",
    description: "prizes.yummy_description",
    bonus: "prizes.yummy_bonus",
    color: "text-green-400",
    bgGradient: "from-green-400/20 to-green-600/20",
    borderColor: "border-green-400/30",
  },
]

// Gallery Images Data
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/6to-1-copy.jpg",
    alt: "Curso de 6to grado – ECA",
    description: "moments.photo1",
  },
  {
    src: "/images/7mo-1-copy.jpeg",
    alt: "Curso de 7mo grado – ECA",
    description: "moments.photo2",
  },
  {
    src: "/images/8vo-1.jpg",
    alt: "Curso de 8vo grado – ECA",
    description: "moments.photo6",
  },
  {
    src: "/images/8vo-3.jpg",
    alt: "Curso de 8vo grado – ECA",
    description: "moments.photo7",
  },
  {
    src: "/images/8vo-4-copy.jpg",
    alt: "Curso de 8vo grado – ECA",
    description: "moments.photo8",
  },
  {
    src: "/images/9san-ignacio-alegria.jpg",
    alt: "Taller en San Ignacio",
    description: "moments.photo9",
  },
  {
    src: "/images/9san-ignacio-alegria-2.png",
    alt: "Workshop interactivo en San Ignacio",
    description: "moments.photo10",
  },
]

// Testimonials Data
export const TESTIMONIALS: Testimonial[] = [
  {
    texto: "moments.testimonial1",
    nombre: "Matias Azpurua",
    colegio: "San Ignacio",
  },
  {
    texto: "moments.testimonial2",
    nombre: "Jesus Rubinetti",
    colegio: "British School",
  },
  {
    texto: "moments.testimonial3",
    nombre: "María González",
    colegio: "Escuela Campo Alegre",
  },
]