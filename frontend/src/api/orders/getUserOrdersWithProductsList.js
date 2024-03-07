import { API_ORDERS_ALL, API_ORDERS_CART_ITEMS } from "#constants/api"
import axios from "axios"

export const getUserOrdersWithProductsList = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}${API_ORDERS_ALL}/${parseInt(userId)}`,
  )

  const ordersWithDetails = await Promise.all(
    response.data.map(async (order) => {
      const cartItemsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_ORDERS_CART_ITEMS}/${order.id}`,
      )
      return { ...order, cartItems: cartItemsResponse.data }
    }),
  )

  return ordersWithDetails
}
