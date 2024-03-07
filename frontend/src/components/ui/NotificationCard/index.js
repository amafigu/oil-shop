import React from "react"
import ZodValidationErrorsCard from "./ZodValidationErrorsCard"
import styles from "./notificationCard.module.scss"

const NotificationCard = ({
  message,
  errorsMessageArray,
  textValidationErrorsObject,
}) => {
  return (
    <div>
      {message && message !== "" && (
        <div className={styles.modal}>
          <div className={styles.notificationCard}>{message}</div>
        </div>
      )}

      {textValidationErrorsObject &&
        errorsMessageArray &&
        errorsMessageArray.length > 0 && (
          <div className={styles.modal}>
            <div className={styles.notificationCard}>
              <ZodValidationErrorsCard
                errorsArray={errorsMessageArray}
                translationObj={textValidationErrorsObject}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default NotificationCard
