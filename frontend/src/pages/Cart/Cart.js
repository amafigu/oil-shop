import NotificationCard from "#components/ui/NotificationCard"
import {
  ROUTES_CART,
  ROUTES_CHECKOUT_SHIPPING,
  ROUTES_CURRENT_ADMIN,
  SHIPPING_COST,
} from "#constants/constants"
import useUserContext from "#context/userContext"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { cartTotalSum, totalCost } from "#utils/cart"
import { scrollToTop } from "#utils/render"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem"
import styles from "./cart.module.scss"
export const Cart = () => {
  const [notification, setNotification] = useState(null)
  const { cart } = useCart()
  const { translate } = useTranslation()
  const text = translate.pages.cart
  const { user } = useUserContext()
  const navigate = useNavigate()

  scrollToTop()
  useEffect(() => {
    if (user && user.role === "admin") {
      setNotification("as admin you can not buy products")
      setTimeout(() => setNotification(null), 3000)
      setTimeout(() => navigate(ROUTES_CURRENT_ADMIN), 3000)
    }
  }, [user, navigate])

  return (
    <div className={styles.cartWrapper}>
      {notification && <NotificationCard message={notification} />}
      <div className={styles.cart}>
        <div className={styles.cartItemsList}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                className={styles.cartItemContainer}
                key={`${item.product.name}${item.product.price}`}
              >
                <CartItem item={item} />
                <hr />
              </div>
            ))
          ) : (
            <div className={styles.cartEmptyMessage}>
              <h1>{text.emptyCart}</h1>
            </div>
          )}
        </div>

        <div className={styles.cartOrderSummary}>
          <h2 className={styles.orderSummaryText}>{text.orderSummary}</h2>
          <div className={styles.cartOrderSummaryDetails}>
            <div>
              <span>{text.orderSubtotal} </span>
              <span>{totalCost(cart).toFixed(2)} €</span>
            </div>
            <div>
              <span>{text.orderShipping} </span>
              <span>{SHIPPING_COST.toFixed(2)} €</span>
            </div>
            <div className={styles.totalCostDivider}>
              <hr />
            </div>

            <div>
              <span className={styles.orderTotalText}>{text.orderTotal} </span>
              <span>{cartTotalSum(cart, SHIPPING_COST).toFixed(2)} €</span>
            </div>
          </div>
          {cart.length > 0 ? (
            <Link
              className={styles.confirmOrderButton}
              to={ROUTES_CHECKOUT_SHIPPING}
            >
              {text.confirmPurchase}
            </Link>
          ) : (
            <Link className={styles.confirmOrderButton} to={ROUTES_CART}>
              {text.orderToContinue}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
