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

    errorsArray.forEach((err) => {
      if (err.path[0] === "firstName") {
        if (err.message === "First name should start with a capital letter.") {
          newErrorsObject.firstName = [
            ...newErrorsObject.firstName,
            "shouldStartWithACapitalLetter",
          ]
        }
        if (err.message === "First name can only contain letters.") {
          newErrorsObject.firstName = [
            ...newErrorsObject.firstName,
            "shouldContainOnlyLetters",
          ]
        }
      }
    })

    let cleanedErrorsObject = Object.entries(errorsObject).reduce(
      (acc, [key, value]) => {
        if (value.length > 0) {
          acc[key] = value
        }
        return acc
      },
      {},
    )
    setErrorsObject(newErrorsObject)
  }, [errorsArray])

  let cleanedErrorsObject = Object.entries(errorsObject).reduce(
    (acc, [key, value]) => {
      if (value.length > 0) {
        acc[key] = value
      }
      return acc
    },
    {},
  )

  return <div>{JSON.stringify(cleanedErrorsObject)}</div>
}

export default ZodValidationErrorsCard
