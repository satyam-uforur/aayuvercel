"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Hospital, Stethoscope, Pill, Phone, Clock, Star, Navigation, Search } from "lucide-react"

interface HealthcareFacility {
  id: number
  name: string
  type: "hospital" | "clinic" | "pharmacy"
  address: string
  phone: string
  rating: number
  distance: string
  openHours: string
  services: string[]
  emergency: boolean
  coordinates: { lat: number; lng: number }
}

const healthcareFacilities: HealthcareFacility[] = [
  {
    id: 1,
    name: "City General Hospital",
    type: "hospital",
    address: "123 Medical Center Dr, Downtown",
    phone: "(555) 123-4567",
    rating: 4.5,
    distance: "0.8 miles",
    openHours: "24/7",
    services: ["Emergency Care", "Surgery", "ICU", "Cardiology", "Neurology"],
    emergency: true,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    name: "HealthFirst Clinic",
    type: "clinic",
    address: "456 Wellness Ave, Midtown",
    phone: "(555) 234-5678",
    rating: 4.2,
    distance: "1.2 miles",
    openHours: "8:00 AM - 8:00 PM",
    services: ["General Practice", "Pediatrics", "Dermatology", "Lab Tests"],
    emergency: false,
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 3,
    name: "MediCare Pharmacy",
    type: "pharmacy",
    address: "789 Health St, Uptown",
    phone: "(555) 345-6789",
    rating: 4.0,
    distance: "0.5 miles",
    openHours: "9:00 AM - 9:00 PM",
    services: ["Prescription Filling", "Vaccinations", "Health Screenings", "Consultation"],
    emergency: false,
    coordinates: { lat: 40.7831, lng: -73.9712 },
  },
  {
    id: 4,
    name: "Emergency Medical Center",
    type: "hospital",
    address: "321 Urgent Care Blvd, Eastside",
    phone: "(555) 456-7890",
    rating: 4.3,
    distance: "2.1 miles",
    openHours: "24/7",
    services: ["Emergency Care", "Urgent Care", "X-Ray", "Lab Tests"],
    emergency: true,
    coordinates: { lat: 40.7282, lng: -73.7949 },
  },
  {
    id: 5,
    name: "Family Health Clinic",
    type: "clinic",
    address: "654 Community Way, Westside",
    phone: "(555) 567-8901",
    rating: 4.4,
    distance: "1.8 miles",
    openHours: "7:00 AM - 7:00 PM",
    services: ["Family Medicine", "Women's Health", "Mental Health", "Preventive Care"],
    emergency: false,
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: 6,
    name: "QuickMeds Pharmacy",
    type: "pharmacy",
    address: "987 Express Lane, Southside",
    phone: "(555) 678-9012",
    rating: 3.9,
    distance: "1.5 miles",
    openHours: "8:00 AM - 10:00 PM",
    services: ["24hr Prescription", "Drive-through", "Delivery", "Health Products"],
    emergency: false,
    coordinates: { lat: 40.6892, lng: -74.0445 },
  },
]

export function HealthcareMap() {
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null)
  const [filterType, setFilterType] = useState<"all" | "hospital" | "clinic" | "pharmacy">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFacilities = healthcareFacilities.filter((facility) => {
    const matchesType = filterType === "all" || facility.type === filterType
    const matchesSearch =
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesType && matchesSearch
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return <Hospital className="h-5 w-5" />
      case "clinic":
        return <Stethoscope className="h-5 w-5" />
      case "pharmacy":
        return <Pill className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "text-red-500"
      case "clinic":
        return "text-blue-500"
      case "pharmacy":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <section id="map" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Find Healthcare Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Locate hospitals, clinics, and pharmacies in your area with real-time information and directions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden">
              <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search facilities or services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Tabs value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all" className="text-xs">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="hospital" className="text-xs">
                        Hospitals
                      </TabsTrigger>
                      <TabsTrigger value="clinic" className="text-xs">
                        Clinics
                      </TabsTrigger>
                      <TabsTrigger value="pharmacy" className="text-xs">
                        Pharmacies
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>

              {/* Mock Map with Animated Markers */}
              <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 relative pt-24">
                <div className="absolute inset-0 bg-[url('/city-map-streets.jpg')] bg-cover bg-center opacity-20" />

                {/* Animated Markers */}
                {filteredFacilities.map((facility, index) => (
                  <div
                    key={facility.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-fade-in-scale`}
                    style={{
                      left: `${20 + (index % 3) * 25}%`,
                      top: `${30 + Math.floor(index / 3) * 20}%`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-background border-2 border-primary shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${
                        selectedFacility?.id === facility.id ? "animate-glow ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className={getTypeColor(facility.type)}>{getTypeIcon(facility.type)}</div>
                    </div>
                    {facility.emergency && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h4 className="font-semibold mb-2 text-sm">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Hospitals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span>Clinics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Pharmacies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                      <span>24/7 Emergency</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Facility List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">
                Nearby Facilities ({filteredFacilities.length})
              </h3>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredFacilities.map((facility) => (
                <Card
                  key={facility.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedFacility?.id === facility.id ? "ring-2 ring-primary animate-glow" : ""
                  }`}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-muted ${getTypeColor(facility.type)}`}>
                          {getTypeIcon(facility.type)}
                        </div>
                        <div>
                          <CardTitle className="text-sm">{facility.name}</CardTitle>
                          <CardDescription className="text-xs">{facility.distance}</CardDescription>
                        </div>
                      </div>
                      {facility.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          24/7
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{facility.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{facility.openHours}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{facility.rating}</span>
                        <span className="text-muted-foreground">rating</span>
                      </div>
                    </div>

                    {selectedFacility?.id === facility.id && (
                      <div className="mt-4 pt-4 border-t border-border animate-slide-in-up">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Services</h4>
                            <div className="flex flex-wrap gap-1">
                              {facility.services.map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Navigation className="h-3 w-3 mr-1" />
                              Directions
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFacilities.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No facilities found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
