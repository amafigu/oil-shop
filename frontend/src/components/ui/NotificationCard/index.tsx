import { FC } from "react"
import { ValidationErrorsCard } from "./ValidationErrorsCard"
import styles from "./notificationCard.module.scss"

interface NotificationCardProps {
  message: string
  errorsMessageArray?: { message: string; path: string }[]
  translatedValidationErrors?: { [key: string]: { [key: string]: string } }
}

export const NotificationCard: FC<NotificationCardProps> = ({
  message,
  errorsMessageArray = [],
  translatedValidationErrors = {},
}) => {
  return (
    <article className={styles.container}>
      {message && message !== "" && (
        <div className={styles.modal}>
          <div className={styles.card}>{message}</div>
        </div>
      )}

      {translatedValidationErrors &&
        errorsMessageArray &&
        errorsMessageArray.length > 0 && (
          <div className={styles.modal}>
            <div className={styles.card}>
              <ValidationErrorsCard
                errorsArray={errorsMessageArray}
                translationObj={translatedValidationErrors}
              />
            </div>
          </div>
        )}
    </article>
  )
}
