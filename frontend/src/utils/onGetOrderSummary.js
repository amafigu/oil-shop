import { getAuthenticatedUser } from "#api/auth/getAuthenticatedUser"
import { getLastOrderItems } from "#api/orders/getLastOrderItems"
import { getUserShippingData } from "#api/users/getUserShippingData"
import { onRequestHandlerError } from "./onRequestHandlerError"

export const onGetOrderSummary = async (userId, setNotification) => {
  let orderAndCartItems
  let shippingData
  let orderData
  let userData

  try {
    const userResponse = await getAuthenticatedUser(userId)
    if (userResponse && userResponse.status === 200) {
      const user = userResponse.data
      userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    }
    const shippingDataResponse = await getUserShippingData(userId)

    if (shippingDataResponse.status === 200) {
      const data = shippingDataResponse.data
      shippingData = {
        street: data.street,
        number: data.number,
        postalCode: data.postalCode,
        city: data.city,
        state: data.state,
        country: data.country,
      }
    }
    const lastOrderItemsResponse = await getLastOrderItems(userId)
    if (lastOrderItemsResponse && lastOrderItemsResponse.status === 200) {
      orderAndCartItems = lastOrderItemsResponse.data
      orderData = {
        paymentMethod: lastOrderItemsResponse.data.lastOrder[0].paymentMethod,
        totalAmount: lastOrderItemsResponse.data.lastOrder[0].totalAmount,
      }
    }
    return { shippingData, userData, orderData, orderAndCartItems }
  } catch (error) {
    const message = "Error getting summary data"
    onRequestHandlerError(error, setNotification, message)
  }
}
