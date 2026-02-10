import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Website from "./pages/Website";
import CategoriesPage from "./pages/CategoriesPage";
import AboutPage from "./pages/AboutPage";
import MarketPricePage from "./pages/MarketPricePage";
import VerificationPage from "./pages/VerificationPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/auth-context";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website />} />
          <Route path="/app" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/market-prices" element={<MarketPricePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </TooltipProvider>
);
export default App;
