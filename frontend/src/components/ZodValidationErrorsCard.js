import { translateZodValidationErrors } from "#utils/utils"
import styles from "./zodValidationErrorsCard.module.scss"

const ZodValidationErrorsCard = ({ fieldErrors, text }) => {
  return (
    <div>
      {fieldErrors.firstName &&
        fieldErrors.firstName.map((error) => (
          <div key={error.message} className={styles.errorMessage}>
            {translateZodValidationErrors(error, text)}
          </div>
        ))}
      {fieldErrors.lastName &&
        fieldErrors.lastName.map((error) => (
          <div key={error.message} className={styles.errorMessage}>
            {translateZodValidationErrors(error, text)}
          </div>
        ))}
      {fieldErrors.email &&
        fieldErrors.email.map((error) => (
          <div key={error.message} className={styles.errorMessage}>
            {translateZodValidationErrors(error, text)}
          </div>
        ))}

      {fieldErrors.password &&
        fieldErrors.password.map((error) => (
          <div key={error.message} className={styles.errorMessage}>
            {translateZodValidationErrors(error, text)}
          </div>
        ))}
    </div>
  )
}

export default ZodValidationErrorsCard
