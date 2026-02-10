import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/ui/header"
import { CategoriesSection } from "@/components/ui/categories-section"

import categoriesHeroImage from "@/assets/categories-hero.jpg"

export default function CategoriesPage() {
  const [activeSection, setActiveSection] = useState("categories")
  const navigate = useNavigate()

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    switch(sectionId){
      case 'home':
        navigate('/')
        break
      case 'categories':
        navigate('/categories')
        break
      case 'about':
        navigate('/about')
        break
      case 'market-price':
        navigate('/market-prices')
        break
      case 'verification':
        navigate('/verification')
        break
      default:
        navigate('/')
    }
  }

  const handleCategorySelect = (categoryId: string) => {
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection} 
        onSectionChange={scrollToSection} 
      />
      
      <main className="pt-20">
        {/* Hero Image Section */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={categoriesHeroImage} 
            alt="Fresh organic vegetables and fruits representing diverse product categories" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Product Categories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our wide range of fresh, locally-sourced products directly from farmers
            </p>
          </div>
          
          <CategoriesSection onCategorySelect={handleCategorySelect} />
        </div>
      </main>
      
      
    </div>
  )
}