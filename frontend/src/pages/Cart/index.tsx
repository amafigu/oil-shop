import { useCart } from "@/hooks/useCart"
import { useTranslation } from "@/hooks/useTranslation"
import { CartItem as CartItemType } from "@/types/Cart"
import { scrollToTop } from "@/utils/scrollToTop"
import { FC } from "react"
import { CartItem } from "./CartItem"
import { CartOrderSummary } from "./CartOrderSummary"
import styles from "./cart.module.scss"

export const Cart: FC = () => {
  const { cart } = useCart()
  const { translate } = useTranslation()
  const text = translate.pages.cart
  scrollToTop()
  return (
    <main className={styles.wrapper} aria-label='shopping cart'>
      <section className={styles.container}>
        <ul className={styles.list} aria-label='items list'>
          {cart.length > 0 ? (
            cart.map((item: CartItemType) => (
              <li
                className={styles.item}
                key={`${item.product.name}${item.product.price}`}
              >
                <CartItem item={item} />
                <hr />
              </li>
            ))
          ) : (
            <div className={styles.message}>
              <h3>{text.emptyCart}</h3>
            </div>
          )}
        </ul>
        <CartOrderSummary />
      </section>
    </main>
  )
}
