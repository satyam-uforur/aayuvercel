"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginDialog } from "@/components/login-dialog"
import {
  MessageCircle,
  Send,
  Users,
  Heart,
  Share2,
  UserPlus,
  Shield,
  Stethoscope,
  User,
  Clock,
  TrendingUp,
  Menu,
  X,
} from "lucide-react"

interface Message {
  id: string
  content: string
  author: {
    name: string
    avatar?: string
    role: "patient" | "doctor" | "nurse" | "admin"
    verified: boolean
  }
  timestamp: Date
  likes: number
  replies: number
  isLiked: boolean
}

interface CommunityRoom {
  id: string
  name: string
  description: string
  memberCount: number
  category: "general" | "support" | "qa" | "emergency"
  isActive: boolean
}

const mockRooms: CommunityRoom[] = [
  {
    id: "general",
    name: "General Health",
    description: "General health discussions and tips",
    memberCount: 1247,
    category: "general",
    isActive: true,
  },
  {
    id: "support",
    name: "Support Group",
    description: "Emotional support and encouragement",
    memberCount: 892,
    category: "support",
    isActive: true,
  },
  {
    id: "qa",
    name: "Ask the Experts",
    description: "Q&A with healthcare professionals",
    memberCount: 2156,
    category: "qa",
    isActive: true,
  },
  {
    id: "emergency",
    name: "Emergency Info",
    description: "Emergency health information and resources",
    memberCount: 567,
    category: "emergency",
    isActive: false,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    content:
      "Has anyone tried the new meditation techniques for managing chronic pain? I've been dealing with back pain for months and looking for natural alternatives.",
    author: {
      name: "Sarah M.",
      avatar: "/diverse-woman-portrait.png",
      role: "patient",
      verified: false,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    likes: 12,
    replies: 8,
    isLiked: false,
  },
  {
    id: "2",
    content:
      "Meditation and gentle yoga have been game-changers for my patients with chronic pain. I recommend starting with 10-minute guided sessions. The key is consistency rather than duration.",
    author: {
      name: "Dr. James Wilson",
      avatar: "/caring-doctor.png",
      role: "doctor",
      verified: true,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    likes: 28,
    replies: 3,
    isLiked: true,
  },
  {
    id: "3",
    content:
      "Thank you Dr. Wilson! Could you recommend any specific apps or resources for guided meditation? I'm completely new to this.",
    author: {
      name: "Sarah M.",
      avatar: "/diverse-woman-portrait.png",
      role: "patient",
      verified: false,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    likes: 5,
    replies: 2,
    isLiked: false,
  },
]

export function CommunityChat() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [activeRoom, setActiveRoom] = useState("general")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [showRoomList, setShowRoomList] = useState(false) // Mobile room list toggle
  const [currentUser] = useState({
    name: "You",
    avatar: "/abstract-geometric-shapes.png",
    role: "patient" as const,
    verified: false,
  })
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
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isLoggedIn) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      author: currentUser,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      isLiked: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleLikeMessage = (messageId: string) => {
    if (!isLoggedIn) {
      setShowLoginDialog(true)
      return
    }

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1,
              isLiked: !msg.isLiked,
            }
          : msg,
      ),
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "doctor":
        return <Stethoscope className="h-3 w-3" />
      case "nurse":
        return <Shield className="h-3 w-3" />
      case "admin":
        return <Shield className="h-3 w-3" />
      default:
        return <User className="h-3 w-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "doctor":
        return "bg-blue-500"
      case "nurse":
        return "bg-green-500"
      case "admin":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="glossy-card border-0">
          <CardContent className="p-6 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-poppins)] mb-3 sm:mb-4 text-balance">
              Join Our Health Community
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-pretty">
              Connect with healthcare professionals and community members. Share experiences, get support, and access
              expert advice.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
              <Button
                size={isMobile ? "default" : "lg"}
                onClick={() => setShowLoginDialog(true)}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 min-h-[44px]"
              >
                <UserPlus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Join Community
              </Button>
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="glossy-card bg-transparent min-h-[44px]"
              >
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">2.5K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-accent mb-1 sm:mb-2">150+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Healthcare Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-secondary mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Community Support</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onLogin={() => {
            setIsLoggedIn(true)
            setShowLoginDialog(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="chat" className="text-xs sm:text-sm">
            Community Chat
          </TabsTrigger>
          <TabsTrigger value="rooms" className="text-xs sm:text-sm">
            Chat Rooms
          </TabsTrigger>
          <TabsTrigger value="experts" className="text-xs sm:text-sm">
            Expert Q&A
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4 sm:space-y-6">
          <div className={`grid gap-4 sm:gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"}`}>
            {isMobile && (
              <Button
                variant="outline"
                onClick={() => setShowRoomList(!showRoomList)}
                className="mb-4 glossy-card bg-transparent min-h-[44px]"
              >
                {showRoomList ? <X className="mr-2 h-4 w-4" /> : <Menu className="mr-2 h-4 w-4" />}
                {showRoomList ? "Close Rooms" : "Show Rooms"}
              </Button>
            )}

            {(!isMobile || showRoomList) && (
              <Card className={`glossy-card border-0 ${isMobile ? "mb-4" : ""}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Chat Rooms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  {mockRooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 min-h-[44px] flex flex-col justify-center ${
                        activeRoom === room.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                      }`}
                      onClick={() => {
                        setActiveRoom(room.id)
                        if (isMobile) setShowRoomList(false) // Close on mobile after selection
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{room.name}</h4>
                        {room.isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 sm:mb-2 text-pretty">{room.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        {room.memberCount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className={isMobile ? "col-span-1" : "lg:col-span-3"}>
              <Card className={`glossy-card border-0 flex flex-col ${isMobile ? "h-[500px]" : "h-[600px]"}`}>
                <CardHeader className="border-b border-border/50 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg text-balance">
                      {mockRooms.find((r) => r.id === activeRoom)?.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="hidden sm:inline">
                        {mockRooms.find((r) => r.id === activeRoom)?.memberCount.toLocaleString()} members
                      </span>
                      <span className="sm:hidden">
                        {Math.floor((mockRooms.find((r) => r.id === activeRoom)?.memberCount || 0) / 1000)}K
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 mobile-keyboard-adjust">
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
                          <AvatarImage src={message.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                            <span className="font-medium text-xs sm:text-sm truncate">{message.author.name}</span>
                            {message.author.verified && (
                              <Badge
                                variant="secondary"
                                className={`text-xs ${getRoleColor(message.author.role)} text-white px-1 py-0`}
                              >
                                {getRoleIcon(message.author.role)}
                                <span className="ml-1 capitalize hidden sm:inline">{message.author.role}</span>
                              </Badge>
                            )}
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                              <span className="text-xs">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-foreground mb-2 sm:mb-3 leading-relaxed text-pretty">
                            {message.content}
                          </p>

                          <div className="flex items-center space-x-2 sm:space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 sm:h-8 px-1 sm:px-2 text-xs min-h-[32px] ${message.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                              onClick={() => handleLikeMessage(message.id)}
                            >
                              <Heart
                                className={`mr-1 h-2 w-2 sm:h-3 sm:w-3 ${message.isLiked ? "fill-current" : ""}`}
                              />
                              {message.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 sm:h-8 px-1 sm:px-2 text-xs text-muted-foreground min-h-[32px]"
                            >
                              <MessageCircle className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                              {message.replies}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 sm:h-8 px-1 sm:px-2 text-xs text-muted-foreground min-h-[32px] hidden sm:flex"
                            >
                              <Share2 className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                <div className="p-3 sm:p-4 border-t border-border/50">
                  <div className="flex space-x-2">
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={isMobile ? "Share your thoughts..." : "Share your thoughts with the community..."}
                        className="flex-1 text-sm min-h-[40px]"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="min-h-[40px] min-w-[40px]"
                      >
                        <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 ml-8 sm:ml-10 text-pretty">
                    Be respectful and follow community guidelines.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rooms">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRooms.map((room) => (
              <Card key={room.id} className="glossy-card border-0 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{room.name}</h3>
                    {room.isActive && (
                      <div className="flex items-center text-green-500 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
                        Active
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {room.memberCount.toLocaleString()} members
                    </div>
                    <Button size="sm" variant="outline">
                      Join Room
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experts">
          <Card className="glossy-card border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Q&A Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Direct access to healthcare professionals for personalized advice and answers to your health questions.
              </p>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <TrendingUp className="mr-2 h-4 w-4" />
                Get Notified
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
