export const saveDataAndToggleInput = async (
  e,
  asyncOnSaveFunction,
  setToggle,
) => {
  await asyncOnSaveFunction(e)
  setToggle(false)
}

export const setDefaultImageByError = (event, image) => {
  event.target.src = image
}

export const listenInputChangeAndSetDataObject = (
  e,
  updatedDataObj,
  setUpdatedDataObj,
) => {
  setUpdatedDataObj({
    ...updatedDataObj,
    [e.target.name]: e.target.value,
  })
}

export const setFileToUpload = (event, setFile) => {
  setFile(event.target.files[0])
}
