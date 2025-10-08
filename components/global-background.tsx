"use client"

import { useState, useEffect } from "react"

export default function GlobalBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([])

  useEffect(() => {
    // Only generate particles on the client side to avoid hydration mismatch
    const particleCount = window.innerWidth >= 768 ? 120 : 75
    const newParticles = [...Array(particleCount)].map((_, i) => {
      const size = Math.random() * 2 + 0.5
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 30
      const left = Math.random() * 100
      const top = Math.random() * 100
      const direction = Math.random() > 0.5 ? 1 : -1

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          top: `${top}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          "--direction": direction,
        } as React.CSSProperties,
      }
    })
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#00162D]" aria-hidden="true">
      {/* Grid pattern - More visible */}
      <div
        className="absolute inset-0 opacity-[0.9]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 94, 231, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 94, 231, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Optimized Glows */}
      <div
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#4A5EE7]/15 rounded-full blur-[150px] animate-pulse"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-[15%] right-[10%] w-[450px] h-[450px] bg-[#BFC9DB]/12 rounded-full blur-[130px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-[30%] left-[45%] w-[400px] h-[400px] bg-[#4A5EE7]/18 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-[40%] right-[20%] w-[380px] h-[380px] bg-[#BFC9DB]/10 rounded-full blur-[110px] animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[50%] left-[15%] w-[480px] h-[480px] bg-[#4A5EE7]/13 rounded-full blur-[140px] animate-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-[65%] right-[5%] w-[420px] h-[420px] bg-[#BFC9DB]/9 rounded-full blur-[115px] animate-pulse"
        style={{ animationDelay: "5s" }}
      />
      <div
        className="absolute top-[70%] left-[30%] w-[360px] h-[360px] bg-[#4A5EE7]/16 rounded-full blur-[105px] animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-[85%] right-[35%] w-[440px] h-[440px] bg-[#BFC9DB]/12 rounded-full blur-[135px] animate-pulse"
        style={{ animationDelay: "3.5s" }}
      />
      <div
        className="absolute top-[90%] left-[50%] w-[390px] h-[390px] bg-[#4A5EE7]/15 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "6s" }}
      />
      <div
        className="absolute top-[95%] right-[15%] w-[340px] h-[340px] bg-[#BFC9DB]/10 rounded-full blur-[95px] animate-pulse"
        style={{ animationDelay: "2.5s" }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span key={p.id} className="absolute bg-white/30 rounded-full animate-particle-float" style={p.style} />
        ))}
      </div>
    </div>
  )
}
