import { ActionButton } from "@/components/ui/ActionButton"
import { SubmitButton } from "@/components/ui/SubmitButton"
import { CART } from "@/constants/routes"
import { STYLES } from "@/constants/styles"
import { useNotificationContext } from "@/context/notificationContext"
import { useSubmitOrder } from "@/hooks/useSubmitOrder"
import { useTranslation } from "@/hooks/useTranslation"
import { ChangeEvent, FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./paymentForm.module.scss"

export const PaymentForm: FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { submitOrder } = useSubmitOrder()
  const { translate } = useTranslation()
  const { setNotification } = useNotificationContext()
  const text = translate.pages.payment
  const navigate = useNavigate()

  const selectPaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
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
          <legend className={styles.subtitle}>{text.legend}</legend>
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
        <div className={styles.buttonsContainer}>
          <ActionButton
            className={STYLES.BUTTONS.ACTION}
            action={() => navigate(CART)}
          >
            {text.backButton}
          </ActionButton>
          <SubmitButton
            className={STYLES.BUTTONS.ACTION}
            text={text.paymentButton}
          />
        </div>
      </form>
    </>
  )
}
