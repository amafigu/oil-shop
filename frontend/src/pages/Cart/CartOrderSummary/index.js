import { SHIPPING_COST } from "#constants/cart"
import {
  ROUTES_CART,
  ROUTES_CHECKOUT_PAYMENT,
  ROUTES_CHECKOUT_SHIPPING,
} from "#constants/routes"
import { useCart } from "#hooks/useCart"
import { useCurrentUser } from "#hooks/useCurrentUser"
import { useTranslation } from "#hooks/useTranslation"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./cartOrderSummary.module.scss"

export const CartOrderSummary = ({ totalCost }) => {
  const { cart } = useCart()
  const { isLoggedIn } = useCurrentUser()
  const { translate } = useTranslation()
  const text = translate.pages.cart
  const cartTotalSum = (cart, shippingCost) =>
    Number(totalCost(cart).toFixed(2)) + Number(shippingCost.toFixed(2))

  const renderLink = () => {
    if (cart.length > 0) {
      const route = isLoggedIn
        ? ROUTES_CHECKOUT_PAYMENT
        : ROUTES_CHECKOUT_SHIPPING
      const label = "confirm order"
      const text = "Confirm Purchase"

      return (
        <Link
          className={styles.confirmOrderButton}
          to={route}
          aria-label={label}
        >
          {text}
        </Link>
      )
    } else {
      return (
        <Link
          className={styles.confirmOrderButton}
          to={ROUTES_CART}
          aria-label='make an order to continue to checkout'
        >
          {text.orderToContinue}
        </Link>
      )
    }
  }
  return (
    <section className={styles.cartOrderSummary} aria-label='order summary'>
      <h2 className={styles.orderSummaryTitle}>{text.orderSummary}</h2>
      <dl className={styles.cartOrderSummaryDetails}>
        <div className={styles.summaryItem}>
          <dt className={styles.summaryItemProperty}>{text.orderSubtotal}</dt>
          <dd>{totalCost(cart).toFixed(2)} €</dd>
        </div>
        <div className={styles.summaryItem}>
          <dt className={styles.summaryItemProperty}>{text.orderShipping} </dt>
          <dd>{SHIPPING_COST.toFixed(2)} €</dd>
        </div>
        <div className={styles.totalCostDivider}>
          <hr />
        </div>
        <div className={styles.summaryItem}>
          <dt className={styles.summaryItemProperty}>{text.orderTotal}</dt>
          <dd>{cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €</dd>
        </div>
      </dl>
      {renderLink()}
    </section>
  )
}
