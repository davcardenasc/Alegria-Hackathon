"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Medal, Award, Star, ArrowRight, Users, Clock, DollarSign, Zap, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const teams = [
  { name: "Uptly", project: "Automatización de pagos y cobros", description: "Herramienta para automatizar pagos, cobros y facturación.", video: "https://www.youtube.com/watch?v=49EKqN6jlJs" },
  { name: "Aftercode", project: "Organizador de planes sociales", description: "Asistente de IA que organiza planes y salidas con amigos.", video: "https://www.youtube.com/watch?v=1caUPcRYpVE" },
  { name: "ApokAI", project: "Coordinación inteligente de eventos", description: "Plataforma para crear y coordinar eventos de forma inteligente.", video: "https://youtu.be/f1UcRIABwQs" },
  { name: "AndaYa", project: "Alquiler de vehículos entre usuarios", description: "App para alquilar vehículos entre usuarios de manera segura.", video: "https://youtu.be/bcB_m-0Y5yY" },
  { name: "Data Geeks", project: "Analítica de negocio con IA", description: "Agente de IA que analiza métricas y responde preguntas de negocio.", video: "https://youtu.be/D2jZGaEkChE" },
  { name: "Tech Grows", project: "Turismo y emprendimiento local", description: "Directorio digital que impulsa el turismo y los emprendimientos locales.", video: "https://youtu.be/9myG9qirTcw" },
  { name: "Yelou Team", project: "Conexión profesional laboral", description: "Plataforma que conecta profesionales con oportunidades de trabajo.", video: "https://youtu.be/fHCRY_-SgR8" },
  { name: "Los Jaegeristas", project: "Organización de eventos sociales", description: "App para organizar y compartir eventos sociales en grupo.", video: "https://youtu.be/LSU7ZkE_kKs" },
  { name: "TheCodeFather", project: "Marketplace para desarrolladores", description: "Plataforma que conecta desarrolladores con empresas y proyectos.", video: "https://youtube.com/shorts/MKrHUULvl2s" },
  { name: "Los Leonardos", project: "Planificación de comidas económicas", description: "App que ayuda a familias a planificar comidas económicas y nutritivas.", video: "https://www.youtube.com/shorts/UJ0yOgAJTVk" },
  { name: "Rocket", project: "Acceso a contenido educativo digital", description: "Proyecto educativo que facilita el acceso a contenido digital de calidad.", video: "https://youtube.com/shorts/-Cw7igmUZpo" },
  { name: "Blink Smart Solutions", project: "Tecnología agrícola", description: "Tecnología agrícola para mejorar la productividad del campo.", video: "https://youtu.be/ExgaQVUXWY8" },
  { name: "UCABestias", project: "Diseño de interiores con IA", description: "App que diseña espacios interiores usando solo una fotografía.", video: "https://www.youtube.com/watch?v=Y3hdwpvtkKU" },
  { name: "AboApp", project: "Asesoría legal accesible", description: "Plataforma que conecta abogados con personas que necesitan asesoría legal.", video: "https://www.youtube.com/watch?v=RVyuPbzc9zk" },
  { name: "PayPal Mafia", project: "Digitalización de documentos legales", description: "Solución para digitalizar y organizar documentos legales.", video: "https://www.youtube.com/watch?v=qvj8BG_OyCk" },
  { name: "Bridges", project: "Agricultores y supermercados", description: "Software que conecta agricultores con supermercados.", video: "https://youtu.be/0-qIyzOkg7E" },
  { name: "Los Resolvers de Cristo", project: "Servicios locales on-demand", description: "Plataforma que conecta usuarios con prestadores de servicios locales.", video: "https://youtube.com/shorts/YNyaw4Ng_xQ" },
  { name: "Innocodi", project: "Citas médicas digitales", description: "App que permite agendar citas médicas y encontrar doctores fácilmente.", video: "https://youtube.com/shorts/tFEJrq-roPo" },
  { name: "Equipo Stop", project: "Rastreo de transporte público", description: "Aplicación para rastrear autobuses y optimizar el transporte público.", video: "https://www.youtube.com/watch?v=I3CTgzu_Jrc" },
  { name: "CheetAi", project: "Alojamientos en Venezuela", description: "Plataforma que conecta viajeros con alojamientos en toda Venezuela.", video: "https://youtube.com/shorts/o2IhI2kFjlE" },
  { name: "Escuadrón Geek", project: "Rutas de transporte con IA", description: "App con IA que mejora el transporte público y planifica rutas.", video: "https://youtu.be/sLQpnvifKXw" },
  { name: "Cuídate App", project: "Seguros rápidos y accesibles", description: "Plataforma digital que ofrece seguros rápidos y accesibles.", video: "https://youtube.com/shorts/lJR4857HVAI" },
  { name: "Null Pointers", project: "Subastas y ventas digitales", description: "Aplicación para subastar y vender productos fácilmente.", video: "https://youtube.com/shorts/BwmhklKlj7Y" },
  { name: "KOSMOS", project: "Movilidad urbana inteligente", description: "App para rastrear autobuses y optimizar la movilidad urbana.", video: "https://youtube.com/shorts/WfALwXM6x2k" },
  { name: "Mano Amiga Mariches", project: "Educación para autistas", description: "App educativa para impulsar el aprendizaje de autistas en Venezuela.", video: "https://youtube.com/shorts/UwWogjs3b5E" },
  { name: "Mano Amiga Turgua", project: "Control de sonido en aulas", description: "Semáforo interactivo para controlar el sonido en los salones.", video: "https://youtu.be/TPCBtjVYUQc" },
]

