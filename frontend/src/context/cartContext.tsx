import NotificationCard from "#components/ui/NotificationCard"
import { LOCAL_STORAGE_CART } from "#constants/localStorage"
import { titleCase } from "#utils/titleCase"
import { createContext, useContext, useEffect, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const getInitialCart = () => {
    try {
      const storageCart = localStorage.getItem(LOCAL_STORAGE_CART)
      if (storageCart) {
        return JSON.parse(storageCart)
      }
    } catch (error) {
      console.error("Failed to parse cart data from local storage:", error)
    }
    return []
  }
  const [cart, setCart] = useState(getInitialCart)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart))
  }, [cart])

  const addProduct = (product, quantity) => {
    const existingProduct = cart.find(
      (item) => item.product.name === product.name,
    )

    if (quantity > 0) {
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

      setNotification(
        `${quantity} ${titleCase(product.name, "_")} were added to your cart`,
      )
      setTimeout(() => setNotification(null), 1300)
    }
  }

  const updateProductQuantity = (productName, newQuantity) => {
    if (newQuantity > 0) {
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
        setCart,
      }}
    >
      {children}
      {notification && <NotificationCard message={notification} />}
    </CartContext.Provider>
  )
}

const useCartContext = () => useContext(CartContext)

export default useCartContext
