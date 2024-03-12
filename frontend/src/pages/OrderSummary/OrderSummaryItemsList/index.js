import { OrderSummaryItem } from "./OrderSummaryItem"
import styles from "./orderSummaryItemsList.module.scss"

export const OrderSummaryItemsList = ({ orderAndCartItems }) => {
  return (
    <section className={styles.orderSummaryItems} aria-label='Ordered items'>
      <ul className={styles.itemsList}>
        {orderAndCartItems &&
          orderAndCartItems.cartItems &&
          orderAndCartItems.cartItems.map((item, index) => (
            <li key={index} className={styles.item}>
              <OrderSummaryItem
                image={item.product.image}
                name={item.product.name}
                size={item.product.size}
                quantity={item.quantity}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}
