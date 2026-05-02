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
    <div className="grid grid-cols-3 gap-3">
        {products.map( Products => (
            <ProductCard key={Products.id} Products={Products}/>
        ))}
    </div>
  )
}