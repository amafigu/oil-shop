import { getUserShippingData } from "#api/users/getUserShippingData"
import {
  API_ORDERS_CART_ITEMS,
  API_ORDERS_CREATE,
  API_SHIPPING_DATA,
} from "#constants/api"
import { SHIPPING_COST } from "#constants/cart"
import {
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_GUEST_ID,
} from "#constants/localStorage"
import { totalCost } from "#utils/totalCost"
import axios from "axios"
import { createGuestUser } from "../api/users/createGuestUser"
export const onSubmitGuestUserOrder = async (
  formData,
  registeredUserEmptyShippingDataObject,
  paymentMethod,
) => {
  const stateShippingDataObject = {
    street: formData.street,
    number: formData.number,
    details: formData.details,
    postalCode: formData.postalCode,
    city: formData.city,
    state: formData.state,
    country: formData.country,
  }
  const userDataObject = {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
  }
  try {
    let customerId

    const guestUser = await createGuestUser({
      ...userDataObject,
      password: "",
    })

    customerId = guestUser.data.guestUser.id
    await axios.post(
      `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
      stateShippingDataObject,
    )
    localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))

    const shippingDataResponse = await getUserShippingData(customerId)

    if (!shippingDataResponse) {
      await axios.post(
        `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
        registeredUserEmptyShippingDataObject,
      )
    }

    localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))

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
