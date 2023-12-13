import { TIMEOUT_DURATION } from "#utils/constants"
import axios from "axios"
import {
  ignoreUnsavedProperties,
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
      if (error.response && error.response.data.message) {
        console.error(error.response.data.message)
        setErrorMessage(
          `Error by updating data: ${error.response.data.message}`,
        )
        setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
        return
      } else {
        console.error(error)
        setErrorMessage("Error by updating data")
        setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
        return
      }
    }
  }
}

export const updateDataRequest = async (
  dataId,
  updatedData,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}${apiUrl}${dataId}`,
      updatedData,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setErrorMessage(`${error.response.data.message}`)
        setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
      }

      if (error.response.data.error) {
        setErrorMessage(`${error.response.data.error[0]}`)
        setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
      }
    }
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
  propertyName,
  dataId,
  dataApi,
  setNonUpdatedData,
  updatedData,
  setUpdatedData,
  setErrorMessage,
) => {
  e.preventDefault()

  try {
    const cleanedUpdatedData = ignoreUnsavedProperties(
      updatedData,
      propertyName,
    )

    const validatedData = validateUserFieldsInDataObject(
      cleanedUpdatedData,
      setErrorMessage,
    )

    if (!validatedData) {
      return
    }

    const dataRequest = await updateDataRequest(
      dataId,
      validatedData,
      dataApi,
      setErrorMessage,
    )

    if (dataRequest && dataRequest.status === 200) {
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
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      setErrorMessage(`Error by updating data: ${error.response.data.message}`)
      setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
    } else {
      console.error("me ", error)
      setErrorMessage("Error by updating data")
      setTimeout(() => setErrorMessage(null), TIMEOUT_DURATION)
    }
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
