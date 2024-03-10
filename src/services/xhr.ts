import type { AxiosError, Method, AxiosRequestConfig } from "axios"
import { useMessage } from "@/composables"
import "./mock"
import axios from "axios"
import Cookies from "js-cookie"

export const baseURL = import.meta.env.MODE !== "development" ? import.meta.env.VITE_APP_BASE : "/"
export const developmentSID = import.meta.env.VITE_API_DEV_SID || undefined

type ErrorData = {
  error_code: number
}

interface InstanceResponse<T> {
  status: string
  message: string
  data: T
}

const { $message } = useMessage()

axios.interceptors.response.use((response) => {
  if (import.meta.env.VITE_AXIOS_MOCK === "true") {
    // eslint-disable-next-line no-console
    console.log("mock", response)
  }
  return response
}, (error: AxiosError<InstanceResponse<ErrorData>>) => {
  const isNasWeb = !!(window.parent as Window["parent"] & { os?: object }).os
  const status = error.response?.status
  const errorCode = error.response?.data.data.error_code

  switch (status) {
    case 401:
      if (isNasWeb === false) {
        window.location.replace(window.location.origin)
      }
      break;
  }

  if (errorCode) {
    $message.error("請檢查您的網際網路連線。")
  }

  return Promise.reject(error)
})

interface XhrConfig extends AxiosRequestConfig {
  method: Method
  url: string
  applicationJson?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const instance = <T = any>(config: XhrConfig) => {
  const sid = Cookies.get("NAS_SID") || developmentSID
  const timeout = config.timeout || 30000
  const headers: AxiosRequestConfig["headers"] = {
    ...config.headers,
    Accept: config.headers?.Accept || (config.applicationJson !== false ? "application/json" : "")
  }
  const params = {
    ...config.params,
    sid
  }

  return axios<InstanceResponse<T>>({
    ...config,
    baseURL,
    headers,
    timeout,
    params
  })
}
