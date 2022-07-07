import axios from "axios"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
const token = accessToken

//apply base url for axios
export const API_URL = process.env.REACT_APP_API_URL

function axiosApi() {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  })
  const user = localStorage.getItem("authUser")
  if (user) {
    axiosInstance.defaults.headers.common["Authorization"] =
      JSON.parse(user).user.token
  }

  axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )

  return axiosInstance
}
export default axiosApi

export async function get(url, config = {}, params) {
  return await axiosApi()
    .get(url + makeQueryParams(params || {}), { ...config })
    .then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi()
    .post(url, data, { ...config })
    .then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi()
    .put(url, data, config)
    .then(response => response.data)
}

export async function patch(url, data, config = {}) {
  return axiosApi()
    .patch(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi()
    .delete(url, { ...config })
    .then(response => response.data)
}

export const makeQueryParams = (params = {}) => {
  return Object.keys(params).reduce((acc, param) => {
    let currentQueryParams = acc
    if (!currentQueryParams) {
      return `?${param}=${params[param]}`
    }
    return `?${currentQueryParams}&${param}=${params[param]}`
  }, "")
}
