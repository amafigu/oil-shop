import { getUserShippingData } from "#api/users/getUserShippingData"
import { LONG_MESSAGE_TIMEOUT } from "#constants/time"
import { useCheckIsUser } from "#hooks/useCheckIsUser"
import { useEffect, useState } from "react"

export const useGetUserShippingData = () => {
  const [notification, setNotification] = useState(null)
  const { user } = useCheckIsUser()
  const [shippingData, setShippingData] = useState({})
  useEffect(() => {
    let setTimeoutId

    const getData = async () => {
      if (!user) return
      try {
        const response = await getUserShippingData(user.id)

        if (response && response.status === 200) {
          const data = response.data

          const dataWithUserId = {
            id: user.id,
            street: data.street || "",
            number: data.number || "",
            details: data.details || "",
            state: data.state || "",
            country: data.country || "",
            city: data.city || "",
            postalCode: data.postalCode || "",
          }
          setShippingData(dataWithUserId)
        }
      } catch (error) {
        setNotification("Error by getting user shipping data")

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

  return { shippingData, notification }
}
