import { getGuestUserToken } from "#api/auth/getGuestUserToken"
import {
  initialOrderData,
  initialShippingData,
  initialUserData,
} from "#constants/orderSummaryData"
import useUserContext from "#context/userContext"
import { useEffect, useState } from "react"
import { onGetOrderSummary } from "../utils/onGetOrderSummary"

export const useGetOrderSummary = () => {
  const [notification, setNotification] = useState(null)
  const [orderAndCartItems, setOrderAndCartItems] = useState({})
  const [shippingData, setShippingData] = useState(initialShippingData)
  const [userData, setUserData] = useState(initialUserData)
  const [orderData, setOrderData] = useState(initialOrderData)
  const { isLoggedIn, user } = useUserContext()

  useEffect(() => {
    let currentUserId

    const getOrderSummary = async () => {
      if (isLoggedIn) {
        currentUserId = user.id
      } else {
        const decodedToken = await getGuestUserToken()
        if (decodedToken && decodedToken.status === 200) {
          currentUserId = decodedToken.data.id
        }
      }
      const userSummaryResponse = await onGetOrderSummary(
        currentUserId,
        setNotification,
      )
      if (userSummaryResponse) {
        setShippingData(userSummaryResponse.shippingData)
        setUserData(userSummaryResponse.userData)
        setOrderData(userSummaryResponse.orderData)
        setOrderAndCartItems(userSummaryResponse.orderAndCartItems)
      }
    }

    getOrderSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { notification, userData, shippingData, orderData, orderAndCartItems }
}
