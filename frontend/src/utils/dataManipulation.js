import axios from "axios"
import {
  ignorePropertiesWithEmptyValue,
  validateUserFieldsInDataObject,
} from "./validation"
export const getDataAndSetErrorMessage = async (
  dataId,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${apiUrl}${dataId}`,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    console.error(error)
    if (typeof setErrorMessage === "function") {
      setErrorMessage("Error by getting data")
    }
  }
}

export const updateDataRequest = async (dataId, updatedData, apiUrl) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${apiUrl}${dataId}`,
      updatedData,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export const saveDataAndToggleInput = async (
  e,
  asyncOnSaveFunction,
  setToggle,
) => {
  await asyncOnSaveFunction(e)
  setToggle(false)
}

export const updateDataAndSetStates = async (
  e,
  request,
  nonUpdatedData,
  setNonUpdatedData,
  updatedData,
  setUpdatedData,
  setNotification,
) => {
  e.preventDefault()

  try {
    const cleanedUpdatedData = ignorePropertiesWithEmptyValue(updatedData)

    if (
      Object.keys(cleanedUpdatedData).length === 0 ||
      JSON.stringify(nonUpdatedData) === JSON.stringify(cleanedUpdatedData)
    ) {
      setNotification("No changes made.")
      setTimeout(() => setNotification(null), 2000)
      return
    }
    const validatedData = validateUserFieldsInDataObject(
      cleanedUpdatedData,
      setNotification,
    )
    const dataRequest = await request(validatedData)

    if (dataRequest.status === 200) {
      setUpdatedData((prevData) => ({
        ...prevData,
        ...cleanedUpdatedData,
      }))
      setNonUpdatedData((prevData) => ({
        ...prevData,
        ...cleanedUpdatedData,
      }))

      return dataRequest
    }
  } catch (error) {
    setNotification("Could not update data")
    setTimeout(() => setNotification(null), 2000)
  }
}

export const uploadToS3 = async (file) => {
  if (!file) return ""
  let newUrl = ""
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/aws/generate-upload-url?fileName=${file.name}`,
      { withCredentials: true },
    )
    newUrl = `https://oylo-images.s3.us-east-2.amazonaws.com/${response.data.fileName}`

    await axios.put(
      response.data.uploadURL,
      file,

      {
        headers: {
          "Content-Type": file.type,
        },
      },
    )
  } catch (error) {
    console.error("Error uploading to S3: ", error)
    return null
  }
  return newUrl
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
