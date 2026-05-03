import { useState, useEffect } from "react"
import { getCategories } from "../api/categories.api"

export function CategoryListPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => { // se ejecuta cuando el componente se monta por primera vez
        async function fetchCategories() {
            const res = await getCategories()
            setCategories(res.data)
        }
        fetchCategories()
    }, [])

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="overflow-x-auto rounded-2xl border border-zinc-700 bg-zinc-950/80 shadow-xl shadow-black/20">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-zinc-900 text-left text-xs uppercase tracking-wider text-zinc-300">
                        <tr>
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Nombre</th>
                            <th className="px-4 py-3">Estado</th>
                            <th className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="bg-zinc-950 hover:bg-zinc-900 transition-colors"
                            >
                                <td className="px-4 py-4 text-zinc-200">{category.id}</td>
                                <td className="px-4 py-4 text-zinc-100">{category.nombre}</td>
                                <td className="px-4 py-4 text-zinc-200">{category.estado ? 'Disponible' : 'No Disponible'}</td>
                                <td className="px-4 py-4 space-x-2">
                                    {/* <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500">
                                        Editar
                                    </button>
                                    <button className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500">
                                        Eliminar
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                        {categories.map((category) => (
                            console.log(category)
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
