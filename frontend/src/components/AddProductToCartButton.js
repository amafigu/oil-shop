import useCartContext from "#context/cartContext"
import React from "react"
import useLocaleContext from "../context/localeContext"

const AddProductToCartButton = ({
  product,
  classname,

  quantity,
}) => {
  const { addProduct } = useCartContext()
  const { translate } = useLocaleContext()

  return (
    <button className={classname} onClick={() => addProduct(product, quantity)}>
      {translate.components.addOneToCartButton.text}
    </button>
  )
}

export default AddProductToCartButton
