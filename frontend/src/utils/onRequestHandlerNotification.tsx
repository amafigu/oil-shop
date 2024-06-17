/* eslint-disable @typescript-eslint/no-explicit-any */
import { SHORT_MESSAGE_TIMEOUT } from "@/constants/time"

export const onRequestHandlerNotification = (
  setNotification: any,
  message = "Request successful",
) => {
  if (setNotification) {
    setNotification(message)
    setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
  }
}
