"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Cloud,
  Umbrella,
  Shield,
  Activity,
  MapPin,
  Calendar,
  TrendingUp,
  Info,
  Bell,
} from "lucide-react"

interface WeatherData {
  temperature: number
  humidity: number
  airQuality: number
  uvIndex: number
  pollen: number
  condition: string
}

interface DiseaseRisk {
  id: string
  disease: string
  riskLevel: "low" | "moderate" | "high" | "severe"
  probability: number
  factors: string[]
  symptoms: string[]
  prevention: string[]
  description: string
  icon: React.ReactNode
  color: string
}

const currentWeather: WeatherData = {
  temperature: 78,
  humidity: 65,
  airQuality: 85,
  uvIndex: 7,
  pollen: 45,
  condition: "Partly Cloudy",
}

const diseaseRisks: DiseaseRisk[] = [
  {
    id: "flu",
    disease: "Seasonal Flu",
    riskLevel: "moderate",
    probability: 35,
    factors: ["High humidity", "Temperature fluctuations", "Crowded areas"],
    symptoms: ["Fever", "Cough", "Body aches", "Fatigue"],
    prevention: ["Get vaccinated", "Wash hands frequently", "Avoid crowded places", "Wear masks"],
    description: "Increased risk due to seasonal weather patterns and humidity levels.",
    icon: <Thermometer className="h-5 w-5" />,
    color: "orange",
  },
  {
    id: "allergies",
    disease: "Seasonal Allergies",
    riskLevel: "high",
    probability: 75,
    factors: ["High pollen count", "Windy conditions", "Dry air"],
    symptoms: ["Sneezing", "Runny nose", "Itchy eyes", "Congestion"],
    prevention: ["Take antihistamines", "Keep windows closed", "Use air purifiers", "Shower after outdoor activities"],
    description: "High pollen levels and weather conditions increase allergy symptoms.",
    icon: <Wind className="h-5 w-5" />,
    color: "red",
  },
  {
    id: "dehydration",
    disease: "Heat-Related Illness",
    riskLevel: "moderate",
    probability: 40,
    factors: ["High temperature", "Low humidity", "UV exposure"],
    symptoms: ["Dizziness", "Headache", "Nausea", "Excessive thirst"],
    prevention: [
      "Drink plenty of water",
      "Stay in shade",
      "Wear light clothing",
      "Avoid outdoor activities during peak hours",
    ],
    description: "Current temperature and UV levels may lead to heat-related health issues.",
    icon: <Sun className="h-5 w-5" />,
    color: "yellow",
  },
  {
    id: "respiratory",
    disease: "Respiratory Issues",
    riskLevel: "low",
    probability: 20,
    factors: ["Air quality", "Humidity levels", "Atmospheric pressure"],
    symptoms: ["Shortness of breath", "Chest tightness", "Wheezing", "Cough"],
    prevention: ["Use air purifiers", "Avoid outdoor exercise", "Take prescribed medications", "Monitor air quality"],
    description: "Current air quality is good, but sensitive individuals should remain cautious.",
    icon: <Activity className="h-5 w-5" />,
    color: "green",
  },
]

const weeklyForecast = [
  { day: "Today", temp: 78, humidity: 65, risk: "moderate" },
  { day: "Tomorrow", temp: 82, humidity: 70, risk: "high" },
  { day: "Wed", temp: 75, humidity: 60, risk: "moderate" },
  { day: "Thu", temp: 73, humidity: 55, risk: "low" },
  { day: "Fri", temp: 79, humidity: 68, risk: "moderate" },
  { day: "Sat", temp: 85, humidity: 75, risk: "high" },
  { day: "Sun", temp: 80, humidity: 62, risk: "moderate" },
]

