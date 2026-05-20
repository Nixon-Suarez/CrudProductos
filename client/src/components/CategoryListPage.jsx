import { useState, useEffect } from "react"
import { getCategories } from "../api/categories.api"
import { Link } from 'react-router-dom'
import { deleteCategory } from '../api/categories.api'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'

export function CategoryListPage() {
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const navigate = useNavigate()

    useEffect(() => { // se ejecuta cuando el componente se monta por primera vez
        async function fetchCategories() {
            const res = await getCategories()
            setCategories(res.data)
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        if (currentPage > 1 && currentPage > Math.ceil(categories.length / itemsPerPage)) {
            setCurrentPage(Math.max(1, Math.ceil(categories.length / itemsPerPage)))
        }
    }, [categories, currentPage])

    const totalPages = Math.max(1, Math.ceil(categories.length / itemsPerPage))
    const paginatedCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handleDelete = async (idCategoria) => {
        Swal.fire({
            title: "Estás Seguro?",
            text: "No podrás revertir esto, al eliminar la categoría se eliminarán todos los productos asociados a ella",
            icon: "warning",
            theme: "dark",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteCategory(idCategoria)
                    setCategories((prev) => prev.filter((category) => category.id !== idCategoria))
                    toast.success('Categoria eliminada con éxito', {
                        position: 'bottom-right',
                        style: {
                            background: '#101010',
                            color: '#fff',
                        },
                    })
                    if (paginatedCategories.length === 1 && currentPage > 1) {
                        setCurrentPage((page) => page - 1)
                    }
                } catch (error) {
                    console.error('Error deleting product:', error)
                    toast.error('No se pudo eliminar la Categoria', {
                        position: 'bottom-right',
                        style: {
                            background: '#101010',
                            color: '#fff',
                        },
                    })
                }
            }
        });
    }

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
                        {paginatedCategories.map((category) => (
                            <tr
                                key={category.id}
                                className="bg-zinc-950 hover:bg-zinc-900 transition-colors"
                            >
                                <td className="px-4 py-4 text-zinc-200">{category.id}</td>
                                <td className="px-4 py-4 text-zinc-100">{category.nombre}</td>
                                <td className="px-4 py-4 text-zinc-200">{category.estado ? 'Activo' : 'Inactivo'}</td>
                                <td className="px-4 py-4 space-x-2">
                                    <Link className="text-xl font-semibold text-zinc-100 transition hover:text-white" to={`/Categories/${category.id}`}>
                                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-500">
                                            Editar
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(category.id)} className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-zinc-950/90 px-4 py-4 text-zinc-200 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-zinc-400">
                        Página {currentPage} de {totalPages}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${page === currentPage ? 'border-blue-500 bg-blue-600 text-white' : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500 hover:text-white'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
