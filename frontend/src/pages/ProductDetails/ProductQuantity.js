import { decreaseQuantity, increaseQuantity } from "#utils/cart"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./productQuantity.module.scss"

export const ProductQuantity = ({ quantity, setQuantity }) => {
  return (
    <div className={styles.quantitySelector}>
      <div className={styles.quantityContainer}>
        <div>{quantity}</div>
      </div>
      <div className={styles.quantityButtonsContainer}>
        <FontAwesomeIcon
          icon={getIconByName("faChevronUp")}
          onClick={() => increaseQuantity(quantity, setQuantity)}
          size='sm'
        />

        <FontAwesomeIcon
          icon={getIconByName("faChevronDown")}
          onClick={() => decreaseQuantity(quantity, setQuantity)}
          size='sm'
        />
      </div>
    </div>
  )
}
