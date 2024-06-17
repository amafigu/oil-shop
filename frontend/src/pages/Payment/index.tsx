import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import { PaymentForm } from "./PaymentForm"
import styles from "./payment.module.scss"

export const Payment: FC = () => {
  scrollToTop()

  return (
    <main className={styles.wrapper} aria-label='Payment page'>
      <section className={styles.container}>
        <PaymentForm />
      </section>
    </main>
  )
}
