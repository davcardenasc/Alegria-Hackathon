// Centralized data management
import { Ambassador, Workshop, Sponsor, Prize, GalleryImage, Testimonial } from '@/types'
import { Crown, Trophy, Medal, Gift, Gem, Sparkles, Star } from 'lucide-react'

// Organizers Data
export const ORGANIZADORES: Ambassador[] = [
  {
    name: "David Cárdenas",
    role: "ambassadors.david.role",
    institution: "Escuela Campo Alegre",
    whatsapp: "+58 412 2226901",
    whatsappMessage: "Hola David, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-david-cardenas.jpeg",
  },
  {
    name: "Ugo Di Martino",
    role: "ambassadors.ugo.role",
    institution: "Escuela Campo Alegre",
    whatsapp: "+58 424 2572999",
    whatsappMessage: "Hola Ugo, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-ugo-di-martino.jpg",
  },
]

// Ambassadors Data
export const EMBAJADORES: Ambassador[] = [
  {
    name: "José Núñez",
    role: "",
    institution: "San Ignacio",
    whatsapp: "+58 412 2378192",
    whatsappMessage: "Hola José, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-jose-nunez.jpeg",
  },
  {
    name: "Nicolás Lapadula",
    role: "",
    institution: "Colegio Ávila",
    whatsapp: "+58 412 2719711",
    whatsappMessage: "Hola Nicolás, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-nicolas-lapadula-new.png",
  },
  {
    name: "Augusto Mini",
    role: "",
    institution: "British School of Caracas",
    whatsapp: "+58 424 1368923",
    whatsappMessage: "Hola Augusto, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-augusto-mini.png",
  },
  {
    name: "Manuel Marín",
    role: "",
    institution: "Academia Washington",
    whatsapp: "+58 412 2407168",
    whatsappMessage: "Hola Manuel, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-manuel-marin.png",
  },
  {
    name: "Mariana Banchs",
    role: "",
    institution: "Cristo Rey",
    whatsapp: "+58 424 1248997",
    whatsappMessage: "Hola Mariana, estoy interesada en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-mariana-banchs.png",
  },
  {
    name: "Bernardo Pérez",
    role: "",
    institution: "Escuela Campo Alegre",
    whatsapp: "+58 414 3168157",
    whatsappMessage: "Hola Bernardo, estoy interesado en el hackathon de AlegrIA! Me gustaría obtener más información.",
    image: "/images/embajador-bernardo-perez.png",
  },
]

// Workshops Data
export const WORKSHOPS: Workshop[] = [
  { name: "ECA – 6to grado", completed: true },
  { name: "ECA – 7mo grado", completed: true },
  { name: "ECA – 8vo grado", completed: true },
  { name: "San Ignacio – 9no grado", completed: true },
  { name: "British School – 8vo grado", completed: false },
  { name: "British School – 9no grado", completed: false },
  { name: "San Patricio – 8vo grado", completed: false },
  { name: "San Patricio – 9no grado", completed: false },
  { name: "Colegio San Agustín – 8vo grado", completed: false },
  { name: "Colegio San Agustín – 9no grado", completed: false },
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
    name: "Corporación Cárdenas",
    description: "sponsors.cardenas_description",
    logo: "/images/corporacion-cardenas-logo.png",
    url: "https://www.corporacioncardenas.com",
    confirmed: true,
    tier: "gold",
  },
  {
    name: "Por confirmar",
    description: "Por confirmar",
    logo: null,
    url: "#",
    confirmed: false,
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
    place: "🏆 1er lugar",
    icon: Crown,
    prize: "$1k por persona o Macbook Air M4 ($4k)",
    bonus: "+ Pasantía en Cashea/Yummy",
    color: "text-yellow-400",
    bgGradient: "from-yellow-400/20 to-yellow-600/20",
    borderColor: "border-yellow-400/30",
  },
  {
    place: "🥈 2do lugar",
    icon: Gem,
    prize: "$500 por persona",
    bonus: "+ 1 año Suscripción Platzi",
    color: "text-blue-400",
    bgGradient: "from-blue-400/30 to-blue-400/30",
    borderColor: "border-blue-400/50",
  },
  {
    place: "🥉 3er lugar",
    icon: Sparkles,
    prize: "$250 por persona",
    bonus: "+ $250 créditos de OpenAI",
    color: "text-orange-400",
    bgGradient: "from-orange-400/30 to-orange-400/30",
    borderColor: "border-orange-400/50",
  },
  {
    place: "⭐ Top 5 finalistas",
    icon: Star,
    prize: "3 meses de Lovable Pro",
    bonus: "+ Certificado de participación",
    color: "text-purple-400",
    bgGradient: "from-purple-400/20 to-purple-600/20",
    borderColor: "border-purple-400/30",
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
    src: "/images/7mo-3-copy.jpg",
    alt: "Curso de 7mo grado – ECA",
    description: "moments.photo3",
  },
  {
    src: "/images/7mo-6-copy.jpg",
    alt: "Curso de 7mo grado – ECA",
    description: "moments.photo4",
  },
  {
    src: "/images/7mo-8-copy.jpg",
    alt: "Curso de 7mo grado – ECA",
    description: "moments.photo5",
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