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

export const setNewPlantFormToArea = (state, v) => {
  state.areaForm.singles.push(v)
}

export const setChooseType = (state, v) => {
  state.type = v
}

export const setNavTitle = (state, v) => {
  state.navTitle = v
}

export const clearInfo = (state) => {
  state.qrCodeForm = {pictures: []}
  state.singleForm = {}
  state.areaForm = {singles: []}
  state.projectId = null
  state.type = null
  state.navTitle = null
}
