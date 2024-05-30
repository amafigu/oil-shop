import NotificationCard from "#components/ui/NotificationCard"
import { CART, PAYMENT, SIGN_UP } from "#constants/routes"
import useCartContext from "#context/cartContext"
import { useRedirectAdminFromCheckout } from "#hooks/useRedirectAdminFromCheckout"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShippingForm } from "./ShippingForm"
import styles from "./shipping.module.scss"

export const Shipping = () => {
  const navigate = useNavigate()
  const { translate } = useTranslation()
  const { cart } = useCartContext()
  const text = translate.pages.shipping
  const { notification, setNotification, isLoggedIn } =
    useRedirectAdminFromCheckout()

  useEffect(() => {
    if (cart.length <= 0) {
      navigate(CART)
    } else if (isLoggedIn) {
      navigate(PAYMENT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={styles.wrapper} aria-label='Customer shipping data page'>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <div className={styles.content}>
          {`Please `}
          <span className={styles.link}>
            <Link to={SIGN_UP}>sign up</Link>
          </span>
          {` ${text.titleSubSentence}`}
        </div>
        <ShippingForm
          isLoggedIn={isLoggedIn}
          setNotification={setNotification}
        />
      </section>
    </main>
  )
}
