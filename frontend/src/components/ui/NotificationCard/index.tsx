import React from "react"
import ZodValidationErrorsCard from "./ZodValidationErrorsCard"
import styles from "./notificationCard.module.scss"

const NotificationCard = ({
  message,
  errorsMessageArray,
  textValidationErrorsObject,
}) => {
  return (
    <article className={styles.container}>
      {message && message !== "" && (
        <div className={styles.modal}>
          <div className={styles.card}>{message}</div>
        </div>
      )}

      {textValidationErrorsObject &&
        errorsMessageArray &&
        errorsMessageArray.length > 0 && (
          <div className={styles.modal}>
            <div className={styles.card}>
              <ZodValidationErrorsCard
                errorsArray={errorsMessageArray}
                translationObj={textValidationErrorsObject}
              />
            </div>
          </div>
        )}
    </article>
  )
}

export default NotificationCard
