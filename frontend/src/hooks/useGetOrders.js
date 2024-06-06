import { getOrderItems } from "#api/orders/getOrderItems"
import { getOrdersByUserId } from "#api/orders/getOrdersByUserId"
import { useNotificationContext } from "#context/notificationContext"
import { useUserContext } from "#context/userContext"
import { useEffect, useState } from "react"

export const useGetOrders = () => {
  const [orders, setOrders] = useState([])
  const { onSetNotification } = useNotificationContext()
  const { user } = useUserContext()
  const [showOrders, setShowOrders] = useState(false)

  useEffect(() => {
    const getOrdersWithProducts = async () => {
      try {
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
      } catch (error) {
        console.error(error)
        onSetNotification(
          "It is not possible to get the orders at the moment, please try again",
        )
      }
    }
    getOrdersWithProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return {
    showOrders,
    setShowOrders,
    orders,
  }
}
