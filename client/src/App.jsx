import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { ProductFormPage } from "./pages/ProductFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoriesFormPage } from "./pages/CategoriesFormPage";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation()
  const hideNav = location.pathname === '/login' || location.pathname === '/register'
  const categoria = location.pathname === '/Categories' || location.pathname.startsWith('/Categories/') || location.pathname === '/newCategory'

  return (
    <div className="container mx-auto">
      {!hideNav && <Navigation categoria={categoria} />}
      <Routes>
        <Route path="/" element = {<Navigate to= "/login"/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path="/newProduct" element={<ProtectedRoute><ProductFormPage /></ProtectedRoute>} />
        <Route path="/Products/:id" element={<ProtectedRoute><ProductFormPage/></ProtectedRoute>} />
        <Route path="/Categories" element={<ProtectedRoute><CategoriesPage/></ProtectedRoute>} />
        <Route path="/Categories/:id" element={<ProtectedRoute><CategoriesFormPage/></ProtectedRoute>} />
        <Route path="/newCategory" element={<ProtectedRoute><CategoriesFormPage/></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;