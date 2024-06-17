import { SHIPPING_COST } from "@/constants/cart"
import { OrderData, OrderShippingData, OrderUser } from "@/types/Order"
import { camelToTitleCase } from "@/utils/camelToTitleCase"
import { FC } from "react"
import styles from "./orderSummaryData.module.scss"

interface OrderSummaryDataProps {
  userData: OrderUser
  shippingData: OrderShippingData
  orderData: OrderData
}

export const OrderSummaryData: FC<OrderSummaryDataProps> = ({
  userData,
  shippingData,
  orderData,
}) => {
  return (
    <section className={styles.container} aria-label='Client data'>
      <dl className={styles.list}>
        {Object.keys(userData).map((key) => (
          <div key={key} className={styles.field}>
            <dt>{camelToTitleCase(key)}: </dt>
            <dd>{userData[key as keyof OrderUser]}</dd>
          </div>
        ))}
        {Object.keys(shippingData).map((key) => (
          <div key={key} className={styles.field}>
            <dt>{camelToTitleCase(key)}: </dt>
            <dd>{shippingData[key as keyof OrderShippingData]}</dd>
          </div>
        ))}
        {Object.keys(orderData).map((key) =>
          key === "totalAmount" ? (
            <div key={key} className={styles.field}>
              <dt>{camelToTitleCase(key)}: </dt>
              <dd>{`${(
                Number(orderData[key as keyof OrderData]) + SHIPPING_COST
              ).toFixed(2)} €`}</dd>
            </div>
          ) : (
            <div key={key} className={styles.field}>
              <dt>{camelToTitleCase(key)}: </dt>
              <dd>
                {camelToTitleCase(orderData[key as keyof OrderData] as string)}
              </dd>
            </div>
          ),
        )}
      </dl>
    </section>
  )
}
