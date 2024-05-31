import NotificationCard from "#components/ui/NotificationCard"
import { useGetOrderSummary } from "#hooks/useGetOrderSummary"
import { useTranslation } from "#hooks/useTranslation"
import { OrderSummaryData } from "./OrderSummaryData"
import { OrderSummaryItemsList } from "./OrderSummaryItemsList"
import styles from "./orderSummary.module.scss"

export const OrderSummary = () => {
  const { translate } = useTranslation()
  const text = translate.pages.orderSummary
  const { notification, userData, shippingData, orderData, orderAndCartItems } =
    useGetOrderSummary()

  return (
    <main className={styles.wrapper} aria-label='Order Summary Page'>
      {notification && <NotificationCard message={notification} />}
      <header className={styles.header}>
        <h1 className={styles.title}>{text.thankClient}</h1>
        <h2 className={styles.subtitle}>{text.orderResume}:</h2>
      </header>
      <section className={styles.columns} aria-label='Order details'>
        <div className={styles.customer}>
          {shippingData && (
            <OrderSummaryData
              userData={userData}
              shippingData={shippingData}
              orderData={orderData}
            />
          )}
        </div>
        <div className={styles.items}>
          {orderAndCartItems && (
            <OrderSummaryItemsList orderAndCartItems={orderAndCartItems} />
          )}
        </div>
      </section>
    </main>
  )
}
