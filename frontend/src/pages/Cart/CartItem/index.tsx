import { ActionButton } from "@/components/ui/ActionButton"
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/media"
import { STYLES } from "@/constants/styles"
import { useCart } from "@/hooks/useCart"
import { CartItem as ICartItem } from "@/types/Cart"
import { getIconByName } from "@/utils/getIconByName"
import { setDefaultImageByError } from "@/utils/setDefaultImageByError"
import { titleCase } from "@/utils/titleCase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"
import styles from "./cartItem.module.scss"

interface CartItemProps {
  item: ICartItem
}

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { removeProduct, updateProductQuantity } = useCart()
  return (
    <article className={styles.cartItem} aria-label='cart item'>
      <div className={styles.body}>
        <img
          src={item.product.image}
          alt={item.product.name}
          className={styles.image || DEFAULT_PRODUCT_IMAGE}
          onError={(e) => {
            setDefaultImageByError(e, DEFAULT_PRODUCT_IMAGE)
          }}
        />
        <div className={styles.details}>
          <span className={styles.detailsName}>
            {titleCase(item.product.name, "_")}
          </span>
          <span className={styles.detailsItem}>{item.product.description}</span>
          <span className={styles.detailsItem}>{item.product.size} ml</span>
        </div>
      </div>
      <div className={styles.selectors}>
        <div className={styles.buttons}>
          <ActionButton
            action={() =>
              updateProductQuantity(item.product.name, item.quantity - 1)
            }
            text={<FontAwesomeIcon icon={getIconByName("faMinus")} />}
            className={STYLES.BUTTONS.CART_ITEM}
          />
          <span className={styles.quantity}>{item.quantity}</span>
          <ActionButton
            action={() =>
              updateProductQuantity(item.product.name, item.quantity + 1)
            }
            text={<FontAwesomeIcon icon={getIconByName("faPlus")} />}
            className={STYLES.BUTTONS.CART_ITEM}
          />
        </div>
        <div className={styles.cost}>
          {(item.quantity * Number(item.product.price)).toFixed(2)} €
        </div>
        <div className={styles.deleteButtonWrapper}>
          <ActionButton
            action={() => removeProduct(item.product.name)}
            text={<FontAwesomeIcon icon={getIconByName("faTrash")} />}
            className={STYLES.BUTTONS.CART_ITEM}
          />
        </div>
      </div>
    </article>
  )
}
