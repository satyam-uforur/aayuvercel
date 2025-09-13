import { Header } from "@/components/header"
import { MedicineFinder } from "@/components/medicine-finder"
import { Footer } from "@/components/footer"

export default function MedicinePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Medicine Finder
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search for medicines, check dosages, side effects, and find alternatives with our comprehensive database.
            </p>
          </div>
          <MedicineFinder />
        </div>
      </main>
      <Footer />
    </div>
  )
}
