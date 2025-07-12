
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Browse from "./pages/Browse";
import ItemDetail from "./pages/ItemDetail";
import Dashboard from "./pages/Dashboard";
import AddItem from "./pages/AddItem";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { GlobalParallaxBackground } from "./components/ParallaxLayers";
import CategoryPage from "./pages/CategoryPage";
import ItemCheckout from "./pages/ItemCheckout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="rewear-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <GlobalParallaxBackground />
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/browse" element={<Browse />} />
                  <Route path="/item/:id" element={<ItemDetail />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-item" element={<AddItem />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/checkout/:itemId" element={<ItemCheckout />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
