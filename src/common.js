import { server } from './const'
import axios from 'axios'
import store from './store'
import _ from 'lodash'

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

/**
 * Base64 转 blob
 * @param dataurl
 * @param filename
 * @returns {File}
 */
function dataURLtoFile (dataurl, filename = Date.now() + '.jpeg') {
  let arr = dataurl.split(',')
  let mime, bstr, n, u8arr
  if (_.isNull(arr[0].match(/:(.*?);/))) {
    mime = 'image/jpeg'
    bstr = atob(arr[0])
  } else {
    mime = arr[0].match(/:(.*?);/)[1]
    bstr = atob(arr[1])
  }
  n = bstr.length
  u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

export {
  request,
  dataURLtoFile
}
