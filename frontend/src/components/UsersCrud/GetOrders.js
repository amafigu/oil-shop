import useUserContext from "#context/userContext"
import axios from "axios"
import React, { useState } from "react"
import ProductCard from "../ProductCard"

const GetOrders = () => {
  const [orders, setOrders] = useState([])

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

  console.log("orders", orders)
  return (
    <div>
      <h1>Orders</h1>
      <button onClick={() => getOrders()}>Get Orders</button>
      <ul>
        {orders &&
          orders.map((order) => (
            <li key={order.id}>
              {order.id} /
              <ul>
                {order.cartItems &&
                  order.cartItems.map((cartItem) => (
                    <li key={cartItem.id}>
                      <ProductCard product={cartItem.product} />
                      {cartItem.product.name}
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
