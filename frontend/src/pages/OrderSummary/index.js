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
    <main className={styles.orderSummary} aria-label='Order Summary Page'>
      {notification && <NotificationCard message={notification} />}
      <header className={styles.columnTitle}>
        <h1 className={styles.pageTitle}>{text.thankClient}</h1>
        <h2 className={styles.summaryTitle}>{text.orderResume}:</h2>
      </header>
      <section className={styles.columnsSection} aria-label='Order details'>
        <div className={styles.dataColumn}>
          {shippingData && (
            <OrderSummaryData
              userData={userData}
              shippingData={shippingData}
              orderData={orderData}
            />
          )}
        </div>
        <div className={styles.itemsColumn}>
          {orderAndCartItems && (
            <OrderSummaryItemsList orderAndCartItems={orderAndCartItems} />
          )}
        </div>
      </section>
    </main>
  )
}
