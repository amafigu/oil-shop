import { useTranslation } from "@/hooks/useTranslation"
import { Order as IOrder, OrderItem } from "@/types/Order"
import { isoToLocaleDate } from "@/utils/isoToLocaleDate"
import { FC } from "react"
import { OrderCard } from "./OrderCard"
import styles from "./order.module.scss"

interface OrderProps {
  item: IOrder
}

export const Order: FC<OrderProps> = ({ item }) => {
  const { components } = useTranslation()
  const text = components.ordersItem

  return (
    <article className={styles.item}>
      <dl className={styles.content}>
        <div className={styles.details}>
          <dt className={styles.property}>{`${text.orderDate}:`}</dt>
          <dd className={styles.value}>{isoToLocaleDate(item.createdAt)}</dd>
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
          item.cartItems.map((cartItem: OrderItem) => (
            <li key={cartItem.id}>
              {cartItem.product ? (
                <OrderCard
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              ) : (
                <p>{text.productNotFound}</p>
              )}
            </li>
          ))
        ) : (
          <li className={styles.info}>{text.productsHaveBeenDeleted}</li>
        )}
      </ul>
    </article>
  )
}
