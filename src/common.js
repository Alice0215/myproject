import { server } from './const'
import axios from 'axios'
import store from './store'
import _ from 'lodash'
import to from 'await-to-js'
import eventBus from './eventBus'

let batchRequest = Number.MAX_SAFE_INTEGER

async function request (url, method = 'get', data = {}, responseType = 'json', project = false, absoluteUrl = false, admin = false) {
  let endpoint = project ? server.PROJECT_API : server.API
  if (admin) {
    endpoint = server.ADMIN_API
  }
  if (!absoluteUrl) {
    url = endpoint + url
  }
  let params = null
  if ((method.toLowerCase() === ('get')) || method.toLowerCase() === ('delete')) {
    params = data
  }
  console.debug("url: "+url)
  console.debug("method: "+method)
  console.debug("data: ")
  console.debug(data)
  const [err, resp] = await to(axios.request({
    url,
    method,
    data,
    responseType,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': store.getters['User/token'],
      'CURRENT_PARTY_ID': store.getters['User/partyId'],
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    },
    xhrFields: {
      withCredentials: true
    },
    params: params
  }))
  if (err) {
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
  const code = resp.data.resultCode
  const msg = resp.data.resultMsg
  console.log(msg)
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
    return resp
  }
  if (code === 'FAILURE') {
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
  if (code === 'ERROR') {
    let msg = resp.data.resultMsg.hint
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

async function requestAdmin (url, method = 'get', data = {}, project, absoluteUrl) {
  return request(url, method, data, 'json', false, false, true)
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
    bstr = atob (arr[0])
  } else {
    mime = arr[0].match(/:(.*?);/)[1]
    bstr = atob (arr[1])
  }
  n = bstr.length
  u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File ([u8arr], filename, { type: mime })
}

/**
 * 删除文件
 * @param filePath 文件相对路径
 * @returns {Promise<void>}
 */
async function deleteFiles (filePath, index = null) {
  let resp = await request('file/delete', 'DELETE', {
    'relativePath': filePath
  }, 'json', true)
  if (resp) {
    let idx = null
    if (_.isNull(index)) {
      idx = index
    }
    let msg = '删除成功'
    eventBus.$emit('delete-success', {
      msg,
      idx
    })
  }
}

/**
 * 上传文件
 * @param fileData
 */
async function uploadFiles (fileData) {
  let fileBlob = dataURLtoFile(fileData)
  let fD = new FormData ()
  fD.append('file', fileBlob)
  let uploadReq = await request('file/upload', 'POST', fD, 'json', true)
  if (uploadReq) {
    let contentUrl = uploadReq.data.resultMsg
    if (contentUrl.indexOf('fs\\') > -1) {
      contentUrl = contentUrl.replace('fs\\', '')
    }
    let previewUrl = server.THUMBNAIL_API + contentUrl
    eventBus.$emit('upload-success', {
      'previewUrl': previewUrl,
      'contentUrl': contentUrl
    })
  }
}

/**
 * 返回带有 预览地址 和 contentUrl 的图片对象数组
 * @param pictures
 * @returns {Array}
 */
function setPicturesWithPreview (pictures) {
  let imgs = []
  _.forEach(pictures, imgURL => {
    let filepath = !_.isUndefined(imgURL.filePath) ? imgURL.filePath : imgURL
    if (!_.isNull(filepath)) {
      let img = {
        'previewUrl': server.THUMBNAIL_API + filepath,
        'contentUrl': filepath
      }
      imgs.push(img)
    }
  })
  return imgs
}

/**
 * 清除 localStory
 * @param name localStory名
 */
function removeLocalStory (name) {
  if (!_.isNull(localStorage.getItem(name))) {
    localStorage.removeItem(name)
  }
}
export {
  request,
  requestAdmin,
  dataURLtoFile,
  deleteFiles,
  uploadFiles,
  removeLocalStory,
  setPicturesWithPreview
}
