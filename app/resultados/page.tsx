"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, ArrowUpDown, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import GlobalBackground from "@/components/global-background"

// Real team data from hackathon applications
const teams = [
  {
    id: 1,
    name: "Uptly",
    idea: "Herramienta para automatizar pagos, cobros y facturación.",
    videoUrl: "https://www.youtube.com/watch?v=49EKqN6jlJs"
  },
  {
    id: 2,
    name: "Aftercode",
    idea: "Asistente de IA que organiza planes y salidas con amigos.",
    videoUrl: "https://www.youtube.com/watch?v=1caUPcRYpVE"
  },
  {
    id: 3,
    name: "ApokAI",
    idea: "Plataforma para crear y coordinar eventos de forma inteligente.",
    videoUrl: "https://youtu.be/f1UcRIABwQs"
  },
  {
    id: 4,
    name: "AndaYa",
    idea: "App para alquilar vehículos entre usuarios de manera segura.",
    videoUrl: "https://youtu.be/bcB_m-0Y5yY"
  },
  {
    id: 5,
    name: "Data Geeks",
    idea: "Agente de IA que analiza métricas y responde preguntas de negocio.",
    videoUrl: "https://youtu.be/D2jZGaEkChE"
  },
  {
    id: 6,
    name: "Tech Grows",
    idea: "Directorio digital que impulsa el turismo y los emprendimientos locales.",
    videoUrl: "https://youtu.be/9myG9qirTcw"
  },
  {
    id: 7,
    name: "Yelou Team",
    idea: "Plataforma que conecta profesionales con oportunidades de trabajo.",
    videoUrl: "https://youtu.be/fHCRY_-SgR8?si=Fe58c079qcTKr2-K"
  },
  {
    id: 8,
    name: "Los Jaegeristas",
    idea: "App para organizar y compartir eventos sociales en grupo.",
    videoUrl: "https://youtu.be/LSU7ZkE_kKs"
  },
  {
    id: 9,
    name: "TheCodeFather",
    idea: "Plataforma que conecta desarrolladores con empresas y proyectos.",
    videoUrl: "https://youtube.com/shorts/MKrHUULvl2s"
  },
  {
    id: 10,
    name: "Los Leonardos",
    idea: "App que ayuda a familias a planificar comidas económicas y nutritivas.",
    videoUrl: "https://www.youtube.com/shorts/UJ0yOgAJTVk"
  },
  {
    id: 11,
    name: "Rocket",
    idea: "Proyecto educativo que facilita el acceso a contenido digital de calidad.",
    videoUrl: "https://youtube.com/shorts/-Cw7igmUZpo?si=B0YhXRQNni_pWdLk"
  },
  {
    id: 12,
    name: "Blink Smart Solutions",
    idea: "Tecnología agrícola para mejorar la productividad del campo.",
    videoUrl: "https://youtu.be/ExgaQVUXWY8"
  },
  {
    id: 13,
    name: "UCABestias",
    idea: "App que diseña espacios interiores usando solo una fotografía.",
    videoUrl: "https://www.youtube.com/watch?v=Y3hdwpvtkKU"
  },
  {
    id: 14,
    name: "AboApp",
    idea: "Plataforma que conecta abogados con personas que necesitan asesoría legal.",
    videoUrl: "https://www.youtube.com/watch?v=RVyuPbzc9zk"
  },
  {
    id: 15,
    name: "PayPal Mafia",
    idea: "Solución para digitalizar y organizar documentos legales.",
    videoUrl: "https://www.youtube.com/watch?v=qvj8BG_OyCk"
  },
  {
    id: 16,
    name: "Bridges",
    idea: "Software que conecta agricultores con supermercados.",
    videoUrl: "https://youtu.be/0-qIyzOkg7E"
  },
  {
    id: 17,
    name: "Los Resolvers de Cristo",
    idea: "Plataforma que conecta usuarios con prestadores de servicios locales.",
    videoUrl: "https://youtube.com/shorts/YNyaw4Ng_xQ?si=fhuTx_DAMBvuF5fx"
  },
  {
    id: 18,
    name: "Innocodi",
    idea: "App que permite agendar citas médicas y encontrar doctores fácilmente.",
    videoUrl: "https://youtube.com/shorts/tFEJrq-roPo?feature=share"
  },
  {
    id: 19,
    name: "Equipo Stop",
    idea: "Aplicación para rastrear autobuses y optimizar el transporte público.",
    videoUrl: "https://www.youtube.com/watch?v=I3CTgzu_Jrc"
  },
  {
    id: 20,
    name: "CheetAi",
    idea: "Plataforma que conecta viajeros con alojamientos en toda Venezuela.",
    videoUrl: "https://youtube.com/shorts/o2IhI2kFjlE"
  },
  {
    id: 21,
    name: "Escuadrón Geek",
    idea: "App con IA que mejora el transporte público y planifica rutas.",
    videoUrl: "https://youtu.be/sLQpnvifKXw"
  },
  {
    id: 22,
    name: "Cuídate App",
    idea: "Plataforma digital que ofrece seguros rápidos y accesibles.",
    videoUrl: "https://youtube.com/shorts/lJR4857HVAI?feature=share"
  },
  {
    id: 23,
    name: "Null Pointers",
    idea: "Aplicación para subastar y vender productos fácilmente.",
    videoUrl: "https://youtube.com/shorts/BwmhklKlj7Y"
  },
  {
    id: 24,
    name: "KOSMOS",
    idea: "App para rastrear autobuses y optimizar la movilidad urbana.",
    videoUrl: "https://youtube.com/shorts/WfALwXM6x2k?si=vfnTmDZKyfYyofCr"
  }
]

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

