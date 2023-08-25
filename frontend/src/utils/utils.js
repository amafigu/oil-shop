import axios from "axios"
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

export const searchAndNavigateToProduct = (products, searchText, navigate) => {
  const match = products.find(
    (product) => product.name.toLowerCase() === searchText.toLowerCase(),
  )
  if (match) {
    navigate(`/products/${match.name}`)
  } else {
    console.error("not able to navigate to product page ")
  }
}

export const navigateToProductAndCloseDropdown = (
  name,
  navigate,
  setSearchDropdownOpen,
  setMatchedProducts,
  setSearchText,
) => {
  navigate(`/products/${name}`)
  setSearchDropdownOpen(false)
  setMatchedProducts([])
  setSearchText("")
}

export const useGetProducts = (setProducts) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((e) => console.error("Error getting products data", e))
  }, [setProducts])
}

export const useHideListOnOuterClick = (
  listRef,
  setListOpen,
  setMatchedItems,
) => {
  useEffect(() => {
    const listenClickOutsideSearchProductListDropdown = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setListOpen(false)
        setMatchedItems([])
      }
    }

    document.addEventListener(
      "mousedown",
      listenClickOutsideSearchProductListDropdown,
    )
    return () => {
      document.removeEventListener(
        "mousedown",
        listenClickOutsideSearchProductListDropdown,
      )
    }
  }, [listRef, setListOpen, setMatchedItems])
}
