
export const img = (file, size = '') => {
  if (size !== '') {
    return process.env.REACT_APP_S3_URL + file.replace('img/', 'img/' + size + '/')
  }
  return process.env.REACT_APP_S3_URL + file
}

export const imgXS = (file = '') => {
  if (file) {
    return process.env.REACT_APP_S3_URL + file.replace('img/', 'img/xs/')
  }
  return null
}

export const imgSM = (file = '') => {
  if (file) {
    return process.env.REACT_APP_S3_URL + file.replace('img/', 'img/sm/')
  }
  return null
}

export const imgMD = (file = '') => {
  if (file) {
    return process.env.REACT_APP_S3_URL + file.replace('img/', 'img/md/')
  }
  return null
}

export const imgLG = (file = '') => {
  if (file) {
    return process.env.REACT_APP_S3_URL + file.replace('img/', 'img/lg/')
  }
  return null
}

