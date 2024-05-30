import { SHIPPING_COST } from "#constants/cart"
import { camelToTitleCase } from "#utils/camelToTitleCase"
import styles from "./orderSummaryData.module.scss"

export const OrderSummaryData = ({ userData, shippingData, orderData }) => {
  return (
    <section className={styles.container} aria-label='Client data'>
      <dl className={styles.list}>
        {userData &&
          Object.keys(userData).map((key) => (
            <div key={key} className={styles.field}>
              <dt>{camelToTitleCase(key)}: </dt>
              <dd>{userData[key]}</dd>
            </div>
          ))}
        {shippingData &&
          Object.keys(shippingData).map((key) => (
            <div key={key} className={styles.field}>
              <dt>{camelToTitleCase(key)}: </dt>
              <dd>{shippingData[key]}</dd>
            </div>
          ))}
        {orderData &&
          Object.keys(orderData).map((key) =>
            key === "totalAmount" ? (
              <div key={key} className={styles.field}>
                <dt>{camelToTitleCase(key)}: </dt>
                <dd>{`${Number(orderData[key] + SHIPPING_COST).toFixed(
                  2,
                )} €`}</dd>
              </div>
            ) : (
              <div key={key} className={styles.field}>
                <dt>{camelToTitleCase(key)}: </dt>
                <dd>{camelToTitleCase(orderData[key])}</dd>
              </div>
            ),
          )}
      </dl>
    </section>
  )
}
