import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createCategory, updateCategory, getCategory } from '../api/categories.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function CategoriesFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
      async function loadData() {
        try {
          if (params.id) {
            const {
              data: { nombre, estado },
            } = await getCategory(params.id)
  
            setValue('nombre', nombre)
            setValue('estado', estado)
          } else {
            setValue('nombre', '')
            setValue('estado', '')
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

    const onSubmit = handleSubmit(async (data) => {
        try {
          if (params.id) {
            await updateCategory(params.id, data)
            toast.success('categoria actualizado con éxito', {
              position: 'bottom-right',
              style: {
                background: '#101010',
                color: '#fff',
              },
            })
          } else {
            await createCategory(data)
            toast.success('categoria creado con éxito', {
              position: 'bottom-right',
              style: {
                background: '#101010',
                color: '#fff',
              },
            })
          }
          navigate('/Categories')
        } catch (error) {
          console.error('Error saving product:', error)
          toast.error('No se pudo guardar el categoria', {
            position: 'bottom-right',
            style: {
              background: '#101010',
              color: '#fff',
            },
          })
        }
      })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-[32px] border border-zinc-800 bg-zinc-950/90 p-6 shadow-2xl shadow-black/20">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-zinc-900/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Gestión de Categorias</p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-100">
              {params.id ? 'Editar categoria' : 'Crear categoria'}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-zinc-400">
            Completa los datos de la categoria y sube una imagen para que figure en la tienda.
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
                placeholder="Nombre de la categoria"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('nombre', { required: true })}
              />
              {errors.nombre && <p className="text-sm text-red-500">El nombre es requerido.</p>}
            </div>

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
                  Activo
                </option>
                <option value="false" className="bg-zinc-950 text-zinc-100">
                  Inactivo
                </option>
              </select>
              {errors.estado && <p className="text-sm text-red-500">El estado es requerido.</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:b hover:cursor-pointerg-sky-400 sm:w-auto"
            >
              Guardar categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}