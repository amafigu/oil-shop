import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { getIconByName } from "#utils/getIconByName"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/stringManipulation"
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
    <div className={styles.cartItem} aria-label='cart item'>
      <div className={styles.imagesAndDetails}>
        <img
          src={image}
          alt={name}
          className={styles.cartItemImage || DEFAULT_PRODUCT_IMAGE}
          onError={(e) => {
            setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
          }}
        />
        <div className={styles.cartItemDetails}>
          <span>{titleCase(name, "_")}</span>
          <span>{description}</span>
          <span>{size} ml</span>
        </div>
      </div>

      <div className={styles.cartItemSelectors}>
        <div className={styles.quantityButtonsContainer}>
          <button
            aria-label={`Substract one ${name} from cart`}
            className={styles.cartItemQuantityButton}
            onClick={() => updateProductQuantity(name, quantity - 1)}
          >
            <FontAwesomeIcon icon={getIconByName("faMinus")} />
          </button>
          <span className={styles.cartItemQuantityInput}>{quantity}</span>
          <button
            aria-label={`Add one ${name} to cart`}
            className={styles.cartItemQuantityButton}
            onClick={() => updateProductQuantity(name, quantity + 1)}
          >
            <FontAwesomeIcon icon={getIconByName("faPlus")} />
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
            <FontAwesomeIcon icon={getIconByName("faTrash")} />
          </button>
        </div>
      </div>
    </div>
  )
}
