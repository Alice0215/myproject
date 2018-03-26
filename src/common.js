import { server } from './const'
import axios from 'axios'
async function request (url, method = 'get', data = {}, responseType = 'json', project = false) {
  const endpoint = project ? server.PROJECT_API : server.API
  url = endpoint + url
  let params = null
  if ((method.toLowerCase() === ('get')) || method.toLowerCase() === ('delete')) {
    params = data
    params['_t'] = +new Date()
  }
  const resp = await axios.request({
    url,
    method,
    data,
    responseType,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': localStorage.getItem('token'),
      'CURRENT_PARTY_ID': localStorage.getItem('Organization'),
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
/**
 * 获取当前登录用户的所有机构
*/
async function getPersonal () {
  let resp = await request('party/personal')
  return resp
}
export {
  request,
  getPersonal
}
