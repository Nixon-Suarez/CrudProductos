import axios from "axios"

const userApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/"
})

const AUTH_TOKEN_KEY = 'authToken'
const AUTH_USER_KEY = 'authUser'

const setAuthHeader = (token) => {
    if (token) {
        userApi.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
        delete userApi.defaults.headers.common['Authorization']
    }
}

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY)
export const getUser = () => {
    const user = localStorage.getItem(AUTH_USER_KEY)
    return user ? JSON.parse(user) : null
}

export const setAuthStorage = ({ token, user }) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    setAuthHeader(token)
}

export const clearAuthStorage = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    setAuthHeader(null)
}

export const logout = () => {
    clearAuthStorage()
}

const loadStoredAuth = () => {
    const token = getToken()
    if (token) {
        setAuthHeader(token)
    }
}

loadStoredAuth()

export const login = (data) => userApi.post("login/", data)
export const register = (data) => userApi.post("register/", data)