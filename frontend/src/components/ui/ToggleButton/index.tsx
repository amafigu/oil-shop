import { Dispatch, FC, SetStateAction } from "react"
import styles from "./toggleButton.module.scss"

interface ToggleButtonProps {
  isVisible: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onToggle: Dispatch<SetStateAction<any>>
  hideBtnText: string
  showBtnText: string
  classCss: string
}

export const ToggleButton: FC<ToggleButtonProps> = ({
  isVisible,
  onToggle,
  hideBtnText,
  showBtnText,
  classCss,
}) => {
  return (
    <>
      {isVisible ? (
        <button
          aria-label={`${hideBtnText} button`}
          onClick={() => onToggle(false)}
          className={styles[classCss]}
          type='button'
        >
          {hideBtnText}
        </button>
      ) : (
        <button
          aria-label={`${showBtnText} button`}
          onClick={() => onToggle(true)}
          className={styles[classCss]}
          type='button'
        >
          {showBtnText}
        </button>
      )}
    </>
  )
}
