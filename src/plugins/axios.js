import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['Authorization'] = localStorage.getItem('token')

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
