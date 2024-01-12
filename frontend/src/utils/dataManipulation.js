import { SHORT_MESSAGE_TIMEOUT } from "#utils/constants"
import axios from "axios"
import {
  ignoreUnsavedProperties,
  validateUserAndProductFieldsInDataObject,
} from "./validation"

export const getDataAndSetErrorMessage = async (
  dataId,
  apiUrl,
  setErrorMessage,
) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}${apiUrl}/${dataId}`,
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
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
        return
      } else {
        console.error(error)
        setErrorMessage("Error by updating data")
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
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
      `${process.env.REACT_APP_API_URL}${apiUrl}/${dataId}`,
      updatedData,
      { withCredentials: true },
    )
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setErrorMessage(`${error.response.data.message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }

      if (error.response.data.errors) {
        setErrorMessage(`${error.response.data.errors[0].message}`)
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
    console.error(error)
  }
}

export const createDataRequest = async (dataObject, apiUrl, setMessage) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}${apiUrl}`,
      dataObject,
      { withCredentials: true },
    )
    setMessage(`Item Created`)
    setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        setMessage(`${error.response.data.message}`)
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
      }

      if (error.response.data.errors) {
        setMessage(`${error.response.data.errors[0].message}`)
        setTimeout(() => setMessage(null), SHORT_MESSAGE_TIMEOUT)
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

export const createDataAndSetStates = async (
  e,
  dataApi,
  dataObject,
  setErrorMessage,
) => {
  e.preventDefault()
  try {
    const cleanedUpdatedData = dataObject

    const validatedData = validateUserAndProductFieldsInDataObject(
      cleanedUpdatedData,
      setErrorMessage,
    )

    if (!validatedData) {
      return
    }

    const dataRequest = await createDataRequest(
      validatedData,
      dataApi,
      setErrorMessage,
    )
    console.log("dataRequest", dataRequest)
    if (dataRequest && dataRequest.status === 200) {
      return dataRequest
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      setErrorMessage(`Error by updating data: ${error.response.data.message}`)
      setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
    } else {
      console.error("me ", error)
      setErrorMessage("Error by updating data")
      setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
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

    const validatedData = validateUserAndProductFieldsInDataObject(
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
      if (setUpdatedData) {
        setUpdatedData((prevData) => ({
          ...prevData,
          ...cleanedUpdatedData,
        }))
      }
      if (setNonUpdatedData) {
        setNonUpdatedData((prevData) => ({
          ...prevData,
          ...cleanedUpdatedData,
        }))
      }

      return dataRequest
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)

      if (setErrorMessage) {
        setErrorMessage(
          `Error by updating data: ${error.response.data.message}`,
        )
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      console.error(error)
      if (setErrorMessage) {
        setErrorMessage("Error by updating data")
        setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
      }
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
