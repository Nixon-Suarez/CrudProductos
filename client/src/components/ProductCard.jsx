import { useNavigate } from 'react-router-dom'

export function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-900"
      onClick={() => navigate(`/Products/${product.id}`)}
    >
      <div className="overflow-hidden">
        <img
          className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
          src={product.img}
          alt={`${product.nombre} - ${product.descripcion}`}
        />
      </div>
      <div className="space-y-3 p-5">
        <h2 className="text-lg font-bold uppercase tracking-tight text-zinc-100">
          {product.nombre.length > 70 ? `${product.nombre.substring(0, 70)}...` : product.nombre}
        </h2>
        <p className="text-sm leading-6 text-zinc-400">
          {product.descripcion.length > 100
            ? `${product.descripcion.substring(0, 100)}...`
            : product.descripcion}
        </p>
      </div>
    </article>
  )
}