import { CartItem } from "@/types/Cart"

export const getTotalCost = (cart: CartItem[]) =>
  cart.reduce(
    (total: number, item: CartItem) =>
      total + item.quantity * item.product.price,
    0,
  )
