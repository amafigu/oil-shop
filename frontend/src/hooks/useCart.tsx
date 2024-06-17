import { useCartContext } from "@/context/cartContext"

export const useCart = () => {
  const {
    cart,
    addProduct,
    updateProductQuantity,
    removeProduct,
    getAllProductsQuantity,
    setCart,
  } = useCartContext()

  return {
    cart,
    addProduct,
    updateProductQuantity,
    removeProduct,
    getAllProductsQuantity,
    setCart,
  }
}
