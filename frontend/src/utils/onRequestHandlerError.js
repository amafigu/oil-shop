import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"

export const onRequestHandlerError = (
  error,
  setNotification,
  message = "Error by handling request",
) => {
  console.error(error)
  if (error && error.response && error.response.data.errors) {
    if (setNotification) {
      setNotification(
        `Error: ${error.response.data.errors[0].path} ${error.response.data.errors[0].message}`,
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
  if (error && error.response && error.response.data.message) {
    if (setNotification) {
      setNotification(`Error: ${error.response.data.message}`)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  } else {
    if (setNotification) {
      setNotification(message)
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
