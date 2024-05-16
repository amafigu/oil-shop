// TODO: translate zod backend errors

export const translateZodValidationErrors = (error, text) => {
  const translatedMessage = text.validationErrors[error.path]

  if (translatedMessage) {
    return translatedMessage[error.code]
  } else {
    return error.message
  }
}
