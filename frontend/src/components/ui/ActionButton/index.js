import styles from "./actionButton.module.scss"

export const ActionButton = ({ text, action }) => {
  return (
    <button className={styles.actionButton} onClick={action}>
      {text}
    </button>
  )
}
