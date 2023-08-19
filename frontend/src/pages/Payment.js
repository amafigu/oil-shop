import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useLocaleContext from "../context/localeContext"
import styles from "./payment.module.scss"
const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { translate } = useLocaleContext()
  const shippingData = location.state.shippingData
  const text = translate.pages.payment

  const handlePaymentMethod = (method) => {
    navigate("/checkout/summary", {
      state: { shippingData, paymentMethod: method },
    })
  }

  return (
    <div className={styles.paymentPageWrapper}>
      <div className={styles.paymentPage}>
        <h2 className={styles.title}>Payment Method</h2>
        <form className={styles.paymentForm}>
          <fieldset>
            <legend>Please select your preferred payment method:</legend>
            <div>
              <div className={styles.row}>
                <input type='radio' id='' name='paypal' value='email' />
                <label htmlFor='paypal'>paypal</label>
              </div>
              <div className={styles.row}>
                <input type='radio' id='paypal' name='paypal' value='paypal' />
                <label htmlFor='klarna'>klarna</label>
              </div>
            </div>
            <div>
              <button onClick={() => handlePaymentMethod()} type='submit'>
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default Payment
