import axios, { AxiosResponse, AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

type AxiosMethodType<T = any, R = AxiosResponse<T>, D = any> = (url: string, config?: AxiosRequestConfig<D>) => Promise<R>

const api = (fn: AxiosMethodType, args: any) =>
  fn
    .apply(axios, args)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      if (error?.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.error('Response error => ', error?.response?.data, 'Status => ', error?.response?.status)
        console.error('Response error headers => ', error?.response?.headers)
      } else if (error?.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.error('Request error => ', error?.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        console.error('Request error => ', error?.message)
      }
      console.error('Request error => ', error?.config)
      return Promise.reject(error?.response?.data)
    })

const _get = (...rest: any) => api(axios.get, rest)

const _post = (...rest: any) => api(axios.post, rest)

const _put = (...rest: any) => api(axios.put, rest)

const _patch = (...rest: any) => api(axios.patch, rest)

const _delete = (...rest: any) => api(axios.delete, rest)

const baseURL = 
  process.env.REACT_APP_API_BASE_URL ? `${process.env.REACT_APP_API_BASE_URL}` : 'http://jsonplaceholder.typicode.com'

const setCustomHeader = (headers: AxiosRequestHeaders) => {
  let custom_headers = { ...headers }

  if (localStorage.getItem('token')) {
    custom_headers = { authorization: `Bearer ${localStorage.getItem('token')}`, ...custom_headers }
  }

  return custom_headers
}

const httpOptions = (headers: AxiosRequestHeaders, responseType = 'json') => ({
  baseURL,
  responseType,
  headers: setCustomHeader(headers),
})

export const get = (url: string, params = {}, headers = {}, responseType = 'json') =>
  _get(url, { ...httpOptions(headers, responseType), params })

export const post = (url: string, body = '', headers = {}, responseType = 'json') =>
  _post(url, body, { ...httpOptions(headers, responseType) })

export const put = (url: string, body = '', headers = {}, responseType = 'json') =>
  _put(url, body, { ...httpOptions(headers, responseType) })

export const patch = (url: string, body = '', headers = {}, responseType = 'json') =>
  _patch(url, body, { ...httpOptions(headers, responseType) })

export const httpDelete = (url: string, data = '', headers = {}, responseType = 'json') =>
  _delete(url, { data, ...httpOptions(headers, responseType) })