export function DiseaseRiskAlerts() {
  const [selectedRisk, setSelectedRisk] = useState<DiseaseRisk | null>(null)
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-500"
      case "moderate":
        return "text-yellow-500"
      case "high":
        return "text-orange-500"
      case "severe":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "low":
        return "secondary"
      case "moderate":
        return "default"
      case "high":
        return "destructive"
      case "severe":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <Umbrella className="h-5 w-5 text-blue-500" />
      default:
        return <Cloud className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Disease Risk Alerts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of health risks with real-time climate-based predictions and personalized preventive
            recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather & Air Quality */}
          <div className="space-y-6">
            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Current Conditions</span>
                </CardTitle>
                <CardDescription>Real-time environmental data affecting health risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getWeatherIcon(currentWeather.condition)}
                    <span className="text-sm">{currentWeather.condition}</span>
                  </div>
                  <span className="text-2xl font-bold">{currentWeather.temperature}°F</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Humidity</span>
                    </div>
                    <span className="text-sm font-medium">{currentWeather.humidity}%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Air Quality</span>
                    </div>
                    <Badge variant="secondary">{currentWeather.airQuality} AQI</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">UV Index</span>
                    </div>
                    <Badge variant={currentWeather.uvIndex > 6 ? "destructive" : "secondary"}>
                      {currentWeather.uvIndex}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Pollen Count</span>
                    </div>
                    <Badge variant={currentWeather.pollen > 50 ? "destructive" : "secondary"}>
                      {currentWeather.pollen}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Forecast */}
            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>7-Day Risk Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyForecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-16">{day.day}</span>
                      <div className="flex items-center space-x-2 flex-1">
                        <span className="text-sm">{day.temp}°F</span>
                        <Progress value={day.humidity} className="flex-1 h-2" />
                      </div>
                      <Badge variant={getRiskBadgeVariant(day.risk)} className="text-xs ml-2">
                        {day.risk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disease Risk Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)]">Active Risk Alerts</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className="flex items-center space-x-2"
              >
                <Bell className="h-4 w-4" />
                <span>{alertsEnabled ? "Disable" : "Enable"} Alerts</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diseaseRisks.map((risk) => (
                <Card
                  key={risk.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg animate-fade-in-scale ${
                    selectedRisk?.id === risk.id ? "ring-2 ring-primary animate-glow" : ""
                  }`}
                  onClick={() => setSelectedRisk(selectedRisk?.id === risk.id ? null : risk)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-${risk.color}-100 dark:bg-${risk.color}-950/20`}>
                          {risk.icon}
                        </div>
                        <div>
                          <CardTitle className="text-sm">{risk.disease}</CardTitle>
                          <CardDescription className="text-xs">{risk.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getRiskBadgeVariant(risk.riskLevel)} className="text-xs">
                        {risk.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Probability</span>
                        <span className="text-sm font-medium">{risk.probability}%</span>
                      </div>
                      <Progress value={risk.probability} className="h-2" />

                      {selectedRisk?.id === risk.id && (
                        <div className="mt-4 space-y-4 animate-slide-in-up">
                          <Tabs defaultValue="factors" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="factors" className="text-xs">
                                Factors
                              </TabsTrigger>
                              <TabsTrigger value="symptoms" className="text-xs">
                                Symptoms
                              </TabsTrigger>
                              <TabsTrigger value="prevention" className="text-xs">
                                Prevention
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="factors" className="mt-3">
                              <div className="space-y-2">
                                {risk.factors.map((factor, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs">
                                    <TrendingUp className="h-3 w-3 text-orange-500" />
                                    <span>{factor}</span>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="symptoms" className="mt-3">
                              <div className="space-y-2">
                                {risk.symptoms.map((symptom, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs">
                                    <AlertTriangle className="h-3 w-3 text-red-500" />
                                    <span>{symptom}</span>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="prevention" className="mt-3">
                              <div className="space-y-2">
                                {risk.prevention.map((tip, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs">
                                    <Shield className="h-3 w-3 text-green-500" />
                                    <span>{tip}</span>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Health Recommendations */}
            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  <span>Today's Health Recommendations</span>
                </CardTitle>
                <CardDescription>Personalized advice based on current conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>High Pollen Alert</AlertTitle>
                    <AlertDescription>
                      Pollen levels are elevated today. Consider taking antihistamines and keeping windows closed.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Sun className="h-4 w-4" />
                    <AlertTitle>UV Protection Needed</AlertTitle>
                    <AlertDescription>
                      UV index is high (7). Wear sunscreen, sunglasses, and protective clothing when outdoors.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <Droplets className="h-4 w-4" />
                    <AlertTitle>Stay Hydrated</AlertTitle>
                    <AlertDescription>
                      High temperature and moderate humidity. Increase water intake and avoid prolonged sun exposure.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
