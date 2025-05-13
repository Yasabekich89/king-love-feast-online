import "./App.css";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/language";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import Loading from "./components/Loading";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Reservations = lazy(() => import("./pages/Reservations"));
const Contact = lazy(() => import("./pages/Contact"));
const Menu = lazy(() => import("./pages/Menu"));
const About = lazy(() => import("./pages/About"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const MeatTypesAdmin = lazy(() => import("./pages/admin/meat-types"));
const AboutContentAdmin = lazy(() => import("./pages/admin/AboutContentAdmin"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminProducts />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="meat-types" element={<MeatTypesAdmin />} />
                  <Route path="about" element={<AboutContentAdmin />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
