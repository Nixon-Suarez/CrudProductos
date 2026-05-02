import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { ProductFormPage } from "./pages/ProductFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast"
import { CategoriesPage } from "./pages/CategoriesPage";
import { CategoriesFormPage } from "./pages/CategoriesFormPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/" element = {<Navigate to= "/Products"/>} />
          <Route path="/Products" element={<ProductPage />} />
          <Route path="/newProduct" element={<ProductFormPage />} />
          <Route path="/Products/:id" element={<ProductFormPage/>} />
          <Route path="/Categories" element={<CategoriesPage/>} />
          <Route path="/Categories/:id" element={<CategoriesFormPage/>} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;