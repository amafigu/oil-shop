import { getUserData } from "#api/users/getUserData"
import {
  API_ORDERS_LAST_ORDER_ITEMS,
  API_SHIPPING_DATA,
  API_USERS_CURRENT_USER,
  API_USERS_GUEST_BY_ID,
} from "#constants/api"
import { LOCAL_STORAGE_GUEST_ID } from "#constants/localStorage"
import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import axios from "axios"

export const getSummaryData = async (
  userId,
  isLoggedIn,
  isLoading,
  setNotification,
) => {
  try {
    let customerId
    let shippingData = {}
    let userData = {}
    let orderData = {}
    let orderAndCartItems = {}

    if (!isLoggedIn) {
      customerId = localStorage.getItem(LOCAL_STORAGE_GUEST_ID)
      if (customerId)
        userData = await getUserData(
          `${process.env.REACT_APP_API_URL}${API_USERS_GUEST_BY_ID}/${customerId}`,
          false,
        )
    }
    if (isLoggedIn && !isLoading) {
      customerId = userId
      userData = await getUserData(
        `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${customerId}`,
        true,
      )
    }

    if (customerId) {
      const shippingDataResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
      )

      if (shippingDataResponse.status === 200) {
        const data = shippingDataResponse.data
        shippingData = {
          street: data.street,
          number: data.number,
          postalCode: data.postalCode,
          city: data.city,
          state: data.state,
          country: data.country,
        }
      }
      const orderAndCartItemsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_ORDERS_LAST_ORDER_ITEMS}/${customerId}`,
      )
      if (orderAndCartItemsResponse.status === 200) {
        orderAndCartItems = orderAndCartItemsResponse.data
        orderData = {
          paymentMethod:
            orderAndCartItemsResponse.data.lastOrder[0].paymentMethod,
          totalAmount: orderAndCartItemsResponse.data.lastOrder[0].totalAmount,
        }
      }

      return { shippingData, userData, orderData, orderAndCartItems }
    } else {
      if (!customerId && userId) {
        customerId = userId
      }
    }
  } catch (error) {
    setNotification(`error getting summary data`)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    console.error(error)
  }
}
