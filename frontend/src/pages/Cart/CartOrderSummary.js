import { SHIPPING_COST } from "#constants/constants"
import { ROUTES_CART, ROUTES_CHECKOUT_SHIPPING } from "#constants/routes"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { cartTotalSum } from "#utils/cart"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./cartOrderSummary.module.scss"

export const CartOrderSummary = ({ totalCost }) => {
  const { cart } = useCart()
  const { translate } = useTranslation()
  const text = translate.pages.cart

  return (
    <section className={styles.cartOrderSummary} aria-label='cart details'>
      <h2 className={styles.orderSummaryText}>{text.orderSummary}</h2>
      <dl className={styles.cartOrderSummaryDetails}>
        <div>
          <dt>{text.orderSubtotal} </dt>
          <dd>{totalCost(cart).toFixed(2)} €</dd>
        </div>
        <div>
          <dt>{text.orderShipping} </dt>
          <dd>{SHIPPING_COST.toFixed(2)} €</dd>
        </div>
        <div className={styles.totalCostDivider}>
          <hr />
        </div>
        <div>
          <dt className={styles.orderTotalText}>{text.orderTotal} </dt>
          <dd>{cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €</dd>
        </div>
      </dl>
      {cart.length > 0 ? (
        <Link
          className={styles.confirmOrderButton}
          to={ROUTES_CHECKOUT_SHIPPING}
          aria-label='confirm order'
        >
          {text.confirmPurchase}
        </Link>
      ) : (
        <Link
          className={styles.confirmOrderButton}
          to={ROUTES_CART}
          aria-label='make an order to continue to checkout'
        >
          {text.orderToContinue}
        </Link>
      )}
    </section>
  )
}
