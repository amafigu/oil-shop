export const convertToExpectedTypes = async (data) => {
  return {
    ...data,
    firstName: String(data.firstName),
    lastName: String(data.lastName),
    email: String(data.email),
    password: String(data.password),
  }
}

export const validate = async ({ item, schema, onError, onNotification }) => {
  try {
    if (schema) {
      return schema.parse(item)
    } else {
      return
    }
  } catch (error) {
    console.error("Error by validation", error)
    onError(error, onNotification)
  }
}
