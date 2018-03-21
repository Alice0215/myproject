import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}