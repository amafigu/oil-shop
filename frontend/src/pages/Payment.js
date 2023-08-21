import { React, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./payment.module.scss"

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isMethodSelected, setIsMethodSelected] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const shippingData = location.state.shippingData
  const text = translate.pages.payment

  const submitPaymentMethod = () => {
    if (!paymentMethod) {
      setIsMethodSelected(false)
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
    setIsMethodSelected(true)
  }

  return (
    <div className={styles.paymentPageWrapper}>
      <div className={styles.separator}></div>

      <div className={styles.paymentPage}>
        <form className={styles.paymentForm}>
          <div className={styles.titleAndAlertContainer}>
            <legend className={styles.title}>{text.title}</legend>
            {!isMethodSelected && (
              <legend className={styles.requirePaymentText}>
                {text.insertPaymentMethod}
              </legend>
            )}
          </div>

          <div className={styles.methods}>
            <div
              className={
                isMethodSelected
                  ? styles.row
                  : `${styles.row} ${styles.requirePaymentMethod}`
              }
            >
              <input
                type='radio'
                id='paypal'
                name='paymentMethod'
                value='paypal'
                checked={paymentMethod === "paypal"}
                onChange={selectPaymentMethod}
              />
              <label htmlFor='paypal'>Paypal</label>
            </div>
            <div
              className={
                isMethodSelected
                  ? styles.row
                  : `${styles.row} ${styles.requirePaymentMethod}`
              }
            >
              <input
                type='radio'
                id='klarna'
                name='paymentMethod'
                value='klarna'
                checked={paymentMethod === "klarna"}
                onChange={selectPaymentMethod}
              />
              <label htmlFor='klarna'>Klarna</label>
            </div>
          </div>
          <div className={styles.navigateButtons}>
            <span
              tabIndex='0'
              className={styles.formButton}
              onClick={() => backToShippingPage()}
            >
              {text.backButton}
            </span>
            <span
              tabIndex='0'
              className={styles.formButton}
              onClick={() => submitPaymentMethod()}
            >
              {text.paymentButton}
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Payment
