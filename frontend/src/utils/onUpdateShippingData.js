import { updateShippingData } from "#api/users/updateShippingData"
import { shippingDataSchema } from "#utils/usersValidation"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { onValidationError } from "./onValidationError"

export const onUpdateShippingData = async (
  e,
  key,
  userId,
  itemInitialAttributes,
  updatedUserShippingData,
  setUpdatedUserShippingData,
  setNotification,
) => {
  e.preventDefault()
  try {
    let validProperty
    try {
      const toBevalidProperty = { [key]: updatedUserShippingData[key] }
      validProperty = shippingDataSchema.parse(toBevalidProperty)
    } catch (error) {
      setUpdatedUserShippingData(itemInitialAttributes)
      onValidationError(error, setNotification)
      return
    }

    const response = await updateShippingData(userId, validProperty)
    if (response && response.status === 200) {
      const updatedShippingData = response.data
      setUpdatedUserShippingData(updatedShippingData)
      return response
    }
  } catch (error) {
    setUpdatedUserShippingData(itemInitialAttributes)
    const message = "Error by updating shipping data"
    onRequestHandlerError(error, setNotification, message)
  }
}
