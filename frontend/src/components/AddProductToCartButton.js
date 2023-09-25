import useCartContext from "#context/cartContext"
import React from "react"
import useLocaleContext from "../context/localeContext"

const AddProductToCartButton = ({ product, classname, quantity }) => {
  const { addProduct } = useCartContext()
  const { translate } = useLocaleContext()

  return (
    <button className={classname} onClick={() => addProduct(product, quantity)}>
      <span style={{ margin: "0 8px" }}>
        {translate.components.addOneToCartButton.text}
      </span>
    </button>
  )
}

export default AddProductToCartButton
