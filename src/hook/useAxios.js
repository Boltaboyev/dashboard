import axios from "axios"

const url = import.meta.env.VITE_API_BASE_URL

export const my_axios = axios.create({
    baseURL: url,
})
