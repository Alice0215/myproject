import { server } from './const'
import axios from 'axios'
import store from './store'
async function request (url, method = 'get', data = {}, responseType = 'json', project = false) {
  const endpoint = project ? server.PROJECT_API : server.API
  url = endpoint + url
  let params = null
  if ((method.toLowerCase() === ('get')) || method.toLowerCase() === ('delete')) {
    params = data
  }
  const resp = await axios.request({
    url,
    method,
    data,
    responseType,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': localStorage.getItem('token'),
      'CURRENT_PARTY_ID': localStorage.getItem('partyId'),
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    },
    xhrFields: {
      withCredentials: true
    },
    params: params
  })
  return resp
}
export {
  request
}
