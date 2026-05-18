import axios from "axios"

const categoriesApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/categories/"
})

categoriesApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Token ${token}`
    }
    return config
})

export const getCategories = () => categoriesApi.get("/")
export const createCategory = (data) => categoriesApi.post("/", data)
export const deleteCategory = (id) => categoriesApi.delete(`/${id}/`)
export const updateCategory = (id, data) => categoriesApi.put(`/${id}/`, data)
export const getCategory = (id) => categoriesApi.get(`/${id}/`)