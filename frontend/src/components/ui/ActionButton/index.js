import styles from "./actionButton.module.scss"

export const ActionButton = ({ action, text, className }) => {
  return (
    <button
      className={className ? styles[className] : ""}
      onClick={(e) => {
        e.preventDefault()
        action(e)
      }}
    >
      {text}
    </button>
  )
}
