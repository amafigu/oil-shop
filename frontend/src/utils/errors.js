export const translateZodValidationErrors = (error, text) => {
  const translatedMessage = text.validationErrors[error.path]

  console.log(error)

  if (translatedMessage) {
    return translatedMessage[error.code]
  } else {
    return error.message
  }
}
