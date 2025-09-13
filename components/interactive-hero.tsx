"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Search, Shield, Zap, Users, ArrowRight, Sparkles } from "lucide-react"

export function InteractiveHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [touchRipples, setTouchRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [backgroundCapsules, setBackgroundCapsules] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([])
  const backgroundRef = useRef<HTMLDivElement>(null)

  const features = [
    { icon: Search, title: "Smart Medicine Search", color: "from-blue-500 to-cyan-400" },
    { icon: Shield, title: "Trusted Health Info", color: "from-green-500 to-emerald-400" },
    { icon: Zap, title: "AI-Powered Insights", color: "from-purple-500 to-pink-400" },
    { icon: Users, title: "Community Support", color: "from-orange-500 to-red-400" },
  ]

  useEffect(() => {
    const generateCapsules = () => {
      const capsules = []
      for (let i = 0; i < 15; i++) {
        capsules.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 6,
        })
      }
      setBackgroundCapsules(capsules)
    }
    generateCapsules()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBackgroundTouch = (e: React.TouchEvent | React.MouseEvent) => {
    if (!backgroundRef.current) return

    const rect = backgroundRef.current.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    const newRipple = { id: Date.now(), x, y }
    setTouchRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setTouchRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 400)
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const interval = setInterval(
      () => {
        setCurrentFeature((prev) => (prev + 1) % features.length)
      },
      isMobile ? 4000 : 3000,
    )

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isMobile])

  return (
    <section
      ref={backgroundRef}
      className="relative py-12 sm:py-20 lg:py-32 overflow-hidden interactive-background"
      onTouchStart={handleBackgroundTouch}
      onClick={handleBackgroundTouch}
    >
      {backgroundCapsules.map((capsule) => (
        <div
          key={capsule.id}
          className="bg-capsule animate-background-capsule"
          style={{
            left: `${capsule.x}%`,
            top: `${capsule.y}%`,
            animationDelay: `${capsule.delay}s`,
          }}
        />
      ))}

      {touchRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none animate-touch-ripple"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "radial-gradient(circle, oklch(0.6 0.15 160 / 0.3) 0%, transparent 70%)",
          }}
        />
      ))}

      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 animate-fade-in-scale">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Powered by Advanced AI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-poppins)] mb-2 sm:mb-4 animate-slide-in-up text-balance">
            Introducing{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-pulse-glow">
              AayuBot
            </span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-medium">
              Advanced Healthcare Intelligence
            </span>
          </h1>

          <div className="flex flex-wrap justify-center items-center mb-4 sm:mb-6 gap-3">
            <span
              className="gradient-capsule text-xs sm:text-sm font-bold text-gray-800 animate-capsule-float cursor-pointer"
              onMouseEnter={(e) => e.currentTarget.classList.add("animate-pulse-glow")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("animate-pulse-glow")}
            >
              AI-Powered
            </span>
            <span
              className="gradient-capsule text-xs sm:text-sm font-bold text-gray-800 animate-capsule-float cursor-pointer"
              style={{ animationDelay: "0.2s" }}
              onMouseEnter={(e) => e.currentTarget.classList.add("animate-pulse-glow")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("animate-pulse-glow")}
            >
              Healthcare
            </span>
            <span
              className="gradient-capsule text-xs sm:text-sm font-bold text-gray-800 animate-capsule-float cursor-pointer"
              style={{ animationDelay: "0.4s" }}
              onMouseEnter={(e) => e.currentTarget.classList.add("animate-pulse-glow")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("animate-pulse-glow")}
            >
              Assistant
            </span>
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-in-up text-pretty">
            Your professional healthcare companion delivering{" "}
            <span className="text-primary font-semibold">evidence-based medicine information</span>,{" "}
            <span className="text-accent font-semibold">intelligent health guidance</span>, and{" "}
            <span className="text-secondary font-semibold">comprehensive care support</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center mb-12 sm:mb-16 animate-fade-in-scale">
            <Button
              size={isMobile ? "default" : "lg"}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 transform hover:scale-105 min-h-[44px] text-gray-800 font-semibold shadow-lg border-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.75 0.15 160) 0%, oklch(0.85 0.1 160) 100%)",
              }}
            >
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size={isMobile ? "default" : "lg"}
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 glossy-card hover:scale-105 transition-all duration-300 bg-white/95 text-primary border-primary/30 hover:bg-white hover:text-primary min-h-[44px] font-semibold shadow-lg"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === currentFeature

              return (
                <div
                  key={index}
                  className={`glossy-card p-3 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 cursor-pointer min-h-[120px] sm:min-h-auto group ${
                    isActive ? "scale-105 shadow-2xl animate-pulse-glow" : "hover:scale-102"
                  }`}
                  onClick={() => setCurrentFeature(index)}
                  onMouseEnter={() => setCurrentFeature(index)}
                >
                  <div
                    className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-2 sm:mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg`}
                  >
                    <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-white drop-shadow-sm" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold font-[family-name:var(--font-poppins)] mb-2 text-balance group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <div
                    className={`h-1 sm:h-1.5 bg-gradient-to-r ${feature.color} rounded-full transition-all duration-500 shadow-sm ${
                      isActive ? "w-full" : "w-0 group-hover:w-3/4"
                    }`}
                  ></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
