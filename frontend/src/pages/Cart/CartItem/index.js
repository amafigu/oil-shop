import { ActionButton } from "#components/ui/ActionButton"
import { DEFAULT_PRODUCT_IMAGE } from "#constants/media"
import { STYLES } from "#constants/styles"
import { useCart } from "#hooks/useCart"
import { getIconByName } from "#utils/getIconByName"
import { setDefaultImageByError } from "#utils/setDefaultImageByError"
import { titleCase } from "#utils/titleCase"
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
  const { removeProduct, updateProductQuantity } = useCart()
  return (
    <article className={styles.cartItem} aria-label='cart item'>
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
          <ActionButton
            action={() => updateProductQuantity(name, quantity - 1)}
            text={<FontAwesomeIcon icon={getIconByName("faMinus")} />}
            className={STYLES.BUTTONS.CART_ITEM_QUANTITY}
            ariaLabel={`Substract one ${name} from cart`}
          />
          <span className={styles.cartItemQuantityInput}>{quantity}</span>
          <ActionButton
            action={() => updateProductQuantity(name, quantity + 1)}
            text={<FontAwesomeIcon icon={getIconByName("faPlus")} />}
            className={STYLES.BUTTONS.CART_ITEM_QUANTITY}
            ariaLabel={`Add one ${name} to cart`}
          />
        </div>
        <div className={styles.cartItemTotalCost}>
          {(quantity * Number(price)).toFixed(2)} €
        </div>
        <div className={styles.deleteButtonWrapper}>
          <ActionButton
            action={() => removeProduct(name)}
            text={<FontAwesomeIcon icon={getIconByName("faTrash")} />}
            className={STYLES.BUTTONS.CART_ITEM_DELETE}
            ariaLabel={`Delete ${name} from cart`}
          />
        </div>
      </div>
    </article>
  )
}
