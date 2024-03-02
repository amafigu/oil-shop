import { updateProductDataRequest } from "#api/products/updateProductDataRequest"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import {
  ignoreUnsavedProperties,
  validateUserAndProductFieldsInDataObject,
} from "#utils/validation"

export const updateProductDataAndSetStates = async (
  propertyName,
  productId,
  updatedData,
  setNonUpdatedData,
  setUpdatedData,
  setNotification,
) => {
  try {
    const cleanedUpdatedData = ignoreUnsavedProperties(
      updatedData,
      propertyName,
    )

    const validProduct = validateUserAndProductFieldsInDataObject(
      cleanedUpdatedData,
      setNotification,
    )

    if (!validProduct) {
      return
    }

    const dataRequest = await updateProductDataRequest(
      productId,
      validProduct,
      setNotification,
    )

    console.log(dataRequest)
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

      if (setNotification) {
        setNotification(
          `Error by updating data: ${error.response.data.message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    } else {
      console.error(error)
      if (setNotification) {
        setNotification("Error by updating data")
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      }
    }
  }
}
