import { getAuthenticatedUserById } from "@/api/auth/getAuthenticatedUserById"
import { getLastOrderItems } from "@/api/orders/getLastOrderItems"
import { getUserShippingData } from "@/api/users/getUserShippingData"
import { OrderSummary } from "@/types/Order"
import { onRequestError } from "./onRequestError"

export const onGetOrderSummary = async (
  userId: number,
  setNotification: (notification: string) => void,
): Promise<OrderSummary | undefined> => {
  let orderAndCartItems: OrderSummary["orderAndCartItems"] = { orderItems: [] }
  let shippingData: OrderSummary["shippingData"] = {
    street: "",
    number: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  }
  let orderData: OrderSummary["orderData"] = {
    paymentMethod: "",
    totalAmount: 0,
  }
  let userData: OrderSummary["userData"] = {
    firstName: "",
    lastName: "",
    email: "",
  }

  try {
    const userResponse = await getAuthenticatedUserById(userId)
    if (userResponse && userResponse.status === 200) {
      const user = userResponse.data
      userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    }
    const shippingDataResponse = await getUserShippingData(userId)

    if (
      shippingDataResponse?.status === 200 ||
      shippingDataResponse?.status === 404
    ) {
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
    onRequestError(error, setNotification, message)
  }
}
