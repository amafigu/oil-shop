import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import { PaymentForm } from "./PaymentForm"
import styles from "./payment.module.scss"

export const Payment: FC = () => {
  scrollToTop()

  return (
    <main className={styles.paymentPage}>
      <section className={styles.paymentFormContainer}>
        <PaymentForm />
      </section>
    </main>
  )
}
