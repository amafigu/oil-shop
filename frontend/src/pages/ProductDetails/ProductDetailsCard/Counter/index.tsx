import { ActionButton } from "#components/ui/ActionButton"
import { STYLES } from "#constants/styles"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./counter.module.scss"

const increaseQuantity = (quantity, setQuantity) => {
  if (quantity < 40) {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }
}

const decreaseQuantity = (quantity, setQuantity) => {
  if (quantity > 1) {
    setQuantity((prevQuantity) => prevQuantity - 1)
  }
}

export const Counter = ({ counter, setCounter }) => {
  return (
    <div className={styles.wrapper} aria-label='counter'>
      <div className={styles.container}>
        <div>{counter}</div>
      </div>
      <div className={styles.buttons}>
        <ActionButton
          action={() => increaseQuantity(counter, setCounter)}
          text={
            <FontAwesomeIcon icon={getIconByName("faChevronUp")} size='sm' />
          }
          className={STYLES.BUTTONS.COUNTER}
          ariaLabel={"increase quantity"}
        />
        <ActionButton
          action={() => decreaseQuantity(counter, setCounter)}
          text={
            <FontAwesomeIcon icon={getIconByName("faChevronDown")} size='sm' />
          }
          className={STYLES.BUTTONS.COUNTER}
          ariaLabel={"decrease quantity"}
        />
      </div>
    </div>
  )
}
