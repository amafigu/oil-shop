import { getUserOrdersWithProductsList } from "#api/orders/getUserOrdersWithProductsList"
import useUserContext from "#context/userContext"
import { useCallback, useRef, useState } from "react"

export const useGetOrdersWithProducts = () => {
  const [orders, setOrders] = useState([])
  const [notification, setNotification] = useState(null)
  const { userId } = useUserContext()
  const [showOrders, setShowOrders] = useState(false)

  const makeOrderTimeoutId = useRef(null)
  const noGetOrdersTimeoutId = useRef(null)

  const getOrdersWithProducts = useCallback(async () => {
    try {
      const ordersWithDetails = await getUserOrdersWithProductsList(userId)
      setOrders(ordersWithDetails)
      if (ordersWithDetails.length === 0) {
        setShowOrders(false)
        setNotification(
          "You have no orders yet, please make an order and come back later",
        )
        makeOrderTimeoutId.current = setTimeout(
          () => setNotification(null),
          2000,
        )
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
    return () => {
      clearTimeout(makeOrderTimeoutId.current)
      clearTimeout(noGetOrdersTimeoutId.current)
    }
  }, [userId])

  return {
    getOrdersWithProducts,
    showOrders,
    setShowOrders,
    orders,
    notification,
  }
}
