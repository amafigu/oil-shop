import useCartContext from "#context/cartContext"
import { useTranslation } from "#hooks/useTranslation"

export const AddProductToCartButton = ({ product, classname, quantity }) => {
  const { addProduct } = useCartContext()
  const { translate } = useTranslation()

  return (
    <button
      className={classname}
      aria-label='Add to cart button'
      onClick={() => addProduct(product, quantity)}
    >
      <span style={{ margin: "0 8px" }}>
        {translate.components.addOneToCartButton.text}
      </span>
    </button>
  )
}
