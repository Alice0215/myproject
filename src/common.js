import { server } from './const'
import axios from 'axios'
import store from './store'
import _ from 'lodash'
import to from 'await-to-js'
import eventBus from './eventBus'

let batchRequest = Number.MAX_SAFE_INTEGER

async function request (url, method = 'get', data = {}, responseType = 'json', project = false) {
  const endpoint = project ? server.PROJECT_API : server.API
  url = endpoint + url
  let params = null
  if ((method.toLowerCase() === ('get')) || method.toLowerCase() === ('delete')) {
    params = data
  }
  const [err, resp] = await to(axios.request({
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
  }))
  if (err) {
    console.log(err)
    if (batchRequest > 0) {
      batchRequest--
      if (err.message === 'Network Error') {
        err.message = '网络错误'
      }
      let msg = err.message
      eventBus.$emit('request-error', {
        msg
      })
    }
    return resp
  }
  console.log(resp.data.resultMsg)
  const code = resp.data.resultCode
  const msg = resp.data.resultMsg.hint
  if (code === 'SUCCESS') {
    if (typeof (msg) === 'string') {
      let result = ''
      try {
        result = JSON.parse(msg)
      } catch (e) {
        result = msg
      }
      if (typeof (result) === 'object') {
        return result
      }
    }
    if (msg === undefined || msg === null) {
      return {}
    }
    return msg
  }

  if ((code === 'FAILURE') || (code === 'ERROR')) {
    if (batchRequest > 0) {
      batchRequest--
      eventBus.$emit('request-error', {
        msg,
        resp,
        code
      })
    }
    return null
  }
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

/**
 * 删除文件
 * @param filePath 文件相对路径
 * @returns {Promise<void>}
 */
async function deleteFiles (filePath, imageArray = null, index = null) {
  let resp = await request('file/delete?relativePath=' + filePath)
  if (resp) {
    if (!_.isNull(imageArray) && _.isNull(index)) {
      this.imageArray.splice(index, 1)
    }
    let msg = '删除成功'
    eventBus.$emit('delete-success', {
      msg
    })
  }
}

/**
 * 上传文件
 * @param fileData
 */
async function uploadFiles (fileData) {
  let fileBlob = dataURLtoFile(fileData)
  let fD = new FormData()
  fD.append('file', fileBlob)
  let uploadReq = await request('file/upload', 'POST', fD, 'json', true)
  if (uploadReq) {
    if (uploadReq.indexOf('fs\\') > -1) {
      uploadReq = uploadReq.replace('fs\\', '')
    }
    let previewUrl = server.THUMBNAIL_API + uploadReq
    eventBus.$emit('upload-success', {
      'previewUrl': previewUrl,
      'contentUrl': uploadReq
    })
  }
}

export {
  request,
  dataURLtoFile,
  deleteFiles,
  uploadFiles
}
