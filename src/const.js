const host = 'http://60.195.68.29:3535/'

const server = {
  HOST: host,
  API: host + 'landscape/cm/',
  PROJECT_API: host + 'landscape/ls/',
  THUMBNAIL_QR: host + 'fs/ls/qr/',
  THUMBNAIL_API: host + 'fs/ls/thumbnail/'
}

const plantType = {
  SINGLE: 'single',
  AREA: 'area',
  DEVICE: 'device',
  OTHER: 'other'
}

export {
  server,
  plantType
}
