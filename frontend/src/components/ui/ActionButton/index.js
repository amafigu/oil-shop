import styles from "./actionButton.module.scss"

export const ActionButton = ({ action, text, className }) => {
  return (
    <button
      style={{ userSelect: "none" }}
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
