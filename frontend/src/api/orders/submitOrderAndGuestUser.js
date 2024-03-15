import { getUserShippingData } from "#api/users/getUserShippingData"
import { getUserWithoutCredentialsByEmail } from "#api/users/getUserWithoutCredentialsByEmail"
import {
  API_ORDERS_CART_ITEMS,
  API_ORDERS_CREATE,
  API_SHIPPING_DATA,
  API_USERS_CREATE_GUEST,
  API_USERS_CURRENT_USER,
} from "#constants/api"
import { SHIPPING_COST } from "#constants/cart"
import {
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_GUEST_ID,
} from "#constants/localStorage"
import { totalCost } from "#utils/totalCost"
import axios from "axios"

export const submitOrderAndGuestUser = async (
  isLoggedIn,
  formData,
  userId,
  stateShippingDataObject,
  registeredUserEmptyShippingDataObject,
  paymentMethod,
) => {
  try {
    let customerId

    if (!isLoggedIn) {
      const checkGuestUser = await getUserWithoutCredentialsByEmail(
        formData.email,
      )
      if (!checkGuestUser) {
        const guestUser = await axios.post(
          `${process.env.REACT_APP_API_URL}${API_USERS_CREATE_GUEST}`,
          {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            password: "",
          },
        )

        customerId = guestUser.data.guestUser.id
        await axios.post(
          `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
          stateShippingDataObject,
        )
        localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))
      }
      if (checkGuestUser) {
        customerId = checkGuestUser.data.id

        const shippingDataResponse = await getUserShippingData(customerId)

        if (!shippingDataResponse) {
          await axios.post(
            `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
            registeredUserEmptyShippingDataObject,
          )
        }

        localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))
      }
    } else {
      const userDataResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
        { withCredentials: true },
      )
      customerId = userDataResponse.data.id
      const shippingDataResponse = await getUserShippingData(customerId)

      if (!shippingDataResponse) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
          registeredUserEmptyShippingDataObject,
        )
      }

      localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))
    }

    if (customerId) {
      const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART))
      const cartTotalCost = totalCost(cart, SHIPPING_COST).toFixed(2)
      const newOrder = {
        userId: customerId,
        totalAmount: cartTotalCost,
        paymentMethod: paymentMethod,
      }

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}${API_ORDERS_CREATE}`,
        newOrder,
      )

      if (orderResponse && orderResponse.status === 201) {
        const orderId = orderResponse.data.id
        for (const item of cart) {
          try {
            await axios.post(
              `${process.env.REACT_APP_API_URL}${API_ORDERS_CART_ITEMS}`,
              {
                quantity: item.quantity,
                productId: item.product.id,
                userOrderId: orderId,
              },
            )
          } catch (error) {
            console.error(error)
            throw new Error("Error by adding product into new order")
          }
        }
        localStorage.removeItem(LOCAL_STORAGE_CART)
        return orderResponse
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
