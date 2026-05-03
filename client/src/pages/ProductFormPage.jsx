import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getProduct, createProduct, deleteProduct, updateProduct } from '../api/product.api'
import { getCategories } from '../api/categories.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function ProductFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()
  const [categories, setCategories] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const imgField = watch('img')

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getCategories()
        setCategories(data)

        if (params.id) {
          const {
            data: { nombre, descripcion, precio, stock, categoria, estado, img },
          } = await getProduct(params.id)

          setValue('nombre', nombre)
          setValue('descripcion', descripcion)
          setValue('precio', precio)
          setValue('stock', stock)
          setValue('categoria', categoria)
          setValue('estado', estado)

          if (img) {
            setImagePreview(img)
          }
        } else {
          setValue('nombre', '')
          setValue('descripcion', '')
          setValue('precio', '')
          setValue('stock', '')
          setValue('estado', '')
          setValue('categoria', '')
          setValue('img', '')
        }
      } catch (error) {
        console.error('Error loading data:', error)
        toast.error('Error al cargar los datos', {
          position: 'bottom-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
      }
    }

    loadData()
  }, [params.id, setValue])

  useEffect(() => {
    if (imgField && imgField.length > 0) {
      const file = imgField[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setImagePreview(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }, [imgField])

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (params.id) {
        await updateProduct(params.id, data)
        toast.success('Producto actualizado con éxito', {
          position: 'bottom-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
      } else {
        await createProduct(data)
        toast.success('Producto creado con éxito', {
          position: 'bottom-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
      }

      navigate('/products')
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('No se pudo guardar el producto', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    }
  })

  const handleDelete = async () => {
    const accepted = window.confirm('¿Estás seguro de eliminar este producto?')

    if (!accepted) return

    try {
      await deleteProduct(params.id)
      toast.success('Producto eliminado con éxito', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
      navigate('/products')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('No se pudo eliminar el producto', {
        position: 'bottom-right',
        style: {
          background: '#101010',
          color: '#fff',
        },
      })
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-black/20">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-zinc-900/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Gestión de Productos</p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-100">
              {params.id ? 'Editar Producto' : 'Crear Producto'}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Completa los datos del producto y sube una imagen para que figure en la tienda.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-semibold text-zinc-200">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('nombre', { required: true })}
              />
              {errors.nombre && <p className="text-sm text-red-500">El nombre es requerido.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="precio" className="text-sm font-semibold text-zinc-200">
                Precio
              </label>
              <input
                id="precio"
                type="number"
                placeholder="Precio"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('precio', { required: true })}
              />
              {errors.precio && <p className="text-sm text-red-500">El precio es requerido.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="stock" className="text-sm font-semibold text-zinc-200">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Cantidad disponible"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('stock', { required: true })}
              />
              {errors.stock && <p className="text-sm text-red-500">El stock es requerido.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="categoria" className="text-sm font-semibold text-zinc-200">
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('categoria', { required: true })}
              >
                <option value="" className="bg-zinc-950 text-zinc-100">
                  Selecciona una categoría
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-zinc-950 text-zinc-100">
                    {cat.nombre}
                  </option>
                ))}
              </select>
              {errors.categoria && <p className="text-sm text-red-500">La categoría es requerida.</p>}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="estado" className="text-sm font-semibold text-zinc-200">
                Estado
              </label>
              <select
                id="estado"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('estado', { required: true })}
              >
                <option value="" className="bg-zinc-950 text-zinc-100">
                  Selecciona un estado
                </option>
                <option value="true" className="bg-zinc-950 text-zinc-100">
                  Disponible
                </option>
                <option value="false" className="bg-zinc-950 text-zinc-100">
                  No disponible
                </option>
              </select>
              {errors.estado && <p className="text-sm text-red-500">El estado es requerido.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="img" className="text-sm font-semibold text-zinc-200">
                Imagen del producto
              </label>
              <input
                id="img"
                type="file"
                accept="image/*"
                className="block w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 file:cursor-pointer file:rounded-xl file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white transition hover:file:bg-sky-400"
                {...register('img', { required: !params.id })}
              />
              {errors.img && <p className="text-sm text-red-500">La imagen es requerida.</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="descripcion" className="text-sm font-semibold text-zinc-200">
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows="5"
              placeholder="Describe el producto con claridad"
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              {...register('descripcion', { required: true })}
            />
            {errors.descripcion && <p className="text-sm text-red-500">La descripción es requerida.</p>}
          </div>

          {imagePreview && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-inner shadow-black/20">
              <p className="mb-3 text-sm font-semibold text-zinc-300">Vista previa de imagen</p>
              <img
                src={imagePreview}
                alt="Vista previa del producto"
                className="w-min rounded-3xl object-cover shadow-lg shadow-black/30"
              />
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:b hover:cursor-pointerg-sky-400 sm:w-auto"
            >
              Guardar producto
            </button>

            {params.id && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-2xl border border-red-500 bg-transparent px-6 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10 sm:w-auto"
              >
                Eliminar producto
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}