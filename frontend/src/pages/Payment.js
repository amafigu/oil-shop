import { SHIPPING_COST } from "#utils/constants"
import { totalCost, useEffectScrollTop } from "#utils/utils"
import axios from "axios"
import { React, useState } from "react"
import { useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [order, setOrder] = useState({
    userId: "",
    totalAmount: "",
  })

  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const text = translate.pages.payment

  const submitPaymentMethod = async (e) => {
    e.preventDefault()

    try {
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
        setOrder(newOrder)
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
      <div className={styles.paymentPage}>
        <form className={styles.paymentForm} onSubmit={submitPaymentMethod}>
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
