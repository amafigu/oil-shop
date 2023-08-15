import React, { useContext } from "react"
import { useLocation } from "react-router-dom"
import { CartContext } from "../context/cartContext"

const OrderSummary = () => {
  const location = useLocation()
  const { cart } = useContext(CartContext)
  const { shippingData, paymentMethod } = location.state

  const totalCost = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  )

  return (
    <div>
      <h2>Shipping Details</h2>
      <p>Name: {shippingData.name}</p>
      <p>Email: {shippingData.email}</p>
      <p>Address: {shippingData.address}</p>
      <p>Phone: {shippingData.phone}</p>

      <h2>Payment Method</h2>
      <p>{paymentMethod}</p>
      <h2>Total</h2>
      <p>{totalCost + 10}</p>

      <h2>Products</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>Name: {item.product.name}</p>
          <p>Quantity: {item.quantity}</p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/${item.product.image}`}
            alt={item.product.name}
          />
        </div>
      ))}
    </div>
  )
}

export default OrderSummary
