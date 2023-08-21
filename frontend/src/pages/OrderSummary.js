import { titleCase } from "#utils/utils"
import React, { useContext } from "react"
import { useLocation } from "react-router-dom"
import { CartContext } from "../context/cartContext"
import styles from "./orderSummary.module.scss"

const OrderSummary = () => {
  const location = useLocation()
  const { cart } = useContext(CartContext)
  const { shippingData, paymentMethod } = location.state

  const totalCost = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  )

  return (
    <div className={styles.orderSummaryWrapper}>
      <div className={styles.orderSummary}>
        <h1>Thank you for trust Oylo!</h1>
        <div className={styles.columns}>
          <div className={styles.clientDetails}>
            <h2>Order Details</h2>

            <p>Name: {shippingData.name}</p>
            <p>Email: {shippingData.email}</p>
            <p>Address: {shippingData.address}</p>
            <p>Phone: {shippingData.phone}</p>

            <h2>Payment Method</h2>
            <p>{paymentMethod}</p>
            <h2>Total</h2>
            <p>{totalCost + 10}</p>
          </div>
          <div className={styles.purchasedProducts}>
            <h2>Products</h2>
            <div className={styles.cartItemsList}></div>
            {cart.map((item, index) => (
              <div key={index}>
                <div className={styles.cartItem}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/assets/" + item.product.image
                    }
                    alt={item.product.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h3>{titleCase(item.product.name, "_")}</h3>
                    <p>{item.product.description}</p>
                    <p>{item.product.size} ml</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
