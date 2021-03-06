/*
export const someMutation = (state) => {}
 */

export const updateQRCodeForm = (state, v) => {
  state.qrCodeForm = v
}

export const updateSingleForm = (state, v) => {
  state.singleForm = v
}

export const updateAreaForm = (state, v) => {
  state.areaForm = v
}

export const addQRCodeFormImage = (state, v) => {
  state.qrCodeForm.pictures.push(v)
}

export const removeQRCodeFormImage = (state, v) => {
  state.qrCodeForm.pictures.splice(v, 1)
}

export const removeSinglesFromArea = (state, v) => {
  state.areaForm.singles.splice(v, 1)
}

export const setQRCodeFormToSingle = (state, v) => {
  state.singleForm.qrCodeForm = v
}

export const setQRCodeFormToArea = (state, v) => {
  state.areaForm.qrCodeForm = v
}

export const setProjectId = (state, v) => {
  state.projectId = v
}

export const addNewPlantFormToArea = (state, v) => {
  state.areaForm.singles.push(v)
}

export const setNewPlantFormToArea = (state, v) => {
  let idx = parseInt(v.idx)
//  let singles = state.areaForm.singles
//  if (singles.length >= idx) {
//    singles.splice(idx, 1, v.value)
//  }
//  state.areaForm.singles = singles
  state.areaForm.singles.splice(idx, 1, v.value)
}

export const setChooseType = (state, v) => {
  state.type = v
}

export const setNavTitle = (state, v) => {
  state.navTitle = v
}

export const setQRCodeId = (state, v) => {
  state.qrCodeId = v
}

export const setAreaFormJsonStr = (state, v) => {
  state.areaFormJsonStr = v
}

export const setSingleFormJsonStr = (state, v) => {
  state.singleFormJsonStr = v
}

export const setQrCodeFormJsonStr = (state, v) => {
  state.qrCodeFormJsonStr = v
}

export const clearInfo = (state) => {
  state.qrCodeForm = {pictures: []}
  state.singleForm = {}
  state.areaForm = {singles: []}
  state.projectId = null
  state.type = null
  state.navTitle = null

  state.qrCodeFormJsonStr = null
  state.singleFormJsonStr = null
  state.areaFormJsonStr = null
}

