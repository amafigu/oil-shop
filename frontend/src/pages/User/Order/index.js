import { useTranslation } from "#hooks/useTranslation"
import { convertIsoToLocaleDateString } from "#utils/convertIsoToLocaleDateString"
import { OrderCard } from "./OrderCard"
import styles from "./order.module.scss"

export const Order = ({ item }) => {
  const { components } = useTranslation()
  const text = components.ordersItem

  return (
    <article className={styles.item}>
      <dl className={styles.content}>
        <div className={styles.details}>
          <dt className={styles.property}>{`${text.orderDate}:`}</dt>
          <dd className={styles.value}>
            {convertIsoToLocaleDateString(item.createdAt)}
          </dd>
        </div>
        <div className={styles.details}>
          <dt className={styles.property}>{`${text.payedWith}:`} </dt>
          <dd className={styles.value}>{item.paymentMethod}</dd>
        </div>
        <div className={styles.details}>
          <dt className={styles.property}>{`${text.total}:`} </dt>
          <dd className={styles.value}>{item.totalAmount} €</dd>
        </div>
      </dl>

      <ul className={styles.list}>
        {item.cartItems.length > 0 ? (
          item.cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <OrderCard
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            </li>
          ))
        ) : (
          <li className={styles.info}>{text.productsHaveBeenDeleted}</li>
        )}
      </ul>
    </article>
  )
}
