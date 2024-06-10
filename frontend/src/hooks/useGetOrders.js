import { getOrderItems } from "#api/orders/getOrderItems"
import { getOrdersByUserId } from "#api/orders/getOrdersByUserId"
import { useUserContext } from "#context/userContext"
import { useEffect, useState } from "react"

export const useGetOrders = () => {
  const [orders, setOrders] = useState([])
  const { user, isLoading } = useUserContext()

  useEffect(() => {
    const getOrdersWithDetails = async () => {
      try {
        if (isLoading) {
          return
        } else {
          const response = await getOrdersByUserId(user.id)
          if (response && response.status === 200) {
            const ordersWithDetails = await Promise.all(
              response.data.map(async (order) => {
                const cartItemsResponse = await getOrderItems(order.id)
                return { ...order, cartItems: cartItemsResponse.data }
              }),
            )
            setOrders(ordersWithDetails)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    getOrdersWithDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return {
    orders,
  }
}
