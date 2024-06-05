import { getOrderItems } from "#api/orders/getOrderItems"
import { getOrdersByUserId } from "#api/orders/getOrdersByUserId"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useEffect, useRef, useState } from "react"

export const useGetOrdersWithProducts = () => {
  const [orders, setOrders] = useState([])
  const [notification, setNotification] = useState(null)
  const { user } = useCheckIsUser()
  const [showOrders, setShowOrders] = useState(false)

  const noGetOrdersTimeoutId = useRef(null)

  useEffect(() => {
    const getOrdersWithProducts = async () => {
      if (!user) return

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
        setNotification(
          "It is not possible to get the orders at the moment, please try again",
        )
        noGetOrdersTimeoutId.current = setTimeout(
          () => setNotification(null),
          3000,
        )
      }
    }
    getOrdersWithProducts()
    return () => {
      clearTimeout(noGetOrdersTimeoutId.current)
    }
  }, [user])

  return {
    showOrders,
    setShowOrders,
    orders,
    notification,
  }
}
