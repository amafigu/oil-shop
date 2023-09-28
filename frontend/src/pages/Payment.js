import { useEffectScrollTop } from "#utils/utils"
import { React, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")

  const location = useLocation()
  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const shippingData = location.state?.shippingData
  const text = translate.pages.payment

  useEffect(() => {
    if (!location.state || !location.state.shippingData) {
      navigate("/checkout/shipping")
    }
  }, [location.state, navigate])

  const submitPaymentMethod = () => {
    if (!paymentMethod) {
      return
    }
    navigate("/checkout/summary", {
      state: { shippingData, paymentMethod },
    })
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
        <form className={styles.paymentForm} onSubmit={submitPaymentMethod}>
          <div className={styles.titleAndAlertContainer}>
            <legend className={styles.title}>{text.title}</legend>
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
