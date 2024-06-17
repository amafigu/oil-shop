import { Product } from "./Product"

export interface CartItem {
  id?: number
  product: Product
  quantity: number
}

export interface CartContextType {
  cart: CartItem[]
  addProduct: (product: Product, quantity: number) => void
  updateProductQuantity: (productName: string, newQuantity: number) => void
  removeProduct: (productName: string) => void
  getAllProductsQuantity: number
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
}
