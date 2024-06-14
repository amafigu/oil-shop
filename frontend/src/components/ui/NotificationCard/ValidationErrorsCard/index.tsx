import { FC, useEffect, useState } from "react"

interface ValidationErrorsCardProps {
  errorsArray: { message: string; path: string }[]
  translationObj: { [key: string]: { [key: string]: string } }
}

export const ValidationErrorsCard: FC<ValidationErrorsCardProps> = ({
  errorsArray,
  translationObj,
}) => {
  const [errorsObject, setErrorsObject] = useState<{ [key: string]: string[] }>(
    {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    },
  )

  useEffect(() => {
    const newErrorsObject = { ...errorsObject }

    errorsArray &&
      errorsArray.forEach((err) => {
        const path = err.path
        const message = err.message
        if (translationObj[path]) {
          const translationKey = Object.keys(translationObj[path] ?? {}).find(
            (key) => translationObj[path]?.[key] === message,
          )

          if (
            translationKey &&
            !(newErrorsObject[path] ?? []).includes(translationKey)
          ) {
            newErrorsObject[path] = [
              ...(newErrorsObject[path] || []),
              translationKey,
            ]
          }
        }
      })

    setErrorsObject(newErrorsObject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorsArray, translationObj])

  const cleanedErrorsObject = Object.entries(errorsObject).reduce(
    (acc, [key, value]) => {
      if (value.length > 0) {
        acc[key] = value
      }
      return acc
    },
    {} as { [key: string]: string[] },
  )

  const getTranslatedErrorMessage = (field: string, errorKey: string) => {
    return (
      translationObj[field]?.[errorKey] ?? "Validation error, please try again"
    )
  }

  return (
    <div>
      {Object.entries(cleanedErrorsObject).map(([field, errorKeys]) => (
        <div key={field}>
          {(errorKeys as string[]).map((errorKey) => (
            <p key={`${field}${errorKey}`}>
              {getTranslatedErrorMessage(field, errorKey)}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}
