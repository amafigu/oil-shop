import { ActionButton } from "#components/ui/ActionButton"
import { decreaseQuantity, increaseQuantity } from "#utils/cart"
import { getIconByName } from "#utils/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./counter.module.scss"

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
