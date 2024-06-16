import { getAuthenticatedUserById } from "@/api/auth/getAuthenticatedUserById"
import { createOrder } from "@/api/orders/createOrder"
import { createOrderItem } from "@/api/orders/createOrderItem"
import { CartItem } from "@/types/Cart"
import { getTotalCost } from "./getTotalCost"
import { onRequestError } from "./onRequestError"

type NotificationSetter = (message: string | null) => void

export const onSubmitRegisteredUserOrder = async (
  userId: number,
  paymentMethod: string,
  cart: CartItem[],
  setNotification: NotificationSetter,
) => {
  try {
    const loggedInUserResponse = await getAuthenticatedUserById(userId)
    if (loggedInUserResponse && loggedInUserResponse.status === 200) {
      const newOrder = {
        userId: userId,
        totalAmount: getTotalCost(cart),
        paymentMethod: paymentMethod,
      }
      const orderResponse = await createOrder(userId, newOrder)
      if (orderResponse && orderResponse.status === 201) {
        const orderWithItemsResponse = await Promise.all(
          cart.map(async (item) => {
            const createdItem = await createOrderItem({
              orderId: orderResponse.data.id,
              quantity: item.quantity,
              productId: item.product.id,
            })
            return createdItem
          }),
        )
        if (
          orderWithItemsResponse &&
          orderWithItemsResponse[0] &&
          orderWithItemsResponse[0].status === 201
        ) {
          return orderWithItemsResponse
        }
      }
    }
  } catch (error) {
    const message = "Error by submitting order"
    onRequestError(error, setNotification, message)
  }
}
