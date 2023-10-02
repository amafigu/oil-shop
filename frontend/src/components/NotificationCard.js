import React from "react"
import styles from "./notificationCard.module.scss"

const NotificationCard = ({ message }) => {
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.notificationCard}>{message}</div>
      </div>
    </div>
  )
}

export default NotificationCard
