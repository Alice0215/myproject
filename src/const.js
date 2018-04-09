const host = 'http://60.195.68.29:3535/'

const server = {
  HOST: host,
  API: host + 'landscape/cm/',
  PROJECT_API: host + 'landscape/ls/',
  THUMBNAIL_API: host + 'fs/ls/thumbnail/'
}

const plantType = {
  SINGLE: 'SINGLE',
  AREA: 'AREA',
  DEVICE: 'DEVICE',
  OTHER: 'OTHER'
}

export {
  server,
  plantType
}
