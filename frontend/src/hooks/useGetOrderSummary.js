import {
  initialOrderData,
  initialShippingData,
  initialUserData,
} from "#constants/orderSummaryData"
import useUserContext from "#context/userContext"
import { getSummaryData } from "#utils/users"
import { useEffect, useState } from "react"

export const useGetOrderSummary = () => {
  const [notification, setNotification] = useState(null)
  const [orderAndCartItems, setOrderAndCartItems] = useState({})
  const [shippingData, setShippingData] = useState(initialShippingData)
  const [userData, setUserData] = useState(initialUserData)
  const [orderData, setOrderData] = useState(initialOrderData)
  const { isLoggedIn, userId, isLoading } = useUserContext()
  useEffect(() => {
    const getOrderSummary = async () => {
      const userSummaryResponse = await getSummaryData(
        userId,
        isLoggedIn,
        isLoading,
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
