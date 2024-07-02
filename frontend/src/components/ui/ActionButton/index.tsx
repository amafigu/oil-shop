import { FC, MouseEvent } from "react"
import styles from "./actionButton.module.scss"

interface ActionButtonProps {
  action: (e: MouseEvent<HTMLButtonElement>) => void
  text?: string | JSX.Element
  className?: string
  ariaLabel?: string
}

export const ActionButton: FC<ActionButtonProps> = ({
  action,
  text,
  className,
  ariaLabel,
}) => {
  return (
    <button
      style={{ userSelect: "none" }}
      className={className ? styles[className] : ""}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        action(e)
      }}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  )
}
