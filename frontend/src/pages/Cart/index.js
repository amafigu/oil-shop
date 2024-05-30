import NotificationCard from "#components/ui/NotificationCard"
import { useCart } from "#hooks/useCart"
import { useRedirectAdminFromCheckout } from "#hooks/useRedirectAdminFromCheckout"
import { useTranslation } from "#hooks/useTranslation"
import { scrollToTop } from "#utils/scrollToTop"
import { totalCost } from "#utils/totalCost"
import React from "react"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"
import styles from "./cart.module.scss"

export const Cart = () => {
  const { cart } = useCart()
  const { notification } = useRedirectAdminFromCheckout()
  const { translate } = useTranslation()
  const text = translate.pages.cart
  scrollToTop()
  return (
    <main className={styles.wrapper} aria-label='shopping cart'>
      {notification && <NotificationCard message={notification} />}
      <section className={styles.container}>
        <ul className={styles.list} aria-label='items list'>
          {cart.length > 0 ? (
            cart.map((item) => (
              <li
                className={styles.item}
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
              </li>
            ))
          ) : (
            <div className={styles.message}>
              <h3>{text.emptyCart}</h3>
            </div>
          )}
        </ul>
        <CartOrderSummary totalCost={totalCost} />
      </section>
    </main>
  )
}
