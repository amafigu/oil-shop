import { FC } from "react"
import styles from "./notificationCard.module.scss"

interface NotificationCardProps {
  message: string
}

export const NotificationCard: FC<NotificationCardProps> = ({ message }) => {
  return (
    <article className={styles.container}>
      {message && message !== "" && (
        <div className={styles.modal}>
          <div className={styles.card}>{message}</div>
        </div>
      )}
    </article>
  )
}
