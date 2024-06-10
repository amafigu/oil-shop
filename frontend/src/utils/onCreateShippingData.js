import { createShippingData } from "#api/users/createShippingData"
import { onRequestError } from "./onRequestError"

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
    onRequestError(error, setNotification, message)
  }
}
