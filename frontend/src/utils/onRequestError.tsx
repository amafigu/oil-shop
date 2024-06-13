import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"

export const onRequestError = (
  error,
  setNotification,
  message = "Error by handling request",
) => {
  console.error(error)
  if (error && error.response && error.response.data) {
    if (setNotification) {
      if (error.response.data.errors) {
        setNotification(
          `Error: ${error.response.data.errors[0].path} ${error.response.data.errors[0].message}`,
        )
        setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
      } else {
        if (error.response.data.message) {
          setNotification(`Error: ${error.response.data.message}`)
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        }
      }
    }
  } else if (error && error.response && error.response.data.message) {
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
