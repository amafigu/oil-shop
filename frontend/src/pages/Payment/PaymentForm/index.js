import NotificationCard from "#components/ui/NotificationCard"
import { ROUTES_CHECKOUT_SHIPPING } from "#constants/routes"
import { useSubmitOrder } from "#hooks/useSubmitOrder"
import { useTranslation } from "#hooks/useTranslation"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./paymentForm.module.scss"

export const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { submitOrder } = useSubmitOrder()
  const { translate } = useTranslation()
  const [notification, setNotification] = useState(null)
  const text = translate.pages.payment
  const navigate = useNavigate()

  const selectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value)
  }

  return (
    <>
      {notification && <NotificationCard message={notification} />}
      <form
        aria-label='Submit Payment Form'
        className={styles.paymentForm}
        onSubmit={(e) => submitOrder(e, paymentMethod, setNotification)}
      >
        <header className={styles.titleContainer}>
          <h2 className={styles.title}>{text.title}</h2>
        </header>
        <fieldset className={styles.methods}>
          <legend>{text.legend}</legend>
          <div className={styles.row}>
            <input
              aria-label='payment with paypal'
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
              aria-label='payment with google pay'
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
        </fieldset>
        <div className={styles.navigateButtons}>
          <button
            aria-label='come back to shipping data form'
            className={styles.formButton}
            onClick={() => navigate(ROUTES_CHECKOUT_SHIPPING)}
          >
            {text.backButton}
          </button>
          <button
            aria-label='submit payment'
            className={styles.formButton}
            type='submit'
          >
            {text.paymentButton}
          </button>
        </div>
      </form>
    </>
  )
}
