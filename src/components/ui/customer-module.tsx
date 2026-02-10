import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Leaf, ShoppingCart, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farmer: "Raj Kumar Farm",
    location: "Pune, Maharashtra",
    price: "₹45/kg",
    rating: 4.8,
    status: "Certified Organic",
    distance: "2.5 km",
    image: "🍅"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    farmer: "Green Valley Farm",
    location: "Nashik, Maharashtra",
    price: "₹35/kg",
    rating: 4.6,
    status: "Residue-Free",
    distance: "5.2 km",
    image: "🥕"
  },
  {
    id: 3,
    name: "Baby Spinach",
    farmer: "Organic Greens Co.",
    location: "Satara, Maharashtra",
    price: "₹25/kg",
    rating: 4.9,
    status: "Certified Organic",
    distance: "8.1 km",
    image: "🥬"
  },
  {
    id: 4,
    name: "Farm Fresh Onions",
    farmer: "Sunrise Farmers",
    location: "Solapur, Maharashtra",
    price: "₹28/kg",
    rating: 4.4,
    status: "Conventional",
    distance: "12.3 km",
    image: "🧅"
  },
]

export function CustomerModule() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Certified Organic":
        return <Badge className="bg-success text-success-foreground"><Leaf className="w-3 h-3 mr-1" />Organic</Badge>
      case "Residue-Free":
        return <Badge className="bg-secondary text-secondary-foreground"><Shield className="w-3 h-3 mr-1" />Residue-Free</Badge>
      case "Conventional":
        return <Badge variant="outline">Conventional</Badge>
      default:
        return null
    }
  }

  const addToCart = (product: any) => {
    setCart([...cart, product])
    setSelectedProduct(null)
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedProduct) {
    return (
      <div className="p-4 space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedProduct(null)}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold">Product Details</h1>
          <div />
        </div>

        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedProduct.image}</div>
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="text-muted-foreground">{selectedProduct.farmer}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-2xl text-primary">{selectedProduct.price}</span>
                {getStatusBadge(selectedProduct.status)}
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{selectedProduct.location} • {selectedProduct.distance} away</span>
              </div>

              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{selectedProduct.rating}</span>
                <span className="text-muted-foreground">(124 reviews)</span>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-secondary" />
                  Traceability Information
                </h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p>📍 Farm Location: {selectedProduct.location}</p>
                  <p>🌱 Planted: 15 days ago</p>
                  <p>💧 Last watered: Today</p>
                  <p>🔍 Quality check: Passed (Yesterday)</p>
                  <p>🚛 Harvest expected: 3-5 days</p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => addToCart(selectedProduct)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart - {selectedProduct.price}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Fresh From Farm</h1>
        <p className="text-muted-foreground">Traceable, quality produce from local farmers</p>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search products or farmers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Cart indicator */}
      {cart.length > 0 && (
        <Card className="bg-primary/10 border-primary/20 animate-bounce-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary">
                {cart.length} item(s) in cart
              </span>
              <Button size="sm" variant="outline">
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products */}
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <Card
            key={product.id}
            className="animated-border cursor-pointer hover:scale-[1.02] animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => setSelectedProduct(product)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{product.image}</div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.farmer}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">{product.price}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {product.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {getStatusBadge(product.status)}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {product.distance}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No products found matching your search.
        </div>
      )}
    </div>
  )
}