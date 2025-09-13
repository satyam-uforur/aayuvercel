import { Header } from "@/components/header"
import { CommunityChat } from "@/components/community-chat"
import { Footer } from "@/components/footer"

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Health Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with healthcare professionals and community members. Share experiences and get support.
            </p>
          </div>
          <CommunityChat />
        </div>
      </main>
      <Footer />
    </div>
  )
}