export default function Resultados2026Page() {
  const [showAllTeams, setShowAllTeams] = useState(false)

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 75% 30%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)'}}/>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">
            17–19 de Octubre, 2025 · Caracas, Venezuela
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            AlegrIA 2025:
            <br />
            <span className="text-[#4A5EE7]">Los Resultados</span>
          </h1>
          <p className="text-[#BFC9DB] text-lg md:text-xl max-w-xl leading-relaxed">
            El primer hackatón de vibe-coding de Venezuela, en números y en historias.
          </p>
        </div>
      </section>

      {/* ─── STATS STRIP ─────────────────────────────────────── */}
      <section className="border-y border-[#4A5EE7]/20 bg-[#00162D]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-[#4A5EE7]/20">
            {[
              { icon: <Users size={20} />, number: "26", label: "Equipos participaron" },
              { icon: <Clock size={20} />, number: "48h", label: "De construcción" },
              { icon: <DollarSign size={20} />, number: "$75K+", label: "En premios" },
              { icon: <Zap size={20} />, number: "26", label: "Proyectos creados" },
            ].map((stat, i) => (
              <div key={i} className="px-4 md:px-8 py-7 md:py-10 text-center">
                <div className="text-[#4A5EE7] mb-2 flex justify-center">{stat.icon}</div>
                <div
                  className="font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
                >
                  {stat.number}
                </div>
                <div className="text-[#BFC9DB] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WINNERS ─────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-3">Los ganadores</p>
        <h2
          className="font-bold mb-16"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
        >
          Los mejores proyectos
        </h2>

        {/* 1st Place — Full width */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-[#FFD700]/30 bg-gradient-to-br from-[#FFD700]/5 to-transparent">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto min-h-[280px] overflow-hidden">
              <Image src="/images/1Winners.JPG" alt="Equipo ganador AlegrIA 2025" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#FFD700] text-[#00162D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  1er Lugar
                </span>
              </div>
              <h3
                className="font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                Rocket
              </h3>
              <p className="text-[#4A5EE7] font-semibold mb-4">Tizza</p>
              <p className="text-[#BFC9DB] leading-relaxed mb-6">
                Proyecto educativo que facilita el acceso a contenido digital de calidad.
              </p>
              <p className="text-[#FFD700] font-bold text-2xl" style={{ fontFamily: "var(--font-montserrat)" }}>
                $25,000
              </p>
            </div>
          </div>
        </div>

        {/* 2nd & 3rd — Side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { place: "2do Lugar", icon: <Medal className="text-[#C0C0C0]" size={32} />, prize: "$5,000", color: "#C0C0C0", border: "border-[#C0C0C0]/20", photo: "/images/1_secondplace.JPG", team: "Cuídate App", project: "Cuídate App", description: "Plataforma digital que ofrece seguros rápidos y accesibles." },
            { place: "3er Lugar", icon: <Award className="text-[#CD7F32]" size={32} />, prize: "$2,500", color: "#CD7F32", border: "border-[#CD7F32]/20", photo: "/images/1_thirdplace.JPG", team: "Blink Smart Solutions", project: "AgroOne", description: "Tecnología agrícola para mejorar la productividad del campo." },
          ].map((item, i) => (
            <div key={i} className={`rounded-2xl border ${item.border} bg-[#0a1f3d]/50 p-8`}>
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <span className="text-[#BFC9DB] text-sm font-semibold">{item.place}</span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <Image src={item.photo} alt={item.place} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="font-bold text-white text-xl mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                {item.team}
              </h3>
              <p className="text-[#4A5EE7] text-sm font-medium mb-3">{item.project}</p>
              <p className="text-[#BFC9DB] text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <p className="font-bold text-lg" style={{ color: item.color, fontFamily: "var(--font-montserrat)" }}>
                {item.prize}
              </p>
            </div>
          ))}
        </div>

        {/* Yummy Special Prize */}
        <div className="rounded-2xl border border-[#FF6B35]/20 bg-gradient-to-r from-[#FF6B35]/5 to-transparent overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-stretch gap-0">
            <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
              <Image src="/images/1_yummyprize.JPG" alt="Premio Yummy AlegrIA 2025" fill className="object-cover" sizes="(max-width: 768px) 100vw, 256px" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 flex-1">
              <div className="flex-1">
                <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-wider">Premio Especial Yummy</span>
                <h3 className="font-bold text-white text-xl mt-1 mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Bridges
                </h3>
                <p className="text-[#BFC9DB] text-sm">Mejor proyecto con componente de delivery físico.</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[#FF6B35] font-bold text-2xl" style={{ fontFamily: "var(--font-montserrat)" }}>$20,000</p>
                <p className="text-[#BFC9DB] text-xs">en créditos Yummy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ALL 26 TEAMS ────────────────────────────────────── */}
      <section className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">Los participantes</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2
              className="font-bold"
              style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              26 equipos, 26 proyectos
            </h2>
            <p className="text-[#BFC9DB] text-lg max-w-sm">
              Todos construyeron algo real en 48 horas.
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ${!showAllTeams ? "max-h-[680px] overflow-hidden relative" : ""}`}>
            {!showAllTeams && (
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04112a] to-transparent z-10 pointer-events-none" />
            )}
            {teams.map((team, i) => (
              <div
                key={i}
                className="border border-[#4A5EE7]/15 hover:border-[#4A5EE7]/40 rounded-xl p-6 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3
                      className="font-bold text-white text-lg leading-tight"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {team.name}
                    </h3>
                    <p className="text-[#4A5EE7] text-sm font-medium mt-0.5">{team.project}</p>
                  </div>
                  <span className="text-[#4A5EE7]/40 font-bold text-sm flex-shrink-0 mt-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[#BFC9DB] text-sm leading-relaxed flex-1 mb-4">{team.description}</p>
                <a
                  href={team.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#4A5EE7] text-xs font-semibold hover:text-white transition-colors"
                >
                  Ver demo <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>

          {!showAllTeams && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllTeams(true)}
                className="inline-flex items-center gap-2 border border-[#4A5EE7]/40 hover:border-[#4A5EE7] text-[#BFC9DB] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                Ver todos los equipos <ChevronDown size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── PHOTO GALLERY ───────────────────────────────────── */}
      <section id="galeria" className="py-24 bg-[#04112a] border-t border-[#4A5EE7]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-3">Galería</p>
          <h2
            className="font-bold mb-12"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Lo que pasó en AlegrIA 2025
          </h2>

          {/* Desktop masonry */}
          <div className="hidden md:grid grid-cols-4 gap-3 auto-rows-[200px]">
            <div className="relative col-span-2 row-span-2 rounded-xl overflow-hidden">
              <Image src="/images/1Team_Wide_Shot_2.JPG" alt="Equipos en AlegrIA 2025" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1_judging.JPG" alt="Jurado AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1judging1.JPG" alt="Jurado AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative col-span-2 rounded-xl overflow-hidden">
              <Image src="/images/1_openingceremony.JPG" alt="Ceremonia de apertura" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1judging2.JPG" alt="Jurado AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1_interview.JPG" alt="Entrevista AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1_medalspic.JPG" alt="Medallas AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <Image src="/images/1randomteamphoto.JPG" alt="Equipos AlegrIA 2025" fill className="object-cover" sizes="25vw" />
            </div>
          </div>
          {/* Mobile simple grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden" style={{ gridAutoRows: "160px" }}>
            {[
              { src: "/images/1Team_Wide_Shot_2.JPG", alt: "Equipos en AlegrIA 2025" },
              { src: "/images/1Winners.JPG", alt: "Ganadores AlegrIA 2025" },
              { src: "/images/1_judging.JPG", alt: "Jurado AlegrIA 2025" },
              { src: "/images/1judging1.JPG", alt: "Jurado AlegrIA 2025" },
              { src: "/images/1_openingceremony.JPG", alt: "Ceremonia de apertura" },
              { src: "/images/1_medalspic.JPG", alt: "Medallas AlegrIA 2025" },
            ].map((photo, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEXT EDITION TEASER ─────────────────────────────── */}
      <section className="py-24 bg-[#04112a] border-t border-[#4A5EE7]/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">Próxima edición</p>
          <h2
            className="font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}
          >
            AlegrIA vuelve en 2026.
          </h2>
          <p className="text-[#BFC9DB] text-lg mb-10 max-w-lg mx-auto">
            ¿Quieres ser el primero en saber cuándo abren las aplicaciones?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hackaton"
              className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Conoce el hackatón <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
