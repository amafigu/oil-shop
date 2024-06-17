import { useCartContext } from "@/context/cartContext"
import { useTranslation } from "@/hooks/useTranslation"
import { Product } from "@/types/Product"
import { FC } from "react"

interface AddProductToCartButtonProps {
  product: Product
  classname: string
  quantity: number
}

export const AddProductToCartButton: FC<AddProductToCartButtonProps> = ({
  product,
  classname,
  quantity,
}) => {
  const { addProduct } = useCartContext()
  const { translate } = useTranslation()

  return (
    <button
      className={classname}
      aria-label='Add item to cart'
      onClick={() => addProduct(product, quantity)}
    >
      <span style={{ margin: "0 8px" }}>
        {translate.components.addOneToCartButton.text}
      </span>
    </button>
  )
}
