import { ActionButton } from "@/components/ui/ActionButton"
import { STYLES } from "@/constants/styles"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, FC, SetStateAction } from "react"
import styles from "./counter.module.scss"

const increaseQuantity = (
  quantity: number,
  setQuantity: Dispatch<SetStateAction<number>>,
) => {
  if (quantity < 40) {
    setQuantity((prevQuantity: number) => prevQuantity + 1)
  }
}

const decreaseQuantity = (
  quantity: number,
  setQuantity: Dispatch<SetStateAction<number>>,
) => {
  if (quantity > 1) {
    setQuantity((prevQuantity: number) => prevQuantity - 1)
  }
}

interface CounterProps {
  counter: number
  setCounter: Dispatch<SetStateAction<number>>
}

export const Counter: FC<CounterProps> = ({ counter, setCounter }) => {
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
