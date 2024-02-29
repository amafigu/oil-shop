import { updateDataRequest } from "#api/generics/updateDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import {
  ignoreUnsavedProperties,
  validateUserAndProductFieldsInDataObject,
} from "#utils/validation"

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
