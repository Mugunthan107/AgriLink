import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoleSelection } from "@/components/ui/role-selection"
import { ProductCategories } from "@/components/ui/product-categories"
import { FarmerModule } from "@/components/ui/farmer-module"
import { CustomerModule } from "@/components/ui/customer-module"
import { NavigationBar } from "@/components/ui/navigation-bar"
import { ArrowLeft, Sparkles } from "lucide-react"
import heroImage from "@/assets/hero-agrilink.jpg"
import { useAuth } from "@/context/auth-context"
import { useNavigate } from "react-router-dom"

type ActiveTab = "home" | "location" | "profile"
type HomeView = "welcome" | "categories" | "dashboard"

export default function Home() {
  const { user, userRole, loading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ActiveTab>("home")
  const [homeView, setHomeView] = useState<HomeView>("welcome")

  useEffect(() => {
    if (!loading && !user) {
      navigate("/")
    } else if (!loading && user && userRole) {
      // If user is logged in, default to dashboard or categories appropriately
      // For now, let's just ensure they can access the modules
      if (homeView === 'welcome') {
        setHomeView('categories')
      }
    }
  }, [user, loading, navigate, userRole, homeView])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab)
    if (tab === "home") {
      setHomeView(user ? "categories" : "welcome")
    }
  }

  const handleCategorySelect = () => {
    setHomeView("dashboard")
  }

  const handleBackToCategories = () => {
    setHomeView("categories")
  }

  const renderContent = () => {
    if (activeTab === "location") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-secondary/5">
          {/* Header with back button */}
          <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("home")}
                className="fade-slide-left"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold gradient-text">Location & Delivery</h1>
              </div>
              <div className="w-16" />
            </div>
          </div>

          <div className="p-4 space-y-6 pb-20">
            <div className="text-center fade-slide-up">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary mr-2 heartbeat" />
                <h2 className="text-2xl font-bold">Find Farms Near You</h2>
                <Sparkles className="w-6 h-6 text-primary ml-2 heartbeat" />
              </div>
              <p className="text-muted-foreground">Discover local farms and delivery options in your area</p>
            </div>

            <Card className="card-premium fade-slide-up shadow-lift">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-full h-64 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                    <div className="shimmer absolute inset-0" />
                    <div className="text-center z-10">
                      <div className="text-6xl mb-2 float">📍</div>
                      <span className="text-lg font-medium text-muted-foreground">Interactive Map View</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl mb-2">🚚</div>
                      <p className="text-sm font-medium">Free Delivery</p>
                      <p className="text-xs text-muted-foreground">Within 10km</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-105">
                      <div className="text-2xl mb-2">⏰</div>
                      <p className="text-sm font-medium">Same Day</p>
                      <p className="text-xs text-muted-foreground">Before 2 PM</p>
                    </div>
                  </div>

                  <Button className="w-full btn-primary-glow">
                    Find Farms Near Me
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="card-premium fade-slide-left">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-xl mr-2">🌾</span>
                    Active Farms
                  </h3>
                  <p className="text-2xl font-bold text-secondary">47</p>
                  <p className="text-xs text-muted-foreground">farms in your area</p>
                </CardContent>
              </Card>

              <Card className="card-premium fade-slide-right">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <span className="text-xl mr-2">📦</span>
                    Today's Orders
                  </h3>
                  <p className="text-2xl font-bold text-primary">324</p>
                  <p className="text-xs text-muted-foreground">orders being delivered</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )
    }

    if (activeTab === "profile") {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-accent/5">
          {/* Header with back button */}
          <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("home")}
                className="fade-slide-left"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="text-center">
                <h1 className="text-xl font-bold gradient-text">
                  {userRole === "customer" ? "Shopping Cart" : "Profile"}
                </h1>
              </div>
              <div className="w-16" />
            </div>
          </div>

          <div className="p-4 space-y-6 pb-20">
            <div className="text-center fade-slide-up">
              <div className="flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary mr-2 heartbeat" />
                <h2 className="text-2xl font-bold">
                  {userRole === "customer" ? "Your Cart" : "Your Profile"}
                </h2>
                <Sparkles className="w-6 h-6 text-primary ml-2 heartbeat" />
              </div>
              <p className="text-muted-foreground">
                {userRole === "customer"
                  ? "Review and manage your selected items"
                  : "Manage your account and preferences"
                }
              </p>
            </div>

            <Card className="card-premium fade-slide-up shadow-lift">
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  {userRole === "customer" ? (
                    <>
                      <div className="text-8xl mb-6 scale-bounce">🛒</div>
                      <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Browse our fresh products to start adding items to your cart
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <div className="text-2xl mb-2">💝</div>
                          <p className="text-sm font-medium">Free Samples</p>
                          <p className="text-xs text-muted-foreground">Try before buy</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <div className="text-2xl mb-2">🔄</div>
                          <p className="text-sm font-medium">Easy Returns</p>
                          <p className="text-xs text-muted-foreground">100% guarantee</p>
                        </div>
                      </div>
                      <Button className="w-full btn-primary-glow" onClick={() => setActiveTab("home")}>
                        Start Shopping
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-8xl mb-6 scale-bounce">👨‍🌾</div>
                      <h3 className="text-xl font-semibold mb-2">Welcome, Farmer!</h3>
                      <p className="text-muted-foreground mb-6">
                        Manage your profile, products, and farm details
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <div className="text-2xl mb-2">📊</div>
                          <p className="text-sm font-medium">Analytics</p>
                          <p className="text-xs text-muted-foreground">Track sales</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/30">
                          <div className="text-2xl mb-2">🏆</div>
                          <p className="text-sm font-medium">Badges</p>
                          <p className="text-xs text-muted-foreground">Earn trust</p>
                        </div>
                      </div>
                      <Button className="w-full btn-primary-glow">
                        Edit Profile
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    // Home tab content
    switch (homeView) {
      case "welcome":
        // Should not happen if redirected, but as fallback
        return null

      case "categories":
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
            {/* Header with back button */}
            <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="fade-slide-left"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="text-center">
                  <h1 className="text-xl font-bold gradient-text">Product Categories</h1>
                  <p className="text-xs text-muted-foreground">
                    {userRole === "farmer" ? "Manage your products" : "Browse fresh produce"}
                  </p>
                </div>
                <div className="w-16" />
              </div>
            </div>

            <div className="pb-20">
              <ProductCategories onCategorySelect={handleCategorySelect} />
            </div>
          </div>
        )

      case "dashboard":
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-primary/5">
            {/* Header with back button */}
            <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToCategories}
                  className="fade-slide-left"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="text-center flex items-center justify-center space-x-2">
                  <img
                    src="/leaf-icon.svg"
                    alt="AgriLink Leaf"
                    className="w-6 h-6"
                  />
                  <h1 className="text-xl font-bold gradient-text">
                    {userRole === "farmer" ? "Farmer Dashboard" : "Customer Hub"}
                  </h1>
                </div>
                <div className="w-16" />
              </div>
            </div>

            {userRole === "farmer" ? <FarmerModule /> : <CustomerModule />}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}

      {userRole && (
        <NavigationBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userRole={userRole}
        />
      )}
    </div>
  )
}