"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Newspaper,
  AlertTriangle,
  Syringe,
  Heart,
  Brain,
  Clock,
  ExternalLink,
  Bell,
  TrendingUp,
  Globe,
  Calendar,
  Eye,
} from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  category: "breaking" | "research" | "vaccines" | "recalls" | "general"
  source: string
  publishedAt: string
  readTime: string
  priority: "high" | "medium" | "low"
  url: string
  image?: string
}

const healthNews: NewsItem[] = [
  {
    id: "1",
    title: "New COVID-19 Variant Detected: Health Officials Urge Continued Vigilance",
    summary:
      "Health authorities have identified a new variant with increased transmissibility. Vaccination and booster shots remain effective against severe illness.",
    category: "breaking",
    source: "CDC Health Alert",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "3 min",
    priority: "high",
    url: "#",
  },
  {
    id: "2",
    title: "Breakthrough Study Links Mediterranean Diet to 40% Reduced Dementia Risk",
    summary:
      "A 20-year longitudinal study of 50,000 participants shows significant cognitive protection from Mediterranean dietary patterns.",
    category: "research",
    source: "Journal of Neurology",
    publishedAt: "2024-01-15T08:15:00Z",
    readTime: "5 min",
    priority: "medium",
    url: "#",
  },
  {
    id: "3",
    title: "FDA Approves New RSV Vaccine for Adults Over 60",
    summary: "The respiratory syncytial virus vaccine shows 94% efficacy in preventing severe disease in older adults.",
    category: "vaccines",
    source: "FDA News Release",
    publishedAt: "2024-01-14T16:45:00Z",
    readTime: "4 min",
    priority: "high",
    url: "#",
  },
  {
    id: "4",
    title: "Blood Pressure Medication Recall: Contamination Found in Generic Versions",
    summary:
      "Three manufacturers recall batches of lisinopril due to potential carcinogenic impurities. Patients advised to consult physicians.",
    category: "recalls",
    source: "FDA Safety Alert",
    publishedAt: "2024-01-14T14:20:00Z",
    readTime: "2 min",
    priority: "high",
    url: "#",
  },
  {
    id: "5",
    title: "AI-Powered Diagnostic Tool Achieves 99% Accuracy in Early Cancer Detection",
    summary:
      "Machine learning algorithm outperforms traditional screening methods in identifying early-stage cancers across multiple organ systems.",
    category: "research",
    source: "Nature Medicine",
    publishedAt: "2024-01-14T11:30:00Z",
    readTime: "6 min",
    priority: "medium",
    url: "#",
  },
  {
    id: "6",
    title: "Mental Health Apps Show Promise in Reducing Anxiety and Depression",
    summary:
      "Clinical trial results demonstrate significant improvement in mental health outcomes using evidence-based mobile applications.",
    category: "general",
    source: "American Journal of Psychiatry",
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: "4 min",
    priority: "medium",
    url: "#",
  },
]

const breakingNews = [
  "New COVID-19 variant detected with increased transmissibility",
  "FDA recalls blood pressure medication due to contamination",
  "WHO declares end to mpox public health emergency",
  "Breakthrough Alzheimer's drug shows 70% efficacy in trials",
  "CDC updates vaccination guidelines for immunocompromised adults",
]

export function HealthNews() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentBreakingIndex, setCurrentBreakingIndex] = useState(0)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Auto-scroll breaking news ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreakingIndex((prev) => (prev + 1) % breakingNews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const filteredNews =
    selectedCategory === "all" ? healthNews : healthNews.filter((item) => item.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "breaking":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "research":
        return <Brain className="h-4 w-4 text-blue-500" />
      case "vaccines":
        return <Syringe className="h-4 w-4 text-green-500" />
      case "recalls":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Newspaper className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <section id="news" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Live Health News
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest health updates, medical breakthroughs, and important safety alerts.
          </p>
        </div>

        {/* Breaking News Ticker */}
        <Card className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 animate-fade-in-scale">
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <Badge variant="destructive" className="text-xs font-semibold">
                  BREAKING
                </Badge>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-slide-in-up">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300">
                    {breakingNews[currentBreakingIndex]}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="flex-shrink-0"
              >
                <Bell className={`h-4 w-4 ${notificationsEnabled ? "text-red-500" : "text-gray-400"}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* News Categories & Stats */}
          <div className="space-y-6">
            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs orientation="vertical" value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-rows-6 h-auto">
                    <TabsTrigger value="all" className="justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      All News
                    </TabsTrigger>
                    <TabsTrigger value="breaking" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Breaking
                    </TabsTrigger>
                    <TabsTrigger value="research" className="justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      Research
                    </TabsTrigger>
                    <TabsTrigger value="vaccines" className="justify-start">
                      <Syringe className="h-4 w-4 mr-2" />
                      Vaccines
                    </TabsTrigger>
                    <TabsTrigger value="recalls" className="justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Recalls
                    </TabsTrigger>
                    <TabsTrigger value="general" className="justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      General
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">Today's Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm">New Articles</span>
                  </div>
                  <span className="text-lg font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Urgent Alerts</span>
                  </div>
                  <span className="text-lg font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Most Read</span>
                  </div>
                  <span className="text-lg font-semibold">2.1k</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News Feed */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)]">
                Latest Updates ({filteredNews.length})
              </h3>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filter by Date
              </Button>
            </div>

            <ScrollArea className="h-[800px] pr-4">
              <div className="space-y-4">
                {filteredNews.map((item, index) => (
                  <Card
                    key={item.id}
                    className={`border-l-4 ${getPriorityColor(item.priority)} hover:shadow-md transition-shadow animate-fade-in-scale`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 mb-2">
                          {getCategoryIcon(item.category)}
                          <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.priority} priority
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimeAgo(item.publishedAt)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight hover:text-primary cursor-pointer transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{item.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{item.source}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{item.readTime} read</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <span className="text-xs mr-1">Read More</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No news found</h3>
                <p className="text-muted-foreground">Try selecting a different category or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
