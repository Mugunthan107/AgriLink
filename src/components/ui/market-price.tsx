import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarketItem {
  id: string
  name: string
  emoji: string
  currentPrice: number
  yesterdayPrice: number
  unit: string
  category: string
  trend: "up" | "down" | "stable"
  changePercent: number
}

const marketData: MarketItem[] = [
  {
    id: "1",
    name: "Tomato",
    emoji: "🍅",
    currentPrice: 35,
    yesterdayPrice: 40,
    unit: "kg",
    category: "Vegetables",
    trend: "down",
    changePercent: -12.5
  },
  {
    id: "2",
    name: "Onion",
    emoji: "🧅",
    currentPrice: 25,
    yesterdayPrice: 22,
    unit: "kg",
    category: "Vegetables",
    trend: "up",
    changePercent: 13.6
  },
  {
    id: "3",
    name: "Potato",
    emoji: "🥔",
    currentPrice: 20,
    yesterdayPrice: 20,
    unit: "kg",
    category: "Vegetables",
    trend: "stable",
    changePercent: 0
  },
  {
    id: "4",
    name: "Rice",
    emoji: "🍚",
    currentPrice: 45,
    yesterdayPrice: 43,
    unit: "kg",
    category: "Grains",
    trend: "up",
    changePercent: 4.7
  },
  {
    id: "5",
    name: "Wheat",
    emoji: "🌾",
    currentPrice: 38,
    yesterdayPrice: 40,
    unit: "kg",
    category: "Grains",
    trend: "down",
    changePercent: -5.0
  },
  {
    id: "6",
    name: "Milk",
    emoji: "🥛",
    currentPrice: 55,
    yesterdayPrice: 55,
    unit: "liter",
    category: "Dairy",
    trend: "stable",
    changePercent: 0
  }
]

export function MarketPrice() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4" />
      case "down": return <TrendingDown className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-destructive bg-destructive/10 border-destructive/20"
      case "down": return "text-success bg-success/10 border-success/20"
      default: return "text-muted-foreground bg-muted/20 border-muted/30"
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-slide-up">
          <h2 className="text-4xl font-bold mb-4">Today's Market Prices</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time pricing from local markets. Updated daily to ensure fair and transparent pricing.
          </p>
          <div className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {marketData.map((item, index) => (
            <Card 
              key={item.id} 
              className="card-premium hover:shadow-lift transition-all duration-300 hover:-translate-y-1 fade-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{item.emoji}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  
                  <Badge className={`${getTrendColor(item.trend)} flex items-center gap-1`}>
                    {getTrendIcon(item.trend)}
                    {item.changePercent !== 0 && (
                      <span>{Math.abs(item.changePercent)}%</span>
                    )}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{item.currentPrice}
                      <span className="text-sm text-muted-foreground font-normal">/{item.unit}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Yesterday:</span>
                    <span className="text-muted-foreground">₹{item.yesterdayPrice}/{item.unit}</span>
                  </div>

                  <div className="border-t border-border pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Change:</span>
                      <span className={`font-medium ${
                        item.trend === "up" ? "text-destructive" : 
                        item.trend === "down" ? "text-success" : 
                        "text-muted-foreground"
                      }`}>
                        {item.changePercent > 0 ? "+" : ""}
                        ₹{(item.currentPrice - item.yesterdayPrice).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Insights */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 fade-slide-up" style={{ animationDelay: '0.8s' }}>
          <Card className="card-premium text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-2">Market Trend</h3>
              <p className="text-sm text-muted-foreground">
                Prices are stabilizing with seasonal adjustments
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-premium text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🏪</div>
              <h3 className="font-semibold mb-2">Active Markets</h3>
              <p className="text-sm text-muted-foreground">
                Data from 15+ local wholesale markets
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-premium text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-semibold mb-2">Update Frequency</h3>
              <p className="text-sm text-muted-foreground">
                Real-time updates every 30 minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}