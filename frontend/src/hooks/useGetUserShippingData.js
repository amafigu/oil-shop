import { getUserShippingDataRequest } from "#api/users/getUserShippingDataRequest"
import { initialShippingData } from "#constants/shippingData"
import { LONG_MESSAGE_TIMEOUT } from "#constants/time"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
export const useGetUserShippingData = () => {
  const [notification, setNotification] = useState(null)
  const { userId, user, isLoading } = useUserContext()
  const [shippingData, setShippingData] = useState({
    ...initialShippingData,
  })

  useEffect(() => {
    let setTimeoutId
    if (!isLoading) {
      const getData = async () => {
        try {
          debugger
          console.log(userId)
          const response = await getUserShippingDataRequest(userId)

          if (response && response.status === 200) {
            const data = response.data

            const dataWithUserId = {
              id: userId,
              street: data.street,
              number: data.number,
              details: data.details,
              state: data.state,
              country: data.country,
              postalCode: data.postalCode,
            }
            console.log(dataWithUserId)
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
    }
    console.log("Shipping Data Updated:", shippingData)
    return () => clearTimeout(setTimeoutId)
  }, [userId])

  return { shippingData, notification }
}
