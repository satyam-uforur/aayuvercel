import { Header } from "@/components/header"
import { HealthcareMap } from "@/components/healthcare-map"
import { Footer } from "@/components/footer"

export default function MapPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Find Healthcare
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Locate nearby hospitals, clinics, pharmacies, and medical facilities with real-time information and
              reviews.
            </p>
          </div>
          <HealthcareMap />
        </div>
      </main>
      <Footer />
    </div>
  )
}
