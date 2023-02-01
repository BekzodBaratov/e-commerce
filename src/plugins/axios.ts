import axios, { AxiosRequestConfig } from "axios"

export const _BASE_CONFIG: AxiosRequestConfig = {
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
}

export const authProtectedApi: any = () =>
  axios.create({
    ..._BASE_CONFIG,
    headers: {
      ..._BASE_CONFIG.headers,
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })

export const publicApi = axios.create({ ..._BASE_CONFIG })
