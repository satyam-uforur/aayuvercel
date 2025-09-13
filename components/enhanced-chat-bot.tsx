"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Send, Bot, User, Heart, AlertTriangle, Info, Sparkles, Brain, Stethoscope } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "info" | "warning" | "success" | "medical"
}

const quickQuestions = [
  "What are the side effects of aspirin?",
  "How to reduce fever naturally?",
  "When should I see a doctor?",
  "What's the difference between generic and brand medicines?",
  "How to manage diabetes naturally?",
  "What are symptoms of high blood pressure?",
]

const botResponses = {
  "side effects": {
    content:
      "Common side effects of aspirin include stomach upset, heartburn, and increased bleeding risk. Always consult your doctor before starting any medication. Would you like me to provide more specific information about aspirin interactions?",
    type: "warning" as const,
  },
  fever: {
    content:
      "Natural fever reduction methods include: 1) Stay hydrated with water and clear fluids, 2) Rest in a cool environment, 3) Use cool compresses on forehead, 4) Take lukewarm baths. If fever exceeds 103°F (39.4°C) or persists for more than 3 days, seek medical attention immediately.",
    type: "info" as const,
  },
  doctor: {
    content:
      "See a doctor if you experience: persistent symptoms lasting more than a week, high fever (>103°F), severe pain, difficulty breathing, chest pain, sudden vision changes, or any concerning health changes. When in doubt, it's always better to consult a healthcare professional.",
    type: "medical" as const,
  },
  generic: {
    content:
      "Generic medicines contain the same active ingredients as brand-name drugs and must meet identical FDA standards for quality, strength, purity, and effectiveness. The main differences are typically price (generics cost 80-85% less) and inactive ingredients like colors or flavors.",
    type: "success" as const,
  },
  diabetes: {
    content:
      "Natural diabetes management includes: 1) Regular exercise (150 min/week), 2) Balanced diet with complex carbs, 3) Weight management, 4) Stress reduction, 5) Regular blood sugar monitoring. However, medication prescribed by your doctor should never be stopped without consultation.",
    type: "medical" as const,
  },
  "blood pressure": {
    content:
      "High blood pressure symptoms can include: headaches, shortness of breath, nosebleeds, chest pain, visual changes, and fatigue. However, hypertension is often called the 'silent killer' because it frequently has no symptoms. Regular monitoring is essential.",
    type: "warning" as const,
  },
  default: {
    content:
      "I'm here to provide general health information and guidance. For specific medical advice, diagnosis, or treatment recommendations, please consult with a qualified healthcare professional. What health topic would you like to learn about?",
    type: "info" as const,
  },
}

export function EnhancedChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm AayuBot, your AI Health Assistant. I can help you with general health information, medicine details, wellness tips, and guide you to appropriate care when needed. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "info",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [isMobile, setIsMobile] = useState(false) // Mobile detection
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (
    userMessage: string,
  ): { content: string; type: "info" | "warning" | "success" | "medical" } => {
    const message = userMessage.toLowerCase()

    if (message.includes("side effect") || message.includes("aspirin")) {
      return botResponses["side effects"]
    } else if (message.includes("fever") || message.includes("temperature")) {
      return botResponses.fever
    } else if (message.includes("doctor") || message.includes("medical") || message.includes("emergency")) {
      return botResponses.doctor
    } else if (message.includes("generic") || message.includes("brand")) {
      return botResponses.generic
    } else if (message.includes("diabetes") || message.includes("blood sugar")) {
      return botResponses.diabetes
    } else if (message.includes("blood pressure") || message.includes("hypertension")) {
      return botResponses["blood pressure"]
    } else {
      return botResponses.default
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: "bot",
        timestamp: new Date(),
        type: botResponse.type,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "success":
        return <Heart className="h-4 w-4 text-green-500" />
      case "medical":
        return <Stethoscope className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="chat" className="text-xs sm:text-sm">
            AI Chat
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm">
            History
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card className={`glossy-card border-0 flex flex-col ${isMobile ? "h-[600px]" : "h-[700px]"}`}>
            <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5 p-3 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                    <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg sm:text-xl flex items-center text-balance">
                    AayuBot AI Assistant
                    <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Powered by Advanced Medical AI • Always Online
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 mobile-keyboard-adjust">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-scale`}
                >
                  <div
                    className={`flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.sender === "user"
                            ? "bg-gradient-to-r from-primary to-accent text-white"
                            : "bg-gradient-to-r from-secondary to-accent text-white"
                        }
                      >
                        {message.sender === "user" ? (
                          <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
                        message.sender === "user" ? "bg-gradient-to-r from-primary to-accent text-white" : "glossy-card"
                      }`}
                    >
                      {message.sender === "bot" && message.type && (
                        <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                          {getMessageIcon(message.type)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {message.type === "medical" ? "Medical Info" : message.type}
                          </Badge>
                        </div>
                      )}
                      <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-pretty">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in-scale">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarFallback className="bg-gradient-to-r from-secondary to-accent text-white">
                        <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="glossy-card rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-primary animate-pulse" />
                        <span className="text-xs text-muted-foreground">AayuBot is thinking...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-3 sm:p-6 border-t border-border/50 bg-muted/20">
                <p className="text-xs sm:text-sm font-medium text-foreground mb-3 sm:mb-4 flex items-center">
                  <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  Popular Health Questions:
                </p>
                <div className={`grid gap-2 sm:gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-2 sm:p-3 text-xs glossy-card bg-transparent hover:scale-105 transition-all duration-200 min-h-[40px] text-pretty"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-6 border-t border-border/50">
              <div className="flex space-x-2 sm:space-x-3">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      isMobile ? "Ask about health..." : "Ask about health, medicines, symptoms, or wellness tips..."
                    }
                    className="flex-1 rounded-xl text-sm min-h-[40px]"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 min-h-[40px] min-w-[40px]"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 sm:mt-3 ml-10 sm:ml-12 text-pretty">
                This AI provides general health information only. Always consult healthcare professionals for medical
                advice.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="glossy-card border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat History</h3>
              <p className="text-muted-foreground">
                Your conversation history will appear here. All chats are private and secure.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="glossy-card border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Settings</h3>
              <p className="text-muted-foreground">
                Customize your AI assistant preferences and notification settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
