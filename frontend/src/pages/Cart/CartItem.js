import { DEFAULT_PRODUCT_IMAGE } from "#constants/constants"
import { useCart } from "#hooks/useCart"
import { useTranslation } from "#hooks/useTranslation"
import { setDefaultImageByError } from "#utils/dataManipulation"
import { titleCase } from "#utils/stringManipulation"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styles from "./cart.module.scss"

export const CartItem = ({ item }) => {
  const { translate } = useTranslation()
  const { removeProduct, updateProductQuantity } = useCart()
  const text = translate.pages.cart
  return (
    <figure className={styles.cartItem}>
      <div className={styles.imagesAndDetails}>
        <img
          src={item.product.image}
          alt={item.product.name}
          className={styles.cartItemImage}
          onError={(e) => {
            setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
          }}
        />
        <figcaption className={styles.cartItemDetails}>
          <h3>{titleCase(item.product.name, "_")}</h3>
          <p>{item.product.description}</p>
          <p>{item.product.size} ml</p>
        </figcaption>
      </div>

      <div className={styles.cartItemSelectors}>
        <div className={styles.quantityButtonsContainer}>
          <button
            className={styles.cartItemQuantityButton}
            onClick={() =>
              updateProductQuantity(item.product.name, item.quantity - 1)
            }
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className={styles.cartItemQuantityInput}>{item.quantity}</span>
          <button
            className={styles.cartItemQuantityButton}
            onClick={() =>
              updateProductQuantity(item.product.name, item.quantity + 1)
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className={styles.cartItemTotalCost}>
          {(item.quantity * Number(item.product.price)).toFixed(2)} €
        </div>
        <div className={styles.deleteButtonWrapper}>
          <span
            className={styles.deleteButton}
            onClick={() => removeProduct(item.product.name)}
          >
            {text.deleteButton}
          </span>
        </div>
      </div>
    </figure>
  )
}
