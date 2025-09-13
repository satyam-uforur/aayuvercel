import { Header } from "@/components/header"
import { InteractiveHero } from "@/components/interactive-hero"
import { AnimatedCapsules } from "@/components/animated-capsules"
import { FeatureCards } from "@/components/feature-cards"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <InteractiveHero />
        <AnimatedCapsules />
        <FeatureCards />
      </main>
      <Footer />
    </div>
  )
}
