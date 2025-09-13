"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Heart, AlertTriangle, Info, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "info" | "warning" | "success"
}

const quickQuestions = [
  "What are the side effects of aspirin?",
  "How to reduce fever naturally?",
  "When should I see a doctor?",
  "What's the difference between generic and brand medicines?",
]

const botResponses = {
  "side effects": {
    content:
      "Common side effects of aspirin include stomach upset, heartburn, and increased bleeding risk. Always consult your doctor before starting any medication.",
    type: "warning" as const,
  },
  fever: {
    content:
      "Natural fever reduction methods include staying hydrated, resting, using cool compresses, and taking lukewarm baths. If fever exceeds 103°F (39.4°C), seek medical attention.",
    type: "info" as const,
  },
  doctor: {
    content:
      "See a doctor if you have persistent symptoms, high fever, severe pain, difficulty breathing, or any concerning changes in your health. When in doubt, it's always better to consult a healthcare professional.",
    type: "info" as const,
  },
  generic: {
    content:
      "Generic medicines contain the same active ingredients as brand-name drugs but are typically less expensive. They must meet the same FDA standards for quality, strength, and effectiveness.",
    type: "success" as const,
  },
  default: {
    content:
      "I'm here to help with general health information. For specific medical advice, please consult with a qualified healthcare professional. What would you like to know about?",
    type: "info" as const,
  },
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI Health Assistant. I can help you with general health information, medicine details, and wellness tips. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "info",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): { content: string; type: "info" | "warning" | "success" } => {
    const message = userMessage.toLowerCase()

    if (message.includes("side effect") || message.includes("aspirin")) {
      return botResponses["side effects"]
    } else if (message.includes("fever") || message.includes("temperature")) {
      return botResponses.fever
    } else if (message.includes("doctor") || message.includes("medical")) {
      return botResponses.doctor
    } else if (message.includes("generic") || message.includes("brand")) {
      return botResponses.generic
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

    // Simulate typing delay
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
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "success":
        return <Heart className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg animate-glow hover:scale-110 transition-all duration-300"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-in-up">
      <Card className={`w-96 shadow-2xl ${isMinimized ? "h-16" : "h-[600px]"} transition-all duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary-foreground text-primary">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">AI Health Assistant</CardTitle>
              <p className="text-xs opacity-90">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[calc(600px-80px)] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-scale`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.sender === "bot" && message.type && (
                        <div className="flex items-center space-x-2 mb-2">
                          {getMessageIcon(message.type)}
                          <Badge variant="outline" className="text-xs">
                            {message.type}
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in-scale">
                  <div className="flex items-start space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
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
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left justify-start h-auto p-2 text-xs bg-transparent"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about health, medicines, or symptoms..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This is for general information only. Consult a healthcare professional for medical advice.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
