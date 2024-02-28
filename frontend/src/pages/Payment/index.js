import NotificationCard from "#components/ui/NotificationCard"
import { useCheckAdminAndRedirect } from "#hooks/useCheckAdminAndRedirect"
import { scrollToTop } from "#utils/render"
import { SubmitPayment } from "./SubmitPayment"
import styles from "./payment.module.scss"

export const Payment = () => {
  const { notification, setNotification, isLoggedIn, userId } =
    useCheckAdminAndRedirect()

  scrollToTop()

  return (
    <main className={styles.paymentPageWrapper} aria-label='Payment page'>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.paymentPage}>
        <SubmitPayment
          isLoggedIn={isLoggedIn}
          userId={userId}
          setNotification={setNotification}
        />
      </section>
    </main>
  )
}
