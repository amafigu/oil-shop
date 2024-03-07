import { getUserOrdersRequest } from "#api/orders/getUserOrdersRequest"
import { LONG_MESSAGE_TIMEOUT } from "#constants/time"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useEffect, useState } from "react"

export const useGetUserOrders = () => {
  const [notification, setNotification] = useState(null)
  const { user } = useCheckIsUser()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    let setTimeoutId

    const getData = async () => {
      if (!user) return
      try {
        console.log(user.id)
        const response = await getUserOrdersRequest(user.id)
        console.log(response)
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

  return { orders, notification }
}
