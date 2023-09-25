import useCartContext from "#context/cartContext"
import useLocaleContext from "#context/localeContext"
import { decreaseQuantity, increaseQuantity } from "#utils/utils"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import styles from "./productQuantity.module.scss"

const ProductQuantity = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const { addProduct } = useCartContext()
  const { translate } = useLocaleContext()
  const text = translate.pages.productsDetails

  const addToCart = () => {
    addProduct(product, quantity)
  }

  return (
    <div className={styles.quantitySelector}>
      <div className={styles.quantityContainer}>
        <div>{quantity}</div>
      </div>
      <div className={styles.quantityButtonsContainer}>
        <FontAwesomeIcon
          icon={faChevronUp}
          onClick={() => increaseQuantity(quantity, setQuantity)}
          size='sm'
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          onClick={() => decreaseQuantity(quantity, setQuantity)}
          size='sm'
        />
      </div>
      <button className={styles.addToCartButton} onClick={() => addToCart()}>
        {text.addToCartButton}
      </button>
    </div>
  )
}

export default ProductQuantity
