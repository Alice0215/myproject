const host = 'http://localhost:8080/'

const server = {
  HOST: host,
  API: host + 'cm/',
  ADMIN_API: host + 'admin/',
  PROJECT_API: host + 'ls/',
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
const jobType = {
  TL: 'TL',
  TM: 'TM'
}

const global = {
  pageSize: 10
}

export {
  server,
  jobType,
  plantType,
  global
}