// Team Card Component
function TeamCard({ team }: { team: typeof teams[0] }) {
  const videoId = getYouTubeVideoId(team.videoUrl)
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null

  return (
    <Card className="bg-[#00162D]/80 border border-[#4A5EE7]/30 hover:border-[#4A5EE7]/50 transition-all duration-300">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-[#F7F9FF] mb-3">{team.name}</h3>
        <p className="text-[#BFC9DB] mb-4 line-clamp-3">{team.idea}</p>
        
        {thumbnailUrl && (
          <div className="mb-4">
            <a 
              href={team.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative group"
            >
              <img 
                src={thumbnailUrl} 
                alt={`Video de ${team.name}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </a>
          </div>
        )}
        
        <a 
          href={team.videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#4A5EE7]/80 transition-colors duration-300"
        >
          <ExternalLink size={16} />
          Ver Video Presentación
        </a>
      </CardContent>
    </Card>
  )
}

export default function ResultadosPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAlphabetical, setIsAlphabetical] = useState(false)
  const teamsPerPage = 6

  // Filter and sort teams based on search term and alphabetical order
  let filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.idea.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isAlphabetical) {
    filteredTeams = [...filteredTeams].sort((a, b) => 
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    )
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage)
  const startIndex = (currentPage - 1) * teamsPerPage
  const endIndex = startIndex + teamsPerPage
  const currentTeams = filteredTeams.slice(startIndex, endIndex)

  // Reset to first page when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  // Toggle alphabetical order and reset to first page
  const toggleAlphabetical = () => {
    setIsAlphabetical(!isAlphabetical)
    setCurrentPage(1)
  }

  return (
    <>
      <GlobalBackground />
      <div className="min-h-screen text-white py-20 relative z-10">
        <div className="container mx-auto px-6 sm:px-8 lg:px-4 max-w-7xl">
          {/* Header */}
          <div className="relative text-center mb-12">
            {/* Back to Landing Button - positioned at same level as title */}
            <Link 
              href="/"
              className="absolute left-0 top-0 inline-flex items-center gap-2 bg-[#4A5EE7]/20 hover:bg-[#4A5EE7]/30 border border-[#4A5EE7]/50 hover:border-[#4A5EE7] text-[#F7F9FF] px-4 py-2 rounded-lg transition-all duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Volver al Inicio
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-[#F7F9FF] mb-4">
              Equipos Seleccionados
            </h1>
            <p className="text-xl text-[#BFC9DB] mb-8">
              Conoce a los 24 equipos que competirán en el Hackatón de AlegrIA
            </p>
            
            {/* Search Bar and Filters */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BFC9DB]" size={20} />
              <Input
                type="text"
                placeholder="Buscar equipos o ideas..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-[#00162D]/80 border-[#4A5EE7]/30 text-[#F7F9FF] placeholder:text-[#BFC9DB] focus:border-[#4A5EE7]"
              />
            </div>
            
            {/* Alphabetical Sort Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={toggleAlphabetical}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isAlphabetical
                    ? 'bg-[#4A5EE7] text-white'
                    : 'bg-[#00162D]/80 text-[#BFC9DB] hover:bg-[#4A5EE7]/20'
                }`}
              >
                <ArrowUpDown size={16} />
                Orden alfabético
              </button>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>

          {/* No results message */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-[#BFC9DB]">
                No se encontraron equipos que coincidan con tu búsqueda.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredTeams.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#4A5EE7] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A5EE7]/80 transition-colors"
              >
                Anterior
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-[#4A5EE7] text-white'
                        : 'bg-[#00162D]/80 text-[#BFC9DB] hover:bg-[#4A5EE7]/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#4A5EE7] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A5EE7]/80 transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
          
          {/* Results count */}
          <div className="text-center">
            <p className="text-[#BFC9DB]">
              Mostrando {currentTeams.length} de {filteredTeams.length} equipos
              {searchTerm && ` (filtrados de ${teams.length} total)`}
            </p>
            {totalPages > 1 && (
              <p className="text-[#BFC9DB] mt-2">
                Página {currentPage} de {totalPages}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}