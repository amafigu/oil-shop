import { LOCAL_STORAGE_CART } from "@/constants/localStorage"
import { CartContextType, CartItem } from "@/types/Cart"
import { Product } from "@/types/Product"
import { titleCase } from "@/utils/titleCase"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNotificationContext } from "./notificationContext"

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
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
  const [cart, setCart] = useState<CartItem[]>(getInitialCart)
  const { setNotification } = useNotificationContext()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart))
  }, [cart])

  const addProduct = (product: Product, quantity: number) => {
    const existingProduct = cart.find(
      (item: CartItem) => item.product.name === product.name,
    )

    if (quantity > 0) {
      if (existingProduct) {
        setCart(
          cart.map((item: CartItem) =>
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

  const updateProductQuantity = (productName: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCart(
        cart.map((item: CartItem) =>
          item.product.name === productName
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      )
    }
  }

  const removeProduct = (productName: string) => {
    setCart(cart.filter((item: CartItem) => item.product.name !== productName))
  }

  const getAllProductsQuantity = cart.reduce(
    (total: number, item: CartItem) => total + item.quantity,
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
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}
