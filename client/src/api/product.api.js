import axios from "axios"

const productApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/products/"
})

export const getProducts = () => productApi.get("/")
export const createProduct = (data) => productApi.post("/", data)
export const deleteProduct = (id) => productApi.delete(`/${id}/`)
export const updateProduct = (id, data) => productApi.put(`/${id}/`, data)
export const getProduct = (id) => productApi.get(`/${id}/`)