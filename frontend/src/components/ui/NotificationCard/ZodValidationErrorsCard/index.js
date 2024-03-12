import React, { useEffect, useState } from "react"

const ZodValidationErrorsCard = ({ errorsArray, translationObj }) => {
  const [errorsObject, setErrorsObject] = useState({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  })

  useEffect(() => {
    let newErrorsObject = { ...errorsObject }

    errorsArray &&
      errorsArray.forEach((err) => {
        const path = err.path[0]
        const message = err.message
        if (translationObj[path]) {
          const translationKey = Object.keys(translationObj[path]).find(
            (key) => translationObj[path][key] === message,
          )

          if (
            translationKey &&
            !newErrorsObject[path].includes(translationKey)
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

  let cleanedErrorsObject = Object.entries(errorsObject).reduce(
    (acc, [key, value]) => {
      if (value.length > 0) {
        acc[key] = value
      }
      return acc
    },
    {},
  )

  const getTranslatedErrorMessage = (field, errorKey) => {
    return translationObj[field][errorKey]
  }

  return (
    <div>
      {Object.entries(cleanedErrorsObject).map(([field, errorKeys]) => (
        <div key={field}>
          {errorKeys.map((errorKey) => (
            <p key={`${field}${errorKey}`}>
              {getTranslatedErrorMessage(field, errorKey)}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ZodValidationErrorsCard
