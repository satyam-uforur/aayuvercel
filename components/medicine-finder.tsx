"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Pill, AlertTriangle, DollarSign, Clock, ChevronDown, ChevronUp } from "lucide-react"

// Mock medicine data
const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    genericName: "Acetaminophen",
    category: "Analgesic",
    manufacturer: "Generic Pharma",
    price: "$5.99",
    uses: ["Fever reduction", "Pain relief", "Headache", "Body aches"],
    dosage: "Adults: 500-1000mg every 4-6 hours. Maximum 4g per day.",
    sideEffects: ["Nausea", "Stomach upset", "Rare: liver damage with overdose"],
    alternatives: ["Ibuprofen", "Aspirin", "Naproxen"],
    warnings: ["Do not exceed recommended dose", "Avoid alcohol", "Consult doctor if pregnant"],
    description: "A common over-the-counter pain reliever and fever reducer.",
  },
  {
    id: 2,
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    category: "Antibiotic",
    manufacturer: "MedLife Pharma",
    price: "$12.50",
    uses: ["Bacterial infections", "Respiratory tract infections", "Urinary tract infections", "Skin infections"],
    dosage: "Adults: 250-500mg every 8 hours for 7-10 days.",
    sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Allergic reactions"],
    alternatives: ["Cephalexin", "Azithromycin", "Clindamycin"],
    warnings: ["Complete full course", "Inform doctor of allergies", "May reduce birth control effectiveness"],
    description: "A penicillin-type antibiotic used to treat various bacterial infections.",
  },
  {
    id: 3,
    name: "Omeprazole",
    genericName: "Omeprazole",
    category: "Antacid",
    manufacturer: "GastroHealth Inc",
    price: "$8.75",
    uses: ["Acid reflux", "GERD", "Stomach ulcers", "Heartburn"],
    dosage: "Adults: 20-40mg once daily before breakfast.",
    sideEffects: ["Headache", "Diarrhea", "Abdominal pain", "Nausea"],
    alternatives: ["Lansoprazole", "Pantoprazole", "Ranitidine"],
    warnings: ["Long-term use may affect bone health", "May interact with other medications"],
    description: "A proton pump inhibitor that reduces stomach acid production.",
  },
  {
    id: 4,
    name: "Metformin",
    genericName: "Metformin HCl",
    category: "Antidiabetic",
    manufacturer: "DiabCare Pharma",
    price: "$15.25",
    uses: ["Type 2 diabetes", "Blood sugar control", "PCOS", "Prediabetes"],
    dosage: "Adults: Start with 500mg twice daily with meals. May increase gradually.",
    sideEffects: ["Nausea", "Diarrhea", "Metallic taste", "Vitamin B12 deficiency"],
    alternatives: ["Glipizide", "Glyburide", "Sitagliptin"],
    warnings: ["Monitor kidney function", "Risk of lactic acidosis", "Take with food"],
    description: "First-line medication for type 2 diabetes that improves insulin sensitivity.",
  },
]

export function MedicineFinder() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [filteredMedicines, setFilteredMedicines] = useState(medicines)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      setFilteredMedicines(medicines)
    } else {
      const filtered = medicines.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(term.toLowerCase()) ||
          medicine.genericName.toLowerCase().includes(term.toLowerCase()) ||
          medicine.category.toLowerCase().includes(term.toLowerCase()) ||
          medicine.uses.some((use) => use.toLowerCase().includes(term.toLowerCase())),
      )
      setFilteredMedicines(filtered)
    }
  }

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section id="medicine" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-poppins)] mb-4">
            Medicine Finder
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search for any medicine to get detailed information about uses, dosage, side effects, and alternatives.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search medicines by name, category, or condition..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 focus:border-primary transition-all duration-300 animate-fade-in-scale"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card
              key={medicine.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                expandedCard === medicine.id ? "ring-2 ring-primary animate-glow" : ""
              }`}
              onClick={() => toggleCard(medicine.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-[family-name:var(--font-poppins)] mb-2">
                      {medicine.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {medicine.genericName} • {medicine.manufacturer}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {medicine.category}
                    </Badge>
                    <span className="text-lg font-semibold text-primary">{medicine.price}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{medicine.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Pill className="h-4 w-4" />
                    <span>{medicine.uses.length} uses</span>
                  </div>
                  {expandedCard === medicine.id ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Expanded Content */}
                {expandedCard === medicine.id && (
                  <div className="mt-6 animate-slide-in-up">
                    <Tabs defaultValue="uses" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="uses" className="text-xs">
                          Uses
                        </TabsTrigger>
                        <TabsTrigger value="dosage" className="text-xs">
                          Dosage
                        </TabsTrigger>
                        <TabsTrigger value="effects" className="text-xs">
                          Effects
                        </TabsTrigger>
                        <TabsTrigger value="alternatives" className="text-xs">
                          Alternatives
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="uses" className="mt-4">
                        <div className="space-y-2">
                          {medicine.uses.map((use, index) => (
                            <Badge key={index} variant="outline" className="mr-2 mb-2">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="dosage" className="mt-4">
                        <div className="flex items-start space-x-2">
                          <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm text-foreground">{medicine.dosage}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="effects" className="mt-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                              Side Effects
                            </h4>
                            <div className="space-y-1">
                              {medicine.sideEffects.map((effect, index) => (
                                <p key={index} className="text-xs text-muted-foreground">
                                  • {effect}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                              Warnings
                            </h4>
                            <div className="space-y-1">
                              {medicine.warnings.map((warning, index) => (
                                <p key={index} className="text-xs text-muted-foreground">
                                  • {warning}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="alternatives" className="mt-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 flex items-center">
                            <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                            Generic Alternatives
                          </h4>
                          <div className="space-y-2">
                            {medicine.alternatives.map((alt, index) => (
                              <Badge key={index} variant="secondary" className="mr-2 mb-2">
                                {alt}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No medicines found</h3>
            <p className="text-muted-foreground">Try searching with different keywords or check your spelling.</p>
          </div>
        )}

        {/* Floating Action Button for Quick Search */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg animate-glow hover:scale-110 transition-transform"
            onClick={() => document.getElementById("medicine")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
