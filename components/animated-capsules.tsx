"use client"

import { useEffect, useRef, useState } from "react"

interface Capsule {
  id: number
  x: number
  y: number
  color1: string
  color2: string
  size: number
  speed: number
  rotation: number
}

export function AnimatedCapsules() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [capsules, setCapsules] = useState<Capsule[]>([])
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const colors = [
    { color1: "from-blue-400", color2: "to-cyan-300" },
    { color1: "from-green-400", color2: "to-emerald-300" },
    { color1: "from-purple-400", color2: "to-pink-300" },
    { color1: "from-orange-400", color2: "to-red-300" },
    { color1: "from-teal-400", color2: "to-blue-300" },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const generateCapsules = () => {
      const newCapsules: Capsule[] = []
      const capsuleCount = isMobile ? 8 : 12

      for (let i = 0; i < capsuleCount; i++) {
        const colorPair = colors[Math.floor(Math.random() * colors.length)]
        newCapsules.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color1: colorPair.color1,
          color2: colorPair.color2,
          size: isMobile ? Math.random() * 25 + 15 : Math.random() * 40 + 20, // Smaller on mobile
          speed: Math.random() * 0.3 + 0.1, // Slower on mobile
          rotation: Math.random() * 360,
        })
      }
      setCapsules(newCapsules)
    }

    generateCapsules()
  }, [isMobile])

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 pointer-events-none">
        {capsules.map((capsule) => (
          <div
            key={capsule.id}
            className={`absolute transition-all duration-1000 ease-out ${isMobile ? "animate-capsule-float" : "animate-capsule-float"}`}
            style={{
              left: `${capsule.x}%`,
              top: `${capsule.y}%`,
              transform: `
                translateY(${scrollY * capsule.speed * (isMobile ? 0.05 : 0.1)}px) 
                rotate(${capsule.rotation + scrollY * (isMobile ? 0.05 : 0.1)}deg)
                ${scrollY > (isMobile ? 50 : 100) ? "scaleX(0.5)" : "scaleX(1)"}
              `,
              width: `${capsule.size}px`,
              height: `${capsule.size * 0.6}px`,
            }}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${capsule.color1} ${capsule.color2} rounded-full opacity-60 animate-capsule-split`}
            >
              <div className="w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent rounded-l-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-balance">
            Scroll to See the Magic
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Watch our animated medicine capsules transform as you scroll through the page
          </p>
        </div>
      </div>
    </section>
  )
}
