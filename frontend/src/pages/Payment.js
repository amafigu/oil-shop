import NotificationCard from "#components/NotificationCard"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { totalCost } from "#utils/cart"
import {
  API_ORDERS_CART_ITEMS,
  API_ORDERS_CREATE,
  API_SHIPPING_DATA,
  API_USERS_CREATE_GUEST,
  API_USERS_CURRENT_USER,
  LOCAL_STORAGE_CART,
  LOCAL_STORAGE_GUEST_ID,
  ROUTES_CHECKOUT_ORDER_SUMMARY,
  ROUTES_CHECKOUT_SHIPPING,
  SHIPPING_COST,
} from "#utils/constants"
import { useEffectScrollTop } from "#utils/render"
import {
  getUserShippingData,
  getUserWithoutCredentialsByEmail,
} from "#utils/users"
import axios from "axios"
import { React, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const text = translate.pages.payment
  const { isLoggedIn, setUserId, userId } = useUserContext()
  const { setCart } = useCartContext()
  const location = useLocation()
  let formData = {}
  if (location.state) {
    formData = location.state.formData
  }

  const stateShippingDataObject = {
    street: formData.street,
    number: formData.number,
    details: formData.details,
    postalCode: formData.postalCode,
    city: formData.city,
    state: formData.state,
    country: formData.country,
  }

  const registeredUserEmptyShippingDataObject = {
    street: "please add data",
    number: "please add data",
    details: "please add data",
    postalCode: "please add data",
    city: "please add data",
    state: "please add data",
    country: "please add data",
  }

  const submitOrderAndGuestUser = async (e) => {
    e.preventDefault()

    try {
      let customerId

      if (!isLoggedIn) {
        // if user is not logged in
        console.log("not log")
        const checkGuestUser = await getUserWithoutCredentialsByEmail(
          formData.email,
        )
        console.log("checkGuestUser", checkGuestUser)
        if (!checkGuestUser) {
          // if user doesn't exist, create a new one
          console.log("not log create new guest user")
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
          console.log("not log created guestUserId", customerId)

          localStorage.setItem(
            LOCAL_STORAGE_GUEST_ID,
            JSON.stringify(customerId),
          )
        }
        if (checkGuestUser) {
          customerId = checkGuestUser.data.id

          console.log("not log do not create new guest user id", customerId)
          localStorage.setItem(
            LOCAL_STORAGE_GUEST_ID,
            JSON.stringify(customerId),
          )
          console.log("guestUserId", customerId)
        }
        // if user doesn't exist, create a new one and save the id in local storage

        await axios.post(
          `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
          stateShippingDataObject,
        )

        localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))

        setUserId(customerId)
      } else {
        console.log("log")
        // if user is logged in
        const userDataResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
          { withCredentials: true },
        )
        customerId = userDataResponse.data.id
        const shippingDataResponse = await getUserShippingData(customerId)
        if (!shippingDataResponse) {
          const saveEmptyShippingData = await axios.post(
            `${process.env.REACT_APP_API_URL}${API_SHIPPING_DATA}/${customerId}`,
            registeredUserEmptyShippingDataObject,
          )

          console.log("saveEmptyShippingData", saveEmptyShippingData.data)
        }

        localStorage.setItem(LOCAL_STORAGE_GUEST_ID, JSON.stringify(customerId))
      }

      console.log("customerIdAfter ifs", customerId)

      if (customerId) {
        console.log("common customerId", customerId)
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

        console.log("order", orderResponse)

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
              console.log("items obj", {
                quantity: item.quantity,
                productId: item.product.id,
                userOrderId: orderId,
              })
            } catch (error) {
              setNotification(`Error by adding product into new order`)
              setTimeout(() => setNotification(null), 3000)
              console.error(error)
            }
          }
          localStorage.removeItem(LOCAL_STORAGE_CART)
          setCart([])
          setTimeout(() => navigate(ROUTES_CHECKOUT_ORDER_SUMMARY), 1000)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const backToShippingPage = () => {
    navigate(ROUTES_CHECKOUT_SHIPPING)
  }

  const selectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
  }

  useEffectScrollTop()

  return (
    <div className={styles.paymentPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.paymentPage}>
        <form className={styles.paymentForm} onSubmit={submitOrderAndGuestUser}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{text.title}</span>
          </div>

          <div className={styles.methods}>
            <div className={styles.row}>
              <input
                type='radio'
                id='paypal'
                name='paymentMethod'
                value='paypal'
                checked={paymentMethod === "paypal"}
                onChange={selectPaymentMethod}
                required
              />
              <label htmlFor='paypal'>Paypal</label>
            </div>
            <div className={styles.row}>
              <input
                type='radio'
                id='googlePay'
                name='paymentMethod'
                value='googlePay'
                checked={paymentMethod === "googlePay"}
                onChange={selectPaymentMethod}
                required
              />
              <label htmlFor='googlePay'>Google Pay</label>
            </div>
          </div>
          <div className={styles.navigateButtons}>
            <button
              className={styles.formButton}
              onClick={() => backToShippingPage()}
            >
              {text.backButton}
            </button>
            <button className={styles.formButton} type='submit'>
              {text.paymentButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
