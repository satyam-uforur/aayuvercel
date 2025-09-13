"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BarChart3, MapPin, Users, MessageCircle, Newspaper, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Medicine Finder",
    description: "Search medicines, check dosages, side effects, and find alternatives",
    href: "/medicine",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: BarChart3,
    title: "Health Dashboard",
    description: "Track your health metrics and get AI-powered insights",
    href: "/dashboard",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: MapPin,
    title: "Find Healthcare",
    description: "Locate nearby hospitals, clinics, and medical facilities",
    href: "/map",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with healthcare professionals and get support",
    href: "/community",
    color: "from-orange-500 to-red-400",
  },
  {
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Get instant health advice from our intelligent chatbot",
    href: "/chat",
    color: "from-teal-500 to-blue-400",
  },
  {
    icon: Newspaper,
    title: "Health News",
    description: "Stay updated with the latest health news and updates",
    href: "/news",
    color: "from-indigo-500 to-purple-400",
  },
]

export function FeatureCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Everything You Need for Better Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare tools and resources at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="glossy-card border-0 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:animate-glow transition-all duration-300`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-accent transition-colors group-hover:translate-x-1 duration-300"
                    onClick={() => (window.location.href = feature.href)}
                  >
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
