import { getOrdersByUserId } from "@/api/orders/getOrdersByUserId"
import { LONG_MESSAGE_TIMEOUT } from "@/constants/time"
import { useNotificationContext } from "@/context/notificationContext"
import { useUserContext } from "@/context/useUserContext"
import { useEffect, useState } from "react"

export const useGetUserOrders = () => {
  const { setNotification } = useNotificationContext()
  const { user } = useUserContext()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    let setTimeoutId: string | number | NodeJS.Timeout | undefined

    const getData = async () => {
      if (!user) return
      try {
        const response = await getOrdersByUserId(user.id)

        if (response && response.status === 200) {
          setOrders(response.data)
        }
      } catch (error) {
        setNotification("Error by getting user orders")
        setTimeoutId = setTimeout(
          () => setNotification(null),
          LONG_MESSAGE_TIMEOUT,
        )
      }
    }
    getData()

    return () => clearTimeout(setTimeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return { orders }
}
