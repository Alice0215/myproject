const host = 'http://60.195.68.29:8877/'
const commonHost = 'http://60.195.68.29:3535/'
const server = {
  HOST: host,
  COMMONHOST: commonHost,
  API: host + 'landscape/cm/',
  COMMON_API: commonHost + 'landscape/cm/',
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

export {
  server,
  plantType,
  jobType
}
