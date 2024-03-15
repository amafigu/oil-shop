import { createShippingData } from "#api/shipping/createShippingData"
import { onRequestHandlerError } from "./onRequestHandlerError"

export const onCreateShippingData = async (
  userId,
  shippingData,
  setNotification,
) => {
  try {
    const response = await createShippingData(userId, shippingData)
    if (response && response.status === 201) {
      return response
    }
  } catch (error) {
    const message =
      "Is not possible to create an user, try again with another email"
    onRequestHandlerError(error, setNotification, message)
  }
}
