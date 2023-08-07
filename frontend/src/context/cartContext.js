import React, { useState, createContext, useContext } from "react"
import NotificationCard from "../components/NotificationCard"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [notification, setNotification] = useState(null)

  const addProduct = (product, quantity) => {
    const existingProduct = cart.find(
      (item) => item.product.name === product.name,
    )

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      )
    } else {
      setCart([...cart, { product, quantity }])
    }

    setNotification(`${quantity} ${product.name} were added to cart`)
    setTimeout(() => setNotification(null), 1000)
  }

  const updateProductQuantity = (productName, newQuantity) => {
    if (newQuantity >= 0) {
      setCart(
        cart.map((item) =>
          item.product.name === productName
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      )
    }
  }

  const removeProduct = (productName) => {
    setCart(cart.filter((item) => item.product.name !== productName))
  }

  const getAllProductsQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateProductQuantity,
        removeProduct,
        getAllProductsQuantity,
      }}
    >
      {children}
      {notification && <NotificationCard message={notification} />}
    </CartContext.Provider>
  )
}

const useCartContext = () => useContext(CartContext)

export default useCartContext
