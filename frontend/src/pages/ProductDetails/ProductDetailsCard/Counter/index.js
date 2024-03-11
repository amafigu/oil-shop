import { ActionButton } from "#components/ui/ActionButton"
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
    <div className={styles.counter}>
      <div className={styles.container}>
        <div>{counter}</div>
      </div>
      <div className={styles.buttons}>
        <ActionButton
          action={() => increaseQuantity(counter, setCounter)}
          text={
            <FontAwesomeIcon icon={getIconByName("faChevronUp")} size='sm' />
          }
        />
        <ActionButton
          action={() => decreaseQuantity(counter, setCounter)}
          text={
            <FontAwesomeIcon icon={getIconByName("faChevronDown")} size='sm' />
          }
        />
      </div>
    </div>
  )
}
