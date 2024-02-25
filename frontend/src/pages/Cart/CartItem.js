import { DEFAULT_PRODUCT_IMAGE } from "#constants/constants"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./cartItem.module.scss"

export const CartItem = ({
  description,
  image,
  name,
  price,
  quantity,
  size,
}) => {
  const { translate } = useTranslation()
  const { removeProduct, updateProductQuantity } = useCart()
  const text = translate.pages.cart
  return (
    <figure className={styles.cartItem} aria-label='cart item'>
      <div className={styles.imagesAndDetails}>
        <img
          src={image}
          alt={name}
          className={styles.cartItemImage}
          onError={(e) => {
            setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
          }}
        />
        <figcaption className={styles.cartItemDetails}>
          <h3>{titleCase(name, "_")}</h3>
          <p>{description}</p>
          <p>{size} ml</p>
        </figcaption>
      </div>

      <div className={styles.cartItemSelectors}>
        <div className={styles.quantityButtonsContainer}>
          <button
            aria-label={`Substract one ${name} from cart`}
            className={styles.cartItemQuantityButton}
            onClick={() => updateProductQuantity(name, quantity - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={styles.cartItemQuantityInput}>{quantity}</span>
          <button
            aria-label={`Add one ${name} to cart`}
            className={styles.cartItemQuantityButton}
            onClick={() => updateProductQuantity(name, quantity + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={styles.cartItemTotalCost}>
          {(quantity * Number(price)).toFixed(2)} €
        </div>
        <div className={styles.deleteButtonWrapper}>
          <button
            aria-label={`Delete ${name} from cart`}
            className={styles.deleteButton}
            onClick={() => removeProduct(name)}
          >
            {text.deleteButton}
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </figure>
  )
}
