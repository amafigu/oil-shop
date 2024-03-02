import NotificationCard from "#components/ui/NotificationCard"
import { ToggleButton } from "#components/ui/ToggleButton"
import { STYLES } from "#constants/styles"
import { useGetOrdersWithProducts } from "#hooks/useGetOrdersWithProducts"
import { useTranslation } from "#hooks/useTranslation"
import { useEffect } from "react"
import { OrdersItem } from "./OrdersItem"
import styles from "./ordersList.module.scss"
export const OrdersList = () => {
  const {
    getOrdersWithProducts,
    showOrders,
    setShowOrders,
    orders,
    notification,
  } = useGetOrdersWithProducts()

  useEffect(() => {
    getOrdersWithProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { components } = useTranslation()
  const text = components.ordersList
  const showOrderListAndGetData = (bool) => {
    setShowOrders(bool)
  }

  return (
    <section className={styles.ordersListWrapper} aria-label={text.title}>
      {notification && <NotificationCard message={notification} />}
      <h2 className={styles.title}>{text.title}</h2>
      <ToggleButton
        isVisible={showOrders}
        onToggle={showOrderListAndGetData}
        hideBtnText={text.hideToggleButton.toUpperCase()}
        showBtnText={text.showToggleButton.toUpperCase()}
        classCss={STYLES.BUTTONS.SHOW_HIDE}
      />
      <ul className={styles.ordersList}>
        {showOrders &&
          orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <li key={order.id}>
              <OrdersItem order={order} />
            </li>
          ))}
      </ul>
    </section>
  )
}
