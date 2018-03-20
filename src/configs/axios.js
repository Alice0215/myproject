import axios from 'axios'
import { Loading } from 'quasar'

var axiosInstance = axios.create({
  baseURL: 'http://60.195.68.29:3535/landscape/cm/'
})

let loadFunction = config => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  Loading.show()
  return config
}
let finishFunction = response => {
  Loading.hide()
  return response
}
let errorFunction = error => {
  Loading.hide()
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(loadFunction)
axiosInstance.interceptors.response.use(finishFunction, errorFunction)

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $http: {
      get () {
        return axiosInstance
      }
    }
  })
}
