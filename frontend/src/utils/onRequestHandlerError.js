import { SHORT_MESSAGE_TIMEOUT } from "#constants/time"

export const onRequestHandlerError = (error, setNotification) => {
  console.error(error)
  if (error && error.response && error.response.data.errors) {
    if (setNotification) {
      setNotification(
        `Error: ${error.response.data.errors[0].path} ${error.response.data.errors[0].message}`,
      )
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  } else {
    if (setNotification) {
      setNotification("Error by handling request")
      setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
    }
  }
}
