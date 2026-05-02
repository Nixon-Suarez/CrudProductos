import { useNavigate } from 'react-router-dom'

export function ProductCard({Products}) {

  const navigate = useNavigate()

  return (
    <div className='bg-zinc-800 p-3 hover:bg-zinc-600 hover:cursor-pointer' key={Products.id} onClick={() => navigate("/Products/" + Products.id)}>
        <img src={Products.img} alt={`${Products.nombre} - ${Products.descripcion}`} />
        <h1 className='font-bold uppercase'>{Products.nombre}</h1>
        <p className='text-slate-400'>{Products.descripcion}</p>
        {/* <img src={new URL('../assets/imgs_productos/hero.png', import.meta.url).href} alt="Hero" /> */}
    </div>
  )
}