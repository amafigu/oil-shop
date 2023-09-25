import { decreaseQuantity, increaseQuantity } from "#utils/utils"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./productQuantity.module.scss"

const ProductQuantity = ({ quantity, setQuantity }) => {
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
    </div>
  )
}

export default ProductQuantity
