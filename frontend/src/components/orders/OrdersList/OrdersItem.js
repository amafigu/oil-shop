import { useTranslation } from "#hooks/useTranslation"
import { convertIsoToLocaleDateString } from "#utils/stringManipulation"
import { OrderCard } from "./OrderCard"
import styles from "./ordersItem.module.scss"

export const OrdersItem = ({ order }) => {
  const { components } = useTranslation()
  const text = components.ordersItem

  return (
    <article className={styles.ordersItem} key={order.id}>
      <dl className={styles.details}>
        <div className={styles.detailsItem}>
          <dt className={styles.property}>{`${text.orderDate}:`}</dt>
          <dd className={styles.value}>
            {convertIsoToLocaleDateString(order.createdAt)}
          </dd>
        </div>
        <div className={styles.detailsItem}>
          <dt className={styles.property}>{`${text.payedWith}:`} </dt>
          <dd className={styles.value}>{order.paymentMethod}</dd>
        </div>
        <div className={styles.detailsItem}>
          <dt className={styles.property}>{`${text.total}:`} </dt>
          <dd className={styles.value}>{order.totalAmount} €</dd>
        </div>
      </dl>

      <ul className={styles.cardsList}>
        {order.cartItems.length > 0 ? (
          order.cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <OrderCard
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            </li>
          ))
        ) : (
          <li className={styles.noItems}>{text.productsHaveBeenDeleted}</li>
        )}
      </ul>
    </article>
  )
}
