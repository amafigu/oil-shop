import { createDataRequest } from "#api/generics/createDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import { validateUserAndProductFieldsInDataObject } from "#utils/validation"

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
    if (dataRequest && dataRequest.status === 201) {
      return dataRequest
    }
    if (dataRequest && dataRequest.status === 422) {
      setErrorMessage(
        `Error by updating data: Can not add product, this product is already existent. Please try with another name, size or category.`,
      )
      setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.message) {
      console.error(error.response.data.message)
      setErrorMessage(`Error by updating data: ${error.response.data.message}`)
      setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
    } else {
      console.error("error by updating data", error)
      setErrorMessage("Error by updating data")
      setTimeout(() => setErrorMessage(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
