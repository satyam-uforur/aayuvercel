"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Activity, Heart, Thermometer, Droplets, AlertTriangle, TrendingUp, TrendingDown, Clock } from "lucide-react"

// Mock health data
const healthMetrics = {
  heartRate: { current: 72, trend: "stable", data: [68, 70, 72, 74, 71, 73, 72] },
  bloodPressure: { systolic: 120, diastolic: 80, trend: "good" },
  temperature: { current: 98.6, trend: "normal" },
  hydration: { current: 65, target: 100, trend: "low" },
  sleep: { current: 7.2, target: 8, trend: "good" },
  steps: { current: 8420, target: 10000, trend: "good" },
}

const weeklyHealthData = [
  { day: "Mon", heartRate: 68, steps: 8200, sleep: 7.5, hydration: 70 },
  { day: "Tue", heartRate: 70, steps: 9100, sleep: 6.8, hydration: 65 },
  { day: "Wed", heartRate: 72, steps: 7800, sleep: 7.2, hydration: 80 },
  { day: "Thu", heartRate: 74, steps: 10200, sleep: 8.1, hydration: 75 },
  { day: "Fri", heartRate: 71, steps: 9500, sleep: 7.0, hydration: 60 },
  { day: "Sat", heartRate: 73, steps: 11000, sleep: 8.5, hydration: 85 },
  { day: "Sun", heartRate: 72, steps: 8420, sleep: 7.2, hydration: 65 },
]

const medicineUsage = [
  { name: "Vitamins", value: 40, color: "#10b981" },
  { name: "Pain Relief", value: 25, color: "#3b82f6" },
  { name: "Antibiotics", value: 20, color: "#f59e0b" },
  { name: "Others", value: 15, color: "#8b5cf6" },
]

const riskFactors = [
  { factor: "Cardiovascular", risk: 15, status: "low", color: "green" },
  { factor: "Diabetes", risk: 25, status: "moderate", color: "yellow" },
  { factor: "Hypertension", risk: 10, status: "low", color: "green" },
  { factor: "Respiratory", risk: 35, status: "moderate", color: "yellow" },
]

export function HealthDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "normal":
      case "low":
        return "text-green-500"
      case "moderate":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  return (
    <section id="dashboard" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Health Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your health metrics, monitor trends, and get personalized insights for better wellness management.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="animate-fade-in-scale hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.heartRate.current} bpm</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {getTrendIcon(healthMetrics.heartRate.trend)}
                    <span className={getStatusColor(healthMetrics.heartRate.trend)}>
                      {healthMetrics.heartRate.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {healthMetrics.bloodPressure.systolic}/{healthMetrics.bloodPressure.diastolic}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {getTrendIcon(healthMetrics.bloodPressure.trend)}
                    <span className={getStatusColor(healthMetrics.bloodPressure.trend)}>
                      {healthMetrics.bloodPressure.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <Thermometer className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.temperature.current}°F</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {getTrendIcon(healthMetrics.temperature.trend)}
                    <span className={getStatusColor(healthMetrics.temperature.trend)}>
                      {healthMetrics.temperature.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hydration</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthMetrics.hydration.current}%</div>
                  <Progress value={healthMetrics.hydration.current} className="mt-2" />
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                    <span className={getStatusColor(healthMetrics.hydration.trend)}>
                      {healthMetrics.hydration.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">Daily Goals</CardTitle>
                  <CardDescription>Track your progress towards daily health targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Steps</span>
                      <span>
                        {healthMetrics.steps.current.toLocaleString()} / {healthMetrics.steps.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(healthMetrics.steps.current / healthMetrics.steps.target) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sleep</span>
                      <span>
                        {healthMetrics.sleep.current}h / {healthMetrics.sleep.target}h
                      </span>
                    </div>
                    <Progress value={(healthMetrics.sleep.current / healthMetrics.sleep.target) * 100} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Hydration</span>
                      <span>
                        {healthMetrics.hydration.current}% / {healthMetrics.hydration.target}%
                      </span>
                    </div>
                    <Progress value={healthMetrics.hydration.current} />
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">Medicine Usage</CardTitle>
                  <CardDescription>Distribution of your current medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={medicineUsage}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {medicineUsage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {medicineUsage.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)]">Health Trends</h3>
              <div className="flex space-x-2">
                <Button
                  variant={selectedPeriod === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("week")}
                >
                  Week
                </Button>
                <Button
                  variant={selectedPeriod === "month" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod("month")}
                >
                  Month
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Heart Rate Trends</CardTitle>
                  <CardDescription>Your heart rate over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyHealthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Activity Levels</CardTitle>
                  <CardDescription>Daily steps and activity patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyHealthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="steps" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Sleep & Hydration</CardTitle>
                  <CardDescription>Sleep hours and hydration levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyHealthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sleep" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                        <Area type="monotone" dataKey="hydration" stackId="2" stroke="#06b6d4" fill="#06b6d4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Health Insights</CardTitle>
                  <CardDescription>AI-powered recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Great Progress!</p>
                      <p className="text-xs text-muted-foreground">
                        Your heart rate has been stable this week. Keep up the good work!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Hydration Alert</p>
                      <p className="text-xs text-muted-foreground">
                        You're below your hydration goal. Try to drink more water throughout the day.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Sleep Recommendation</p>
                      <p className="text-xs text-muted-foreground">
                        Consider going to bed 30 minutes earlier to reach your 8-hour sleep goal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-6">
            <Card className="animate-fade-in-scale">
              <CardHeader>
                <CardTitle className="text-lg font-[family-name:var(--font-poppins)]">Health Risk Assessment</CardTitle>
                <CardDescription>
                  Based on your health data, lifestyle, and family history. Consult your doctor for detailed evaluation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskFactors.map((risk, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{risk.factor}</span>
                        <Badge
                          variant={
                            risk.status === "low" ? "secondary" : risk.status === "moderate" ? "default" : "destructive"
                          }
                        >
                          {risk.status} risk
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={risk.risk} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-12">{risk.risk}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Schedule regular check-ups with your healthcare provider</li>
                    <li>• Maintain a balanced diet and regular exercise routine</li>
                    <li>• Monitor your blood pressure and heart rate regularly</li>
                    <li>• Consider lifestyle modifications to reduce risk factors</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
