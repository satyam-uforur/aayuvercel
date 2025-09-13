import { Header } from "@/components/header"
import { HealthDashboard } from "@/components/health-dashboard"
import { DiseaseRiskAlerts } from "@/components/disease-risk-alerts"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Health Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor your health metrics, track progress, and get personalized insights with AI-powered analytics.
            </p>
          </div>
          <HealthDashboard />
          <div className="mt-12">
            <DiseaseRiskAlerts />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
