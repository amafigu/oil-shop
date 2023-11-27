import NotificationCard from "#components/NotificationCard"
import ProductDetailsRow from "#components/ProductDetailsRow"
import ToggleButton from "#components/ToggleButton"
import useUserContext from "#context/userContext"
import {
  convertIsoToLocaleDateString,
  getUserOrdersWithProductsList,
} from "#utils/utils"
import React, { useEffect, useMemo, useState } from "react"
import styles from "./getOrders.module.scss"

const GetOrders = () => {
  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState(false)
  const [notification, setNotification] = useState(null)
  const { userId } = useUserContext()

  useEffect(() => {
    if (showOrders && orders.length === 0) {
      getOrdersWithProducts()
    }
  }, [showOrders])

  const renderedOrders = useMemo(() => {
    return orders.map((order) => (
      <li className={styles.order} key={order.id}>
        <div className={styles.orderDetails}>
          <div className={styles.date}>
            <span className={styles.property}>Ordered At:</span>
            <span className={styles.value}>
              {" "}
              {convertIsoToLocaleDateString(order.createdAt)}
            </span>
          </div>
          <div className={styles.total}>
            <span className={styles.property}>Order Total: </span>
            <span className={styles.value}>{order.totalAmount} €</span>
          </div>

          <div className={styles.paymentMethod}>
            <span className={styles.property}>Payed with: </span>
            <span className={styles.value}>{order.paymentMethod}</span>
          </div>
        </div>

        <ul className={styles.cartItems}>
          {order.cartItems &&
            order.cartItems.map((cartItem) => (
              <li key={cartItem.id}>
                <ProductDetailsRow
                  product={cartItem.product}
                  quantity={cartItem.quantity}
                />
              </li>
            ))}
        </ul>
      </li>
    ))
  }, [orders])

  const getOrdersWithProducts = async () => {
    try {
      const ordersWithDetails = await getUserOrdersWithProductsList(userId)
      setOrders(ordersWithDetails)
      if (ordersWithDetails.length === 0) {
        setShowOrders(false)
        setNotification(
          "You have no orders yet, please make an order and come back later",
        )
        setTimeout(() => setNotification(null), 2000)
      }
    } catch (error) {
      console.error(error)
      setNotification(
        "It is not possible to get the orders at the moment, please try again",
      )
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const showOrderListAndGetData = (bool) => {
    setShowOrders(bool)
  }

  return (
    <div className={styles.getOrdersWrapper}>
      {notification && <NotificationCard message={notification} />}
      <h1 className={styles.title}>Orders</h1>

      <ToggleButton
        show={showOrders}
        setToggle={showOrderListAndGetData}
        textHide={"HIDE ORDERS"}
        textShow={"SHOW ORDERS"}
        classCss='showHideButtons'
      />

      <ul className={styles.ordersList}>
        {showOrders && orders && orders.length > 0 && renderedOrders}
      </ul>
    </div>
  )
}

export default GetOrders
