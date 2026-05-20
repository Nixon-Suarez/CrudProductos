import { useState, useEffect } from "react"
import { getCategories } from "../api/categories.api"
import { Link } from 'react-router-dom'
import { deleteCategory } from '../api/categories.api'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'

export function CategoryListPage() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => { // se ejecuta cuando el componente se monta por primera vez
        async function fetchCategories() {
            const res = await getCategories()
            setCategories(res.data)
        }
        fetchCategories()
    }, [])

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
          toast.success('Categoria eliminada con éxito', {
            position: 'bottom-right',
            style: {
              background: '#101010',
              color: '#fff',
            },
          })
          navigate('/Categories')
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
                        {categories.map((category) => (
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
        </div>
    )
}
