import { useEffect } from "react"

export const titleCase = (str, separator) => {
  return str
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const productImageUrl = (image) => {
  return "/assets/" + image
}

export const addOneProductToCart = (product, contextFunction) => {
  contextFunction(product, 1)
}

export const totalCost = (cart) =>
  cart.reduce((total, item) => total + item.quantity * item.product.price, 0)

export const cartTotalSum = (cart, shippingCost) =>
  Number(totalCost(cart).toFixed(2)) + Number(shippingCost.toFixed(2))

export const useEffectScrollTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}

export const searchProduct = (products, searchText, navigate) => {
  console.log("search")
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`/products/${match.name}`)
  } else {
    console.error("not able to navigate to product page ")
  }
}
