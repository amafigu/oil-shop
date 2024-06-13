export const totalCost = (cart) =>
  cart.reduce((total, item) => total + item.quantity * item.product.price, 0)
