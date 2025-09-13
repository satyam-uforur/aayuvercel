import { Button } from "@/components/ui/button"
import { Search, Shield, Zap, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-poppins)] text-foreground mb-6 animate-slide-in-up">
            Your Advanced <span className="text-primary">Healthcare</span> Assistant
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-in-up">
            Get instant medicine information, AI-powered health advice, find nearby healthcare facilities, and stay
            updated with the latest health news - all in one comprehensive platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-scale">
            <Button size="lg" className="text-lg px-8 py-3 animate-glow">
              <Search className="mr-2 h-5 w-5" />
              Find Medicine
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Explore Features
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-fade-in-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] mb-2">Trusted Information</h3>
              <p className="text-muted-foreground">
                Verified medicine data and health information from reliable sources.
              </p>
            </div>

            <div className="text-center animate-fade-in-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Smart chatbot providing personalized health recommendations.</p>
            </div>

            <div className="text-center animate-fade-in-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] mb-2">Community Focused</h3>
              <p className="text-muted-foreground">
                Connect with healthcare providers and stay informed about local health updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
