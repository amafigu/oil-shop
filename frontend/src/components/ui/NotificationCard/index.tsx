import { FC } from "react"
import { Modal } from "../Modal"
import styles from "./notificationCard.module.scss"

interface NotificationCardProps {
  message: string
}

export const NotificationCard: FC<NotificationCardProps> = ({ message }) => {
  return (
    <article className={styles.container}>
      {message && message !== "" && (
        <Modal isOpen={true}>
          <div className={styles.card}>{message}</div>
        </Modal>
      )}
    </article>
  )
}
