import { getAuthenticatedUser } from "#api/auth/getAuthenticatedUser"
import { createOrder } from "#api/orders/createOrder"
import { createOrderItem } from "#api/orders/createOrderItem"
import { onRequestHandlerError } from "./onRequestHandlerError"
import { totalCost } from "./totalCost"

export const onSubmitRegisteredUserOrder = async (
  userId,
  paymentMethod,
  cart,
  setNotification,
) => {
  try {
    const loggedInUserResponse = await getAuthenticatedUser(userId)
    if (loggedInUserResponse && loggedInUserResponse.status === 200) {
      const newOrder = {
        userId: userId,
        totalAmount: totalCost(cart),
        paymentMethod: paymentMethod,
      }
      const orderResponse = await createOrder(userId, newOrder)
      if (orderResponse && orderResponse.status === 201) {
        const orderWithItemsResponse = await Promise.all(
          cart.map(async (item) => {
            const createdItem = await createOrderItem({
              userOrderId: orderResponse.data.id,
              quantity: item.quantity,
              productId: item.product.id,
            })
            return createdItem
          }),
        )
        if (
          orderWithItemsResponse &&
          orderWithItemsResponse[0].status === 201
        ) {
          return orderWithItemsResponse
        }
      }
    }
  } catch (error) {
    const message = "Error by submiting order"
    onRequestHandlerError(error, setNotification, message)
  }
}
