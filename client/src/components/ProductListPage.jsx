import { useState, useEffect } from "react"
import { getProducts } from "../api/product.api"
import { ProductCard } from "./ProductCard"

export function ProductListPage() {
    const [products, setProducts] = useState([])

    useEffect(() => { // se ejecuta cuando el componente se monta por primera vez
        async function fetchProducts() {
            const res = await getProducts()
            setProducts(res.data)
        }
        fetchProducts()
    }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}