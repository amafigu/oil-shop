import NotificationCard from "#components/ui/NotificationCard"
import {
  ROUTES_CHECKOUT_ORDER_SUMMARY,
  ROUTES_CHECKOUT_SHIPPING,
  ROUTES_CURRENT_ADMIN,
} from "#constants/routes"
import { REDIRECT_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"
import useCartContext from "#context/cartContext"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/render"
import { submitOrderAndGuestUser } from "#utils/users"
import { React, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [notification, setNotification] = useState(null)
  const { translate } = useTranslation()
  const text = translate.pages.payment
  const { isLoggedIn, userId, user } = useUserContext()
  const { setCart } = useCartContext()
  const location = useLocation()
  const navigate = useNavigate()
  let formData = {}

  if (location.state) {
    formData = location.state.formData
  }

  useEffect(() => {
    if (user && user.role === "admin") {
      setNotification("as admin you can not buy products")
      setTimeout(() => setNotification(null), 3000)
      setTimeout(() => navigate(ROUTES_CURRENT_ADMIN), 3000)
    }
  }, [user, navigate])

  const submitOrder = async (e) => {
    e.preventDefault()

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
      street: text.emptyShippingData,
      number: text.emptyShippingData,
      details: text.emptyShippingData,
      postalCode: text.emptyShippingData,
      city: text.emptyShippingData,
      state: text.emptyShippingData,
      country: text.emptyShippingData,
    }
    try {
      const orderResponse = await submitOrderAndGuestUser(
        isLoggedIn,
        formData,
        userId,
        stateShippingDataObject,
        registeredUserEmptyShippingDataObject,
        paymentMethod,
      )

      if (orderResponse) {
        setCart([])
        setTimeout(
          () => navigate(ROUTES_CHECKOUT_ORDER_SUMMARY),
          REDIRECT_TIMEOUT,
        )
      }
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
  const backToShippingPage = () => {
    navigate(ROUTES_CHECKOUT_SHIPPING)
  }

  const selectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
  }

  scrollToTop()

  return (
    <div className={styles.paymentPageWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.paymentPage}>
        <form className={styles.paymentForm} onSubmit={submitOrder}>
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
