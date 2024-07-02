import { FC } from "react"
import styles from "./submitButton.module.scss"

interface SubmitButtonProps {
  text?: string | JSX.Element
  className?: string
  ariaLabel?: string
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  className,
  ariaLabel,
}) => {
  return (
    <button
      type='submit'
      style={{ userSelect: "none" }}
      className={className ? styles[className] : ""}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  )
}
