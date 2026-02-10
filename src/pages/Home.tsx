import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RoleSelection } from "@/components/ui/role-selection"
import { ProductCategories } from "@/components/ui/product-categories"
import { FarmerModule } from "@/components/ui/farmer-module"
import { CustomerModule } from "@/components/ui/customer-module"
import { NavigationBar } from "@/components/ui/navigation-bar"
import { ArrowLeft, Sparkles } from "lucide-react"
import heroImage from "@/assets/hero-agrilink.jpg"

type UserRole = "farmer" | "customer" | null
type ActiveTab = "home" | "location" | "profile"
type HomeView = "welcome" | "categories" | "dashboard"

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>("home")
  const [homeView, setHomeView] = useState<HomeView>("welcome")

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role)
    setHomeView("categories")
  }

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab)
    if (tab === "home") {
      setHomeView(userRole ? "categories" : "welcome")
    }
  }

  const handleCategorySelect = () => {
    setHomeView("dashboard")
  }

  const handleBackToWelcome = () => {
    setUserRole(null)
    setHomeView("welcome")
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
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div
                className="h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-6 text-center">
                  <div className="fade-slide-up">
                    <h1 className="text-4xl font-bold gradient-text mb-3 tracking-tight">
                      AgriLink
                    </h1>
                    <p className="text-muted-foreground text-lg font-medium">
                      Farm Fresh • Directly to You • Traceable
                    </p>
                    <div className="flex items-center justify-center mt-3 space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-20 px-4">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 fade-slide-up" style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-2xl font-bold mb-2 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary mr-2 heartbeat" />
                    Choose Your Journey
                    <Sparkles className="w-6 h-6 text-primary ml-2 heartbeat" />
                  </h2>
                  <p className="text-muted-foreground">Connect directly with nature's bounty</p>
                </div>

                <RoleSelection onRoleSelect={handleRoleSelect} />

                <div className="mt-12 grid grid-cols-3 gap-4 fade-slide-up" style={{ animationDelay: '0.6s' }}>
                  <div className="text-center">
                    <div className="text-3xl mb-2 float">🌱</div>
                    <p className="text-sm font-medium">Fresh</p>
                    <p className="text-xs text-muted-foreground">Daily harvest</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2 float" style={{ animationDelay: '0.5s' }}>🤝</div>
                    <p className="text-sm font-medium">Direct</p>
                    <p className="text-xs text-muted-foreground">No middlemen</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2 float" style={{ animationDelay: '1s' }}>✅</div>
                    <p className="text-sm font-medium">Verified</p>
                    <p className="text-xs text-muted-foreground">Quality assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "categories":
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
            {/* Header with back button */}
            <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToWelcome}
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