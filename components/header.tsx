"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Bot, Search, MapPin, MessageCircle, BarChart3, Users } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl animate-glow">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AayuBot
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/medicine"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <Search className="h-4 w-4" />
              <span className="font-medium">Medicine</span>
            </a>
            <a
              href="/dashboard"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </a>
            <a
              href="/map"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Find Care</span>
            </a>
            <a
              href="/community"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <Users className="h-4 w-4" />
              <span className="font-medium">Community</span>
            </a>
            <a
              href="/chat"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">AI Chat</span>
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button className="hidden sm:inline-flex animate-fade-in-scale bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in-up">
            <nav className="flex flex-col space-y-4">
              <a
                href="/medicine"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Medicine</span>
              </a>
              <a
                href="/dashboard"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </a>
              <a
                href="/map"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>Find Care</span>
              </a>
              <a
                href="/community"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </a>
              <a
                href="/chat"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>AI Chat</span>
              </a>
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent">Get Started</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
