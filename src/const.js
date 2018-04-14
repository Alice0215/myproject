const host = 'http://60.195.68.29:8877/'

const server = {
  HOST: host,
  API: host + 'landscape/cm/',
  PROJECT_API: host + 'landscape/ls/',
  THUMBNAIL_QR: host + 'fs/ls/qr/',
  THUMBNAIL_API: host + 'fs/ls/thumbnail/',
  PREVIEW_API: host + 'fs/ls/uploaded/'
}

const plantType = {
  SINGLE: 'SINGLE',
  AREA: 'AREA',
  DEVICE: 'EQUIPMENT',
  OTHER: 'OTHER'
}

export {
  server,
  plantType
}
