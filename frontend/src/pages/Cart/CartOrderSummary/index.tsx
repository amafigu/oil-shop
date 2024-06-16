import { SHIPPING_COST } from "@/constants/cart"
import { LOGIN, PAYMENT, SHOP } from "@/constants/routes"
import { useUserContext } from "@/context/userContext"
import { useCart } from "@/hooks/useCart"
import { useTranslation } from "@/hooks/useTranslation"
import { CartItem } from "@/types/Cart"
import { getTotalCost } from "@/utils/getTotalCost"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./cartOrderSummary.module.scss"

export const CartOrderSummary: FC = () => {
  const { cart } = useCart()
  const { isLoggedIn } = useUserContext()
  const { translate } = useTranslation()
  const text = translate.pages.cart

  const cartTotalSum = (cart: CartItem[], shippingCost: number) =>
    Number(getTotalCost(cart).toFixed(2)) + Number(shippingCost.toFixed(2))

  const renderLink = () => {
    if (cart.length > 0) {
      const route = isLoggedIn ? PAYMENT : LOGIN
      const label = isLoggedIn ? "confirm order" : "login to purchase"
      const text = isLoggedIn ? "Confirm Purchase" : "login to purchase"

      return (
        <Link className={styles.link} to={route} aria-label={label}>
          {text}
        </Link>
      )
    } else {
      return (
        <Link
          className={styles.link}
          to={SHOP}
          aria-label='make an order to continue to checkout'
        >
          {text.orderToContinue}
        </Link>
      )
    }
  }

  return (
    <section className={styles.wrapper} aria-label='Products cart summary'>
      <h2 className={styles.title}>{text.orderSummary}</h2>
      <dl className={styles.details}>
        <div className={styles.item}>
          <dt className={styles.field}>{text.orderSubtotal}</dt>
          <dd>{getTotalCost(cart).toFixed(2)} €</dd>
        </div>
        <div className={styles.item}>
          <dt className={styles.field}>{text.orderShipping} </dt>
          <dd>{SHIPPING_COST.toFixed(2)} €</dd>
        </div>
        <div className={styles.divider}>
          <hr />
        </div>
        <div className={styles.item}>
          <dt className={styles.field}>{text.orderTotal}</dt>
          <dd>{cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €</dd>
        </div>
      </dl>
      {renderLink()}
    </section>
  )
}
