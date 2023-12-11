import NotificationCard from "#components/NotificationCard"
import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import useUserContext from "#context/userContext"
import { totalCost } from "#utils/cart"
import { SHIPPING_COST } from "#utils/constants"
import { useEffectScrollTop } from "#utils/render"
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
  const { isLoggedIn, setUserId } = useUserContext()
  const { setCart } = useCartContext()
  const location = useLocation()
  let formData = {}
  if (location.state) {
    formData = location.state.formData
  }

  console.log(formData)

  const submitOrderAndGuestUser = async (e) => {
    e.preventDefault()

    try {
      if (!isLoggedIn) {
        try {
          const newGuestUser = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/create-guest`,
            {
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              password: "",
            },
          )

          const newGuestUserData = newGuestUser.data.guestUser

          setUserId(newGuestUserData.id)

          const shippingDataObject = {
            street: formData.street,
            number: formData.number,
            details: formData.details,
            postalCode: formData.postalCode,
            city: formData.city,
            state: formData.state,
            country: formData.country,
          }

          console.log(shippingDataObject)

          await axios.post(
            `${process.env.REACT_APP_API_URL}/users/user/shipping-data/${newGuestUserData.id}`,
            shippingDataObject,
          )
          localStorage.setItem(
            "yolo-guest-id",
            JSON.stringify(newGuestUserData.id),
          )

          if (newGuestUserData) {
            const cart = JSON.parse(localStorage.getItem("yolo-cart"))
            const cartTotalCost = totalCost(cart, SHIPPING_COST).toFixed(2)
            const newOrder = {
              userId: newGuestUserData.id,
              totalAmount: cartTotalCost,
              paymentMethod: paymentMethod,
            }

            const orderResponse = await axios.post(
              `${process.env.REACT_APP_API_URL}/orders/create`,
              newOrder,
            )

            if (orderResponse && orderResponse.status === 201) {
              const orderId = orderResponse.data.id
              for (const item of cart) {
                try {
                  await axios.post(
                    `${process.env.REACT_APP_API_URL}/orders/cart-items`,
                    {
                      quantity: item.quantity,
                      productId: item.product.id,
                      userOrderId: orderId,
                    },
                  )
                } catch (error) {
                  setNotification(`Error by creating new guest user`)
                  setTimeout(() => setNotification(null), 3000)
                  console.error(error)
                }
              }

              localStorage.removeItem("yolo-cart")
              setCart([])
              navigate("/checkout/order-summary")
            }
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        const userDataResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          { withCredentials: true },
        )
        const userData = userDataResponse.data
        if (userData) {
          const cart = JSON.parse(localStorage.getItem("yolo-cart"))
          const cartTotalCost = totalCost(cart, SHIPPING_COST).toFixed(2)
          const newOrder = {
            userId: userData.id,
            totalAmount: cartTotalCost,
            paymentMethod: paymentMethod,
          }

          const orderResponse = await axios.post(
            `${process.env.REACT_APP_API_URL}/orders/create`,
            newOrder,
            { withCredentials: true },
          )

          if (orderResponse && orderResponse.status === 201) {
            const orderId = orderResponse.data.id
            for (const item of cart) {
              try {
                await axios.post(
                  `${process.env.REACT_APP_API_URL}/orders/cart-items`,
                  {
                    quantity: item.quantity,
                    productId: item.product.id,
                    userOrderId: orderId,
                  },
                  { withCredentials: true },
                )
              } catch (error) {
                console.error(error)
              }
            }
            localStorage.removeItem("yolo-cart")
            setCart([])

            navigate("/checkout/order-summary")
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const backToShippingPage = () => {
    navigate("/checkout/shipping")
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
                id='klarna'
                name='paymentMethod'
                value='klarna'
                checked={paymentMethod === "klarna"}
                onChange={selectPaymentMethod}
                required
              />
              <label htmlFor='klarna'>Klarna</label>
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
