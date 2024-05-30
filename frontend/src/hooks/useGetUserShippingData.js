import { getUserShippingData } from "#api/users/getUserShippingData"
import useUserContext from "#context/userContext"
import { onRequestHandlerError } from "#utils/onRequestHandlerError"
import { onUpdateShippingData } from "#utils/onUpdateShippingData"
import { useEffect, useState } from "react"

export const useGetUserShippingData = () => {
  const [notification, setNotification] = useState(null)
  const { user, shippingData, setShippingData } = useUserContext()

  useEffect(() => {
    let setTimeoutId

    const getShippingData = async () => {
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
        const message = "Error by getting user shipping data"
        onRequestHandlerError(error, setNotification, message)
      }
    }
    getShippingData()

    return () => clearTimeout(setTimeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const updateShippingData = async (
    e,
    key,
    userId,
    itemInitialAttributes,
    updatedUserShippingData,
    setUpdatedUserShippingData,
    setNotification,
  ) => {
    try {
      const response = await onUpdateShippingData(
        e,
        key,
        userId,
        itemInitialAttributes,
        updatedUserShippingData,
        setUpdatedUserShippingData,
        setNotification,
      )
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
      console.error("Failed to update shipping data:", error)
    }
  }

  return { shippingData, notification, updateShippingData }
}
