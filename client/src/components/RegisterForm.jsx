import { useNavigate, Link } from 'react-router-dom'
import { registro, setAuthStorage } from '../api/user.api'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export function RegisterForm() {
  const navigate = useNavigate()

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    try {
        await registro(data)
        toast.success('registro éxitoso', {
          position: 'bottom-right',
          style: {
            background: '#101010',
            color: '#fff',
          },
        })
        navigate('/login')
    } catch (error) {
      console.error('Error in register:', error)
      toast.error('No se pudo loguear de forma exitosa', {
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
            <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Gestión de Productos</p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-100">
              register
            </h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-zinc-200">
                Nombre
              </label>
              <input
                id="username"
                type="text"
                placeholder="nombre"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('username', { required: true })}
              />
              {errors.username && <p className="text-sm text-red-500">El username es requerido.</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-zinc-200">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="contraseña"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('password', { required: true })}
              />
              {errors.password && <p className="text-sm text-red-500">la password es requerida.</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-sm text-red-500">el email es requerido.</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 hover:text-zinc-950 sm:w-auto"
            >
              Registrarse
            </button>
            <Link to="/login" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full rounded-2xl bg-zinc-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 sm:w-auto"
              >
                Login
              </button>
            </Link>
          </div>
          
        </form>
      </div>
    </div>
  )
}