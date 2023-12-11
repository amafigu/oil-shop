export const totalCost = (cart) =>
  cart.reduce((total, item) => total + item.quantity * item.product.price, 0)

export const cartTotalSum = (cart, shippingCost) =>
  Number(totalCost(cart).toFixed(2)) + Number(shippingCost.toFixed(2))

export const increaseQuantity = (quantity, setQuantity) => {
  if (quantity < 20) {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }
}

export const decreaseQuantity = (quantity, setQuantity) => {
  if (quantity > 1) {
    setQuantity((prevQuantity) => prevQuantity - 1)
  }
}
