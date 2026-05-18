import axios from "axios"

const productApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/products/"
})

productApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Token ${token}`
  }
  return config
})

export const getProducts = () => productApi.get("/")
export const createProduct = (data) => {
  const formData = new FormData()
  formData.append('nombre', data.nombre)
  formData.append('descripcion', data.descripcion)
  formData.append('precio', data.precio)
  formData.append('stock', data.stock)
  formData.append('categoria', data.categoria)
  formData.append('estado', data.estado)
  if (data.img && data.img.length > 0) {
    formData.append('img', data.img[0])
  }
  return productApi.post("/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deleteProduct = (id) => productApi.delete(`/${id}/`)
export const updateProduct = (id, data) => {
  const formData = new FormData()
  formData.append('nombre', data.nombre)
  formData.append('descripcion', data.descripcion)
  formData.append('precio', data.precio)
  formData.append('stock', data.stock)
  formData.append('categoria', data.categoria)
  formData.append('estado', data.estado)
  if (data.img && data.img.length > 0) {
    formData.append('img', data.img[0])
  }
  return productApi.put(`/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getProduct = (id) => productApi.get(`/${id}/`)