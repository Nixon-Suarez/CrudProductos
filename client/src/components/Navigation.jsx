import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <div className='flex justify-between py-3'>
      <nav className='flex gap-2 bg-zinc-600 px-3 py-2 rounded-lg w-full h-full items-center'>
        <Link to="/Products">
          <h1 className='font-bold text-3xl mb-4'>Productos</h1>
        </Link>
        <Link to="/Categories">
          <h1 className='font-bold text-3xl mb-4'>Categorias</h1>
        </Link>
        <Link to="/newProduct">
          <button className='bg-zinc-600 hover:bg-zinc-400 px-3 py-2 rounded-lg text-sm hover:cursor-pointer'>Crear Producto</button>
        </Link>
        <Link to="/Categories">
          <button className='bg-zinc-600 hover:bg-zinc-400 px-3 py-2 rounded-lg text-sm hover:cursor-pointer'>Crear Categoria</button>
        </Link>
      </nav>
    </div>
  )
}