import React from "react"
import useCartContext from "../../context/cartContext"
import useLocaleContext from "../../context/localeContext"

const AddProductToCartButton = ({ product, classname, addProductsToCart }) => {
  const { addProduct } = useCartContext()
  const { translate } = useLocaleContext()

  return (
    <button
      className={classname}
      onClick={() => addProductsToCart(product, addProduct)}
    >
      {translate.components.addOneToCartButton.text}
    </button>
  )
}

export default AddProductToCartButton
