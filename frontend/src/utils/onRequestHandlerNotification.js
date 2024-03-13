import { PROCESS_TIMEOUT, SHORT_MESSAGE_TIMEOUT } from "#constants/time"

export const onRequestHandlerNotification = (
  setNotification,
  message = "Request successful",
  setCounter,
) => {
  if (setNotification) {
    setNotification(message)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
  }
  if (setCounter) {
    setTimeout(() => setCounter((prevCount) => prevCount + 1), PROCESS_TIMEOUT)
  }
}
