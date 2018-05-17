const host = 'http://60.195.68.29:3535/'

const server = {
  HOST: host,
  API: host + 'landscape/cm/',
  ADMIN_API: host + 'landscape/admin/',
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
const jobType = {
  TL: 'TL',
  TM: 'TM'
}

const global = {
  pageSize: 20
}

export {
  server,
  jobType,
  plantType,
  global
}
