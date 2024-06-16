import { SHIPPING } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import { useSubmitOrder } from "@/hooks/useSubmitOrder"
import { useTranslation } from "@/hooks/useTranslation"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./paymentForm.module.scss"

export const PaymentForm: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { submitOrder } = useSubmitOrder()
  const { translate } = useTranslation()
  const { setNotification } = useNotificationContext()
  const text = translate.pages.payment
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectPaymentMethod = (e: any) => {
    setPaymentMethod(e.target.value)
  }

  return (
    <>
      <form
        aria-label='Submit Payment Form'
        className={styles.container}
        onSubmit={(e) => submitOrder(e, paymentMethod, setNotification)}
      >
        <header className={styles.title}>
          <h2>{text.title}</h2>
        </header>
        <fieldset className={styles.options}>
          <legend>{text.legend}</legend>
          <div className={styles.option}>
            <input
              aria-label='payment with paypal'
              type='radio'
              id='paypal'
              value='paypal'
              checked={paymentMethod === "paypal"}
              onChange={selectPaymentMethod}
              required
            />
            <label htmlFor='paypal'>Paypal</label>
          </div>
          <div className={styles.option}>
            <input
              aria-label='payment with google pay'
              type='radio'
              id='googlePay'
              value='googlePay'
              checked={paymentMethod === "googlePay"}
              onChange={selectPaymentMethod}
              required
            />
            <label htmlFor='googlePay'>Google Pay</label>
          </div>
        </fieldset>
        <div className={styles.buttons}>
          <button
            aria-label='come back to shipping data form'
            className={styles.button}
            onClick={() => navigate(SHIPPING)}
          >
            {text.backButton}
          </button>
          <button
            aria-label='submit payment'
            className={styles.button}
            type='submit'
          >
            {text.paymentButton}
          </button>
        </div>
      </form>
    </>
  )
}
