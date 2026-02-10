import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/ui/header"
import { AboutSection } from "@/components/ui/about-section"
import { Footer } from "@/components/ui/footer"
import aboutHeroImage from "@/assets/about-hero.jpg"

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("about")
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
            src={aboutHeroImage} 
            alt="Farmers working in fields representing AgriLink's mission to connect farmers with customers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About AgriLink
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting farmers directly with customers for fresh, quality produce
            </p>
          </div>
          
          <AboutSection />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}