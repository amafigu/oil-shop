import NotificationCard from "#components/ui/NotificationCard"
import { ROUTES_CURRENT_ADMIN } from "#constants/constants"
import useUserContext from "#context/userContext"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { totalCost } from "#utils/cart"
import { scrollToTop } from "#utils/render"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"
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
                <CartItem
                  description={item.product.description}
                  image={item.product.image}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  size={item.product.size}
                />
                <hr />
              </div>
            ))
          ) : (
            <div className={styles.cartEmptyMessage}>
              <h3>{text.emptyCart}</h3>
            </div>
          )}
        </div>

        <CartOrderSummary totalCost={totalCost} />
      </div>
    </div>
  )
}
