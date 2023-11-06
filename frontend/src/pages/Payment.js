import { totalCost, useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { React, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [order, setOrder] = useState({
    userId: "",
    totalAmount: "",
  })

  const location = useLocation()
  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const shippingData = location.state?.shippingData
  const text = translate.pages.payment

  useEffect(() => {
    /* if (!location.state || !location.state.shippingData) {
      navigate("/checkout/shipping")
    }[location.state, navigate]*/
  }, [])

  const submitPaymentMethod = async (e) => {
    e.preventDefault()

    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/current-user`,
        { withCredentials: true },
      )

      if (userData) {
        const cart = JSON.parse(localStorage.getItem("yolo-cart"))
        console.log(cart)
        const cartTotalCost = totalCost(cart).toFixed(2)
        console.log(cartTotalCost)
        setOrder({
          userId: userData.response.id,
          totalAmount: cartTotalCost,
        })

        try {
          const newOrder = await axios.post(
            `${process.env.REACT_APP_API_URL}/orders/create`,
            order,
            { withCredentials: true },
          )
          console.log(userData)

          if ((newOrder.response.status = 200)) {
            console.log(userData)
            cart.map((item) => {
              // HERE I SHOULD GET THE ORDER ID BUT I DID CREATE IT BEFORE SO I DO NOT KNOW
              try {
                axios.post(
                  `${process.env.REACT_APP_API_URL}/cart-items`,
                  { ...item }, // { ...item, orderId }
                  {
                    withCredentials: true,
                  },
                )
              } catch (error) {
                console.error(error)
              }
            })
          }
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const backToShippingPage = () => {
    navigate("/checkout/shipping", {
      state: { shippingData },
    })
  }

  const selectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
  }

  useEffectScrollTop()

  return (
    <div className={styles.paymentPageWrapper}>
      <div className={styles.paymentPage}>
        <form
          className={styles.paymentForm}
          onSubmit={(e) => submitPaymentMethod(e)}
        >
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
            <button
              className={styles.formButton}
              onClick={() => submitPaymentMethod()}
            >
              {text.paymentButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
