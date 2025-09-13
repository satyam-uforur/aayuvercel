import { Header } from "@/components/header"
import { EnhancedChatBot } from "@/components/enhanced-chat-bot"
import { Footer } from "@/components/footer"

export default function ChatPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-[family-name:var(--font-poppins)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              AI Health Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant health advice, medicine information, and personalized recommendations from our AI assistant.
            </p>
          </div>
          <EnhancedChatBot />
        </div>
      </main>
      <Footer />
    </div>
  )
}
