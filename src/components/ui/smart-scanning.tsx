import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scan, Camera, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface ScanResult {
  status: "scanning" | "analyzing" | "complete"
  quality: "organic" | "residue-free" | "conventional"
  confidence: number
  details: {
    pesticides: string
    freshness: string
    origin: string
    harvestDate: string
  }
}

export function SmartScanning() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scanProgress, setScanProgress] = useState(0)

  const startScan = () => {
    setIsScanning(true)
    setScanResult({
      status: "scanning",
      quality: "conventional",
      confidence: 0,
      details: {
        pesticides: "Analyzing...",
        freshness: "Calculating...",
        origin: "Locating...",
        harvestDate: "Processing..."
      }
    })
    setScanProgress(0)
  }

  useEffect(() => {
    if (isScanning && scanResult) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = prev + Math.random() * 15
          
          if (newProgress >= 30 && scanResult.status === "scanning") {
            setScanResult(prev => prev ? { ...prev, status: "analyzing" } : null)
          }
          
          if (newProgress >= 100) {
            setIsScanning(false)
            setScanResult({
              status: "complete",
              quality: "organic",
              confidence: 94,
              details: {
                pesticides: "No residues detected",
                freshness: "98% - Harvested today",
                origin: "Organic Farm, Pune",
                harvestDate: "2024-01-15"
              }
            })
            clearInterval(interval)
          }
          
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isScanning, scanResult])

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "organic": return "text-success bg-success/10 border-success/20"
      case "residue-free": return "text-secondary bg-secondary/10 border-secondary/20"
      default: return "text-warning bg-warning/10 border-warning/20"
    }
  }

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case "organic": return <CheckCircle className="w-4 h-4" />
      case "residue-free": return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-slide-up">
          <h2 className="text-4xl font-bold mb-4">Smart Scanning Technology</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verify product quality instantly with our AI-powered scanning system. 
            Know exactly what you're buying before you buy it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Scanning Interface */}
          <div className="fade-slide-up">
            <Card className="card-premium shadow-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center">Product Scanner</h3>
                
                {/* Scanner Viewport */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-muted/30 to-background rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center mb-6 overflow-hidden">
                    {!scanResult ? (
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                        <p className="text-muted-foreground">Position product in frame</p>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        {/* Mock product image */}
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                          <div className="text-6xl">🥕</div>
                        </div>
                        
                        {/* Scanning overlay */}
                        {isScanning && (
                          <div className="absolute inset-0 scan-animation rounded-lg">
                            <div className="absolute inset-4 border-2 border-primary rounded-lg">
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
                              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
                              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
                              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isScanning && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          {scanResult?.status === "scanning" ? "Scanning..." : 
                           scanResult?.status === "analyzing" ? "Analyzing..." : "Complete"}
                        </span>
                        <span className="text-primary font-medium">{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 progress-animated">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Scan Button */}
                  <Button 
                    onClick={startScan}
                    disabled={isScanning}
                    className="w-full btn-primary-glow text-lg py-6"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5 mr-2" />
                        Start Scan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="fade-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-premium shadow-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">Scan Results</h3>
                
                {!scanResult ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-muted-foreground">Scan a product to see detailed results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Quality Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quality Status:</span>
                      <Badge className={`${getQualityColor(scanResult.quality)} flex items-center gap-2`}>
                        {getQualityIcon(scanResult.quality)}
                        {scanResult.quality === "organic" ? "Certified Organic" :
                         scanResult.quality === "residue-free" ? "Residue-Free" : "Conventional"}
                      </Badge>
                    </div>

                    {/* Confidence Score */}
                    {scanResult.status === "complete" && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Confidence:</span>
                        <span className="text-lg font-bold text-primary">{scanResult.confidence}%</span>
                      </div>
                    )}

                    {/* Detailed Results */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Pesticides:</p>
                          <p className="text-sm text-muted-foreground">{scanResult.details.pesticides}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Freshness:</p>
                          <p className="text-sm text-muted-foreground">{scanResult.details.freshness}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Origin:</p>
                          <p className="text-sm text-muted-foreground">{scanResult.details.origin}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Harvest Date:</p>
                          <p className="text-sm text-muted-foreground">{scanResult.details.harvestDate}</p>
                        </div>
                      </div>
                    </div>

                    {scanResult.status === "complete" && (
                      <div className="border-t border-border pt-4">
                        <div className="flex items-center text-sm text-success">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Verified by AgriLink Quality Lab
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}