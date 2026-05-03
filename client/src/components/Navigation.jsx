import { Link } from 'react-router-dom'

export function Navigation() {
  return (
    <header className="mb-6 px-4 py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950/85 p-4 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.24em] text-sky-400">CRUD Productos</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="text-xl font-semibold text-zinc-100 transition hover:text-white" to="/Products">
              Productos
            </Link>
            <span className="hidden text-zinc-600 sm:inline">•</span>
            <Link className="text-xl font-semibold text-zinc-100 transition hover:text-white" to="/Categories">
              Categorias
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/newProduct">
            <button className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">
              Crear Producto
            </button>
          </Link>
          {/* <Link to="/Categories">
            <button className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-slate-500 hover:bg-zinc-800">
              Crear Categoria
            </button>
          </Link> */}
        </div>
      </div>
    </header>
  )
}
