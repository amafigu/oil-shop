import ProductDetailsRow from "#components/ProductDetailsRow"
import ToggleButton from "#components/ToggleButton"
import useUserContext from "#context/userContext"
import { convertToReadableDate } from "#utils/utils"
import axios from "axios"
import React, { useState } from "react"
import styles from "./getOrders.module.scss"

const GetOrders = () => {
  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState(false)

  const { userId } = useUserContext()

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/all/${parseInt(userId)}`,
      )

      const ordersWithDetails = await Promise.all(
        response.data.map(async (order) => {
          const cartItemsResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/orders/cart-items/${order.id}`,
          )
          return { ...order, cartItems: cartItemsResponse.data }
        }),
      )

      setOrders(ordersWithDetails)
    } catch (error) {
      console.error(error)
    }
  }

  const showOrderListAndGetData = (bool) => {
    getOrders()
    setShowOrders(bool)
  }
  console.log("orders", orders)
  return (
    <div className={styles.getOrdersWrapper}>
      <h1 className={styles.title}>Orders</h1>

      <ToggleButton
        show={showOrders}
        setToggle={showOrderListAndGetData}
        textHide={"Hide Orders"}
        textShow={"Show Orders"}
        classCss='showHideButtons'
      />

      <ul className={styles.ordersList}>
        {showOrders &&
          orders &&
          orders.length > 0 &&
          orders.map((order) => (
            <li className={styles.order} key={order.id}>
              <div className={styles.orderDetails}>
                <div>
                  <span className={styles.property}>Ordered At:</span>
                  <span className={styles.value}>
                    {convertToReadableDate(order.createdAt)}
                  </span>
                </div>
                <div>
                  <span className={styles.property}>Order Total: </span>
                  <span className={styles.value}>{order.totalAmount} €</span>
                </div>

                <div>
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
          ))}
      </ul>
    </div>
  )
}

export default GetOrders
