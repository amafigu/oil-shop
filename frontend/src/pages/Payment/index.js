import NotificationCard from "#components/ui/NotificationCard"
import { useRedirectAdminFromCheckout } from "#hooks/useRedirectAdminFromCheckout"
import { scrollToTop } from "#utils/scrollToTop"
import { PaymentForm } from "./PaymentForm"
import styles from "./payment.module.scss"

export const Payment = () => {
  const { notification } = useRedirectAdminFromCheckout()
  scrollToTop()

  return (
    <main className={styles.paymentPageWrapper} aria-label='Payment page'>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.paymentPage}>
        <PaymentForm />
      </section>
    </main>
  )
}
